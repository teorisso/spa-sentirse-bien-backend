import Payment from "./model";
import { IPayment } from "./type";

class PaymentDao {
    async createPayment(payment: IPayment) {
        return await Payment.create(payment);
    }

    async getPaymentById(id: string) {
        return await Payment.findById(id).populate("turnos");
    }

    async getPayments() {
        return await Payment.find().populate("turnos");
    }
}

export const paymentDao = new PaymentDao(); 