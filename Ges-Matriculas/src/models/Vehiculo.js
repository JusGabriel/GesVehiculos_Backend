import { Schema, model } from "mongoose";

// Definir el nuevo esquema
const vehiculoSchema = new Schema({
  id: {
    type: Number, // Se seguirá usando, pero lo generamos nosotros
    unique: true,
  },
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  anio_fabricacion: {
    type: Number,
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  color: {
    type: String,
    required: true,
    trim: true,
  },
  tipo_vehiculo: {
    type: String,
    required: true,
    trim: true,
  },
  kilometraje: {
    type: Number,
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true
});

export default model("Vehiculo", vehiculoSchema);
