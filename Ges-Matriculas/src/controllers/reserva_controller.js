import Reserva from "../models/Reserva.js";  
import Cliente from "../models/Cliente.js";
import Vehiculo from "../models/Vehiculo.js";

// Crear reserva
const crearReserva = async (req, res) => {
  try {
    const { codigo, descripcion, clienteId, vehiculoId } = req.body;

    // Validar campos obligatorios
    if (!codigo || !clienteId || !vehiculoId) {
      return res.status(400).json({ msg: "Código, cliente y vehículo son obligatorios" });
    }

    // Verificar si ya existe la reserva con el mismo código
    const existeCodigo = await Reserva.findOne({ codigo });
    if (existeCodigo) {
      return res.status(400).json({ msg: "El código de reserva ya existe" });
    }

    // Verificar si el cliente existe
    const cliente = await Cliente.findById(clienteId);
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    // Verificar si el vehículo existe
    const vehiculo = await Vehiculo.findById(vehiculoId);
    if (!vehiculo) {
      return res.status(404).json({ msg: "Vehículo no encontrado" });
    }

    // Crear una nueva reserva
    const nuevaReserva = new Reserva({
      codigo,
      descripcion,
      cliente: clienteId,
      vehiculo: vehiculoId
    });

    // Guardar la reserva en la base de datos
    await nuevaReserva.save();
    res.status(201).json(nuevaReserva);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Listar todas las reservas con detalles de cliente y vehículo
const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate("cliente", "nombre apellido cedula email")
      .populate("vehiculo", "marca modelo placa color");

    res.status(200).json(reservas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar reserva por id
const actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, descripcion, clienteId, vehiculoId } = req.body;

    // Buscar reserva por id
    const reserva = await Reserva.findById(id);
    if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });

    // Actualizar los campos
    reserva.codigo = codigo || reserva.codigo;
    reserva.descripcion = descripcion || reserva.descripcion;
    reserva.cliente = clienteId || reserva.cliente;
    reserva.vehiculo = vehiculoId || reserva.vehiculo;

    // Guardar cambios en la base de datos
    await reserva.save();
    res.status(200).json(reserva);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar reserva por id
const eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar reserva por id
    const reserva = await Reserva.findById(id);
    if (!reserva) return res.status(404).json({ msg: "Reserva no encontrada" });

    // Eliminar la reserva
    await reserva.deleteOne();
    res.status(200).json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { crearReserva, listarReservas, actualizarReserva, eliminarReserva };
