import { Router } from "express";
import {
  crearVehiculo,
  listarVehiculos,
  obtenerVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
} from "../controllers/vehiculo_controller.js";  // Importamos las funciones del controlador
import { verificarTokenJWT } from "../middlewares/JWT.js";  // Middleware para verificar el JWT

const router = Router();

// Crear un nuevo vehículo
router.post("/", verificarTokenJWT, crearVehiculo);            // Crear vehiculo

// Listar todos los vehículos
router.get("/", verificarTokenJWT, listarVehiculos);           // Listar todos los vehículos

// Obtener un vehículo por ID
router.get("/:id", verificarTokenJWT, obtenerVehiculo);        // Obtener vehiculo por ID

// Actualizar un vehículo por ID
router.put("/:id", verificarTokenJWT, actualizarVehiculo);     // Actualizar vehiculo por ID

// Eliminar un vehículo por ID
router.delete("/:id", verificarTokenJWT, eliminarVehiculo);    // Eliminar vehiculo por ID

export default router;
