import { Router } from "express";
import {
  crearReserva,
  listarReservas,
  actualizarReserva,
  eliminarReserva
} from "../controllers/reserva_controller.js";  // Asegúrate de tener este controlador
import { verificarTokenJWT } from "../middlewares/JWT.js";  // Si tienes el middleware de JWT para la autenticación

const router = Router();

// Rutas para el CRUD de Reservas
router.post("/", verificarTokenJWT, crearReserva);           // Crear reserva
router.get("/", verificarTokenJWT, listarReservas);          // Listar todas las reservas
router.put("/:id", verificarTokenJWT, actualizarReserva);    // Actualizar reserva por id
router.delete("/:id", verificarTokenJWT, eliminarReserva);   // Eliminar reserva por id

export default router;
