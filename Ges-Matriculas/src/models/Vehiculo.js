import { Schema, model } from "mongoose";

// Definir el nuevo esquema
const vehiculoSchema = new Schema({
  id: {
    type: Number,        // Tipo entero
    required: true,
    unique: true,        // Aseguramos que el ID sea único
  },
  marca: {
    type: String,
    required: true,
    trim: true,          // Eliminamos espacios en blanco al principio y al final
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  anio_fabricacion: {
    type: Number,        // Año de fabricación como número
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,        // Aseguramos que la placa sea única
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
    type: Number,        // Tipo de número para el kilometraje
    required: true,
  },
  descripcion: {
    type: String,
    trim: true,          // Eliminamos espacios innecesarios
  },
}, {
  timestamps: true       // Automáticamente agrega las fechas de creación y actualización
});

// Crear y exportar el modelo
export default model("Vehiculo", vehiculoSchema);
