import { Schema, model } from "mongoose";

// Definir el esquema para Reserva
const reservaSchema = new Schema(
  {
    codigo: { type: Number, required: true, unique: true },
    descripcion: { type: String, trim: true },
    cliente: { type: Schema.Types.ObjectId, ref: "Cliente", required: true },
    vehiculo: { type: Schema.Types.ObjectId, ref: "Vehiculo", required: true },
  },
  { timestamps: true }
);

// Crear y exportar el modelo
export default model("Reserva", reservaSchema);  // Asegúrate de que 'reservaSchema' es el que usas
