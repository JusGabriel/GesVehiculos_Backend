// Requerir los módulos
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import routerUsuarios from "./routers/usuario_routes.js";
import routerVehiculos from "./routers/vehiculo_routes.js";
import routerClientes from "./routers/cliente_routes.js";
import routerReservas from "./routers/reserva_routes.js";



// Inicializaciones
const app = express()
dotenv.config()

// Configuraciones 
app.set('port',process.env.port || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())


// Variables globales
// Rutas de usuarios
app.use("/api/usuarios", routerUsuarios);
app.use("/api/clientes", routerClientes);
app.use("/api/vehiculos", routerVehiculos);
app.use("/api/matriculas", routerReservas);

// Rutas 
app.get('/',(req,res)=>{
    res.send("Server on")
})

// Exportar la instancia de express por medio de app
export default  app