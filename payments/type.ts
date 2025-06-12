import { ObjectId } from "mongoose";

export interface IPayment {
    turnos: ObjectId[];   // Referencias a los IDs de Turno involucrados
    amount: number;       // Monto total cobrado (con descuentos aplicados si corresponde)
    cliente: ObjectId;    // ID del usuario que realiza el pago
    createdAt?: Date;     // Fecha de creación del registro de pago
} 