import { Router } from "express";
import {
  crearVehiculo,
  listarVehiculos,
  obtenerVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from "../controllers/vehiculo_controller.js";
import { verificarTokenJWT } from "../middlewares/JWT.js"; // si usas JWT

const router = Router();

router.post("/", verificarTokenJWT, crearVehiculo);
router.get("/", verificarTokenJWT, listarVehiculos);
router.get("/:id", verificarTokenJWT, obtenerVehiculo);
router.put("/:id", verificarTokenJWT, actualizarVehiculo);
router.delete("/:id", verificarTokenJWT, eliminarVehiculo);

export default router;
