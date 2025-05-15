import { Schema, model } from "mongoose";
import { IService } from "./type";

const serviceSchema = new Schema<IService>({
    nombre: { type: String, required: true },
    Image: { type: String, required: true },
    tipo: { type: String, required: false },
    precio: { type: Number, required: false },
    descripcion: { type: String, required: false },
});

const Service = model<IService>('Service', serviceSchema);

export default Service;