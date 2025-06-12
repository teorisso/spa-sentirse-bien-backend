import { paymentDao } from "./dao";
import { IPayment } from "./type";
import Turno from "../turnos/model";

const { createPayment, getPaymentById, getPayments } = paymentDao;

class PaymentService {
    async createPayment(payload: IPayment) {
        // Crear registro de pago
        const pago = await createPayment(payload);

        // Actualizar estado de los turnos involucrados a "confirmado"
        await Turno.updateMany(
            { _id: { $in: payload.turnos } },
            { $set: { estado: "confirmado" } }
        );

        return pago;
    }

    async getPayment(id: string) {
        return await getPaymentById(id);
    }

    async getPayments() {
        return await getPayments();
    }
}

export const paymentService = new PaymentService(); 