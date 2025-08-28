import Vehiculo from "../models/Vehiculo.js";

// Crear Vehiculo
const crearVehiculo = async (req, res) => {
  try {
    const { marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;

    // Validación de campos obligatorios
    if (!marca || !modelo || !anio_fabricacion || !placa || !color || !tipo_vehiculo || !kilometraje) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificamos si la placa ya existe
    const existePlaca = await Vehiculo.findOne({ placa });
    if (existePlaca) {
      return res.status(400).json({ msg: "La placa ya está registrada" });
    }

    // Obtener el último id registrado para autoincrementar
    const ultimoVehiculo = await Vehiculo.findOne().sort({ id: -1 });
    const nuevoId = ultimoVehiculo ? ultimoVehiculo.id + 1 : 1;

    // Crear y guardar el nuevo vehículo
    const nuevoVehiculo = new Vehiculo({
      id: nuevoId,
      marca,
      modelo,
      anio_fabricacion,
      placa,
      color,
      tipo_vehiculo,
      kilometraje,
      descripcion
    });

    await nuevoVehiculo.save();
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Listar todos los vehículos
const listarVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener vehículo por id
const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findOne({ id: Number(id) });
    if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });
    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar vehículo por id
const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;

    const vehiculo = await Vehiculo.findOne({ id: Number(id) });
    if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });

    vehiculo.marca = marca || vehiculo.marca;
    vehiculo.modelo = modelo || vehiculo.modelo;
    vehiculo.anio_fabricacion = anio_fabricacion || vehiculo.anio_fabricacion;
    vehiculo.placa = placa || vehiculo.placa;
    vehiculo.color = color || vehiculo.color;
    vehiculo.tipo_vehiculo = tipo_vehiculo || vehiculo.tipo_vehiculo;
    vehiculo.kilometraje = kilometraje || vehiculo.kilometraje;
    vehiculo.descripcion = descripcion || vehiculo.descripcion;

    await vehiculo.save();
    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar vehículo por id
const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findOne({ id: Number(id) });
    if (!vehiculo) return res.status(404).json({ msg: "Vehículo no encontrado" });

    await vehiculo.deleteOne();
    res.status(200).json({ msg: "Vehículo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export {
  crearVehiculo,
  listarVehiculos,
  obtenerVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
};
