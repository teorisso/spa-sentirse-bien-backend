import { Request, Response } from "express";
import { paymentService } from "./service";

const { createPayment, getPayment, getPayments } = paymentService;

class PaymentController {
    async createPayment(req: Request, res: Response) {
        try {
            const pago = await createPayment(req.body);
            res.status(201).json(pago);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPayment(req: Request, res: Response) {
        try {
            const pago = await getPayment(req.params.id);
            res.status(200).json(pago);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPayments(_req: Request, res: Response) {
        try {
            const pagos = await getPayments();
            res.status(200).json(pagos);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export const paymentController = new PaymentController(); 