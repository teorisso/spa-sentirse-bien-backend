import express from "express";
import { userController } from "./controller";

const userRouter = express.Router();

const { getUsers, getUser, createUser, loginUser, deleteUser, editUser, loginGoogle } = userController;

userRouter.get("/", getUsers);
userRouter.get("/correo/:correo", getUser);
userRouter.post("/register", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/google", loginGoogle);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", editUser);


export default userRouter;