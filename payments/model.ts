import { Schema, model, Types } from "mongoose";
import { IPayment } from "./type";

const paymentSchema = new Schema({
    turnos: [{ type: Types.ObjectId, ref: "Turno", required: true }],
    amount: { type: Number, required: true },
    cliente: { type: Types.ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now }
});

const Payment = model<IPayment>("Payment", paymentSchema);

export default Payment; 