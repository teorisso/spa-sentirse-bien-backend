import { paymentDao } from "./dao";
import { IPayment } from "./type";
import Turno from "../turnos/model";
import User from "../users/model";
import { sendEmail } from "../utils/resendMailer";

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

        // Enviar comprobante de pago al cliente (no bloquear si falla)
        try {
            const cliente = await User.findById(payload.cliente);

            if (cliente?.email) {
                const html = `
                    <h2>Comprobante de Pago – Spa Sentirse Bien</h2>
                    <p>Hola ${cliente.first_name}, ¡gracias por tu pago!</p>
                    <p>Monto abonado: <strong>$${payload.amount}</strong></p>
                    <p style="font-size:12px;color:#666;">Fecha: ${new Date().toLocaleString("es-AR")}</p>
                    <hr/>
                    <p style="font-size:12px;color:#444;">Este es un comprobante automático, no responder a este correo.</p>
                `;

                await sendEmail({
                    to: cliente.email,
                    subject: "Comprobante de pago – Spa Sentirse Bien",
                    html,
                });
            }
        } catch (error) {
            console.error("Error enviando comprobante de pago:", error);
        }

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