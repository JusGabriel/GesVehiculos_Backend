import Vehiculo from "../models/Vehiculo.js";

// Crear Vehículo
const crearVehiculo = async (req, res) => {
  try {
    const {
      marcha,
      modelo,
      anio_fabricacion,
      placa,
      color,
      tipo_vehiculo,
      kilometraje,
      descripcion,
    } = req.body;

    // Validar campos obligatorios
    if (
      !marcha ||
      !modelo ||
      !anio_fabricacion ||
      !placa ||
      !color ||
      !tipo_vehiculo ||
      kilometraje == null
    ) {
      return res.status(400).json({ msg: "Todos los campos obligatorios deben estar presentes" });
    }

    // Verificar si placa ya existe
    const existePlaca = await Vehiculo.findOne({ placa });
    if (existePlaca) {
      return res.status(400).json({ msg: "La placa ya está registrada" });
    }

    const nuevoVehiculo = new Vehiculo({
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

// Listar Vehículos
const listarVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find().sort({ createdAt: -1 });
    res.status(200).json(vehiculos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Obtener Vehículo por _id
const obtenerVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
    if (!vehiculo)
      return res.status(404).json({ msg: "Vehículo no encontrado" });

    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar Vehículo por _id
const actualizarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
    if (!vehiculo)
      return res.status(404).json({ msg: "Vehículo no encontrado" });

    // Validar si quieren actualizar la placa y ya existe otra con esa placa
    if (req.body.placa && req.body.placa !== vehiculo.placa) {
      const placaExiste = await Vehiculo.findOne({ placa: req.body.placa });
      if (placaExiste) {
        return res.status(400).json({ msg: "La placa ya está registrada en otro vehículo" });
      }
    }

    // Actualizar campos permitidos
    Object.assign(vehiculo, req.body);
    await vehiculo.save();

    res.status(200).json(vehiculo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar Vehículo por _id
const eliminarVehiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const vehiculo = await Vehiculo.findById(id);
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
