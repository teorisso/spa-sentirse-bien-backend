import { IUser } from "./types";
import { userDao } from "./dao";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

const {
    getAllUsers,
    getUserById,
    getUserByMail,
    createUser,
    editUser,
    deleteUser,
} = userDao;

class UserService {
    async getUser(correo: string) {
        try {
            const user = await getUserByMail(correo);
            return user;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async getUsers() {
        try {
            const users = await getAllUsers();
            return users;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async createUser(user: IUser) {
        try {
            const newUser = await createUser(user);
            return newUser;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async loginUser(user: { email: string; password: string }) {
        const { email, password } = user;
        const existingUser = await getUserByMail(email);


        //verificamos si el usuario existe
        if (!existingUser) {
            throw new Error("Invalid email");
        }
        const isPasswordValid = await compare(password, existingUser.password);

        //verificamos si la contraseña es correcta
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token = sign(
            {
                userId: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" }
        );
        return {
            token,
            user: {
                email: existingUser.email,
                first_name: existingUser.first_name,
                last_name: existingUser.last_name,
                is_admin: existingUser.is_admin,
                role: existingUser.role
            }
        };
    }
    async editUser(id: string, user: IUser) {
        try {
            const editedUser = await editUser(id, user);
            return editedUser;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async deleteUser(id: string) {
        try {
            const deletedUser = await deleteUser(id);
            return deletedUser;
        } catch (error) {
            throw Error((error as Error).message);
        }
    }
    async loginGoogle(idToken: string) {
        const { OAuth2Client } = await import('google-auth-library');
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
        const payload = ticket.getPayload();
        if (!payload) throw new Error('Token inválido');

        const email = payload.email!;
        let user = await getUserByMail(email);

        if (!user) {
            // crear usuario básico
            const names = (payload.name || '').split(' ');
            user = await createUser({
                email,
                first_name: names[0] || 'Google',
                last_name: names.slice(1).join(' ') || 'User',
                password: Math.random().toString(36),
            } as any);
        }

        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
        const token = sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        return {
            token,
            user: {
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                is_admin: user.is_admin,
            },
        };
    }
}

export const userService = new UserService();