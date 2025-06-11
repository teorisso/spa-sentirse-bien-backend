import { ObjectId } from "mongoose";

type TurnoStatus = "pendiente" | "confirmado" | "cancelado" | "realizado";

export interface ITurno {
    cliente: ObjectId,
    servicio: ObjectId,
    profesional: ObjectId,
    fecha: Date,
    hora: string,
    estado: TurnoStatus,
}