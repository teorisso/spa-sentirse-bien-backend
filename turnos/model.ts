import { Schema, model, Types} from "mongoose";
import { ITurno } from "./type";

const turnoSchema = new Schema<ITurno>({
    cliente: { type: Types.ObjectId, ref: "User", required: true },
    servicio: { type: Types.ObjectId, ref: "Service", required: true },
    profesional: { type: Types.ObjectId, ref: "User", required: true },
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    estado: { type: String, enum: ["pendiente", "confirmado", "cancelado", "realizado"], default: "pendiente" },
});

const Turno = model<ITurno>('Turno', turnoSchema);

export default Turno;
