type UserRole = "admin" | "cliente" | "profesional" | undefined;

export interface IUser {
first_name: string;
last_name: string;
email: string;
password: string;
is_admin: boolean;
role: UserRole;
}