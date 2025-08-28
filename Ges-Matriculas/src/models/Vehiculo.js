import { Schema, model } from "mongoose";

const vehiculoSchema = new Schema({
  marcha: {
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
  }
}, { timestamps: true });

export default model("Vehiculo", vehiculoSchema);
