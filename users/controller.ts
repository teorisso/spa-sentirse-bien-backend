import { Request, Response } from "express";
import { userService } from "./service";
import User from "./model";

const { getUser, getUsers, createUser, loginUser } = userService;

export const userController = {
    async getUsers(req: Request, res: Response) {
        try {
            const users = await getUsers();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async getUser(req: Request, res: Response) {
        const { correo } = req.params;
        try {
            const user = await getUser(correo);
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async createUser(req: Request, res: Response) {
        try {
            const user = await createUser(req.body);
            res.status(201).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async loginUser(req: Request, res: Response) {
        try {
            const user = await loginUser(req.body);
            res.status(200).send(user);
        } catch (error) {
            console.error("Error in loginUser:", error);
            res.status(500).send(error);
        }
    },
    async deleteUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
    async editUser(req: Request, res: Response) {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },
};