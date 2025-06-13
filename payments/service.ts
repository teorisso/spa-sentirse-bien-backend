import { paymentDao } from "./dao";
import { IPayment } from "./type";
import Turno from "../turnos/model";
import User from "../users/model";
import { sendEmail } from "../utils/resendMailer";
import { buildPaymentReceipt } from "../utils/templates/paymentReceipt";

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
                // Obtener detalle de turnos
                const turnosInfo = await Turno.find({ _id: { $in: payload.turnos } })
                  .populate('servicio', 'nombre')
                  .lean();

                const items = turnosInfo.map((t: any) => ({
                  servicio: t.servicio?.nombre || 'Servicio',
                  fecha: new Date(t.fecha).toLocaleDateString('es-AR'),
                  hora: t.hora,
                }));

                const html = buildPaymentReceipt(
                  cliente.first_name,
                  payload.amount,
                  new Date().toLocaleString("es-AR"),
                  items
                );

                await sendEmail({
                    to: cliente.email,
                    subject: "Comprobante de Pago – Spa Sentirse Bien",
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