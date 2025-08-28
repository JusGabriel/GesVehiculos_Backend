import Vehiculo from "../models/Vehiculo.js";

// Crear Vehículo
const crearVehiculo = async (req, res) => {
  try {
    const {
      id,
      marcha,
      modelo,
      anio_fabricacion,
      placa,
      color,
      tipo_vehiculo,
      kilometraje,
      descripcion,
    } = req.body;

    // Validación de campos obligatorios
    if (
      !id ||
      !marcha ||
      !modelo ||
      !anio_fabricacion ||
      !placa ||
      !color ||
      !tipo_vehiculo ||
      !kilometraje
    ) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe vehículo con la misma placa o id
    const existePlaca = await Vehiculo.findOne({ placa });
    if (existePlaca) {
      return res.status(400).json({ msg: "La placa ya está registrada" });
    }

    const existeId = await Vehiculo.findOne({ id });
    if (existeId) {
      return res.status(400).json({ msg: "El id del vehículo ya está registrado" });
    }

    // Crear nuevo vehículo
    const nuevoVehiculo = new Vehiculo({
      id,
      marcha,
      modelo,
      anio_fabricacion,
      placa,
      color,
      tipo_vehiculo,
      kilometraje,
      descripcion,
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
    const vehiculos = await Vehiculo.find().sort({ createdAt: -1 });
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener vehículo por id (campo personalizado)
const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findOne({ id });
    if (!vehiculo)
      return res.status(404).json({ msg: "Vehículo no encontrado" });

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
    const vehiculo = await Vehiculo.findOne({ id });
    if (!vehiculo)
      return res.status(404).json({ msg: "Vehículo no encontrado" });

    // Validar si quieren actualizar placa o id a otro que ya exista
    if (req.body.placa && req.body.placa !== vehiculo.placa) {
      const placaExiste = await Vehiculo.findOne({ placa: req.body.placa });
      if (placaExiste) {
        return res.status(400).json({ msg: "La placa ya está registrada en otro vehículo" });
      }
    }

    if (req.body.id && req.body.id !== id) {
      const idExiste = await Vehiculo.findOne({ id: req.body.id });
      if (idExiste) {
        return res.status(400).json({ msg: "El id ya está registrado en otro vehículo" });
      }
    }

    // Actualizar campos (solo los que envíen)
    Object.assign(vehiculo, req.body);
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
    const vehiculo = await Vehiculo.findOne({ id });
    if (!vehiculo)
      return res.status(404).json({ msg: "Vehículo no encontrado" });

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
  eliminarVehiculo,
};
