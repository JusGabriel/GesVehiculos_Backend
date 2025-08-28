import { Router } from "express";
import {
  crearCliente, listarCliente, actualizarCliente, eliminarCliente 
} from "../controllers/cliente_controller.js";
import { verificarTokenJWT } from "../middlewares/JWT.js";

const router = Router();

router.post("/", verificarTokenJWT, crearCliente);           // Crear Cliente
router.get("/", verificarTokenJWT, listarCliente);          // Listar todos
router.put("/:id", verificarTokenJWT, actualizarCliente);    // Actualizar por id
router.delete("/:id", verificarTokenJWT, eliminarCliente);   // Eliminar por id

export default router;
