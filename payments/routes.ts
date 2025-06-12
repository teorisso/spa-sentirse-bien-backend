import express from "express";
import { paymentController } from "./controller";

const paymentRouter = express.Router();

const { createPayment, getPayment, getPayments } = paymentController;

paymentRouter.get("/", getPayments);
paymentRouter.get("/:id", getPayment);
paymentRouter.post("/create", createPayment);

export default paymentRouter; 