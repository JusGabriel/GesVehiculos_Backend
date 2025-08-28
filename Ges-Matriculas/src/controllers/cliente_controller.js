import Cliente from "../models/Cliente.js";

// Crear Cliente
const crearCliente = async (req, res) => {
  try {
    const { nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email } = req.body;

    if (!nombre || !apellido || !cedula || !email) {
      return res.status(400).json({ msg: "Nombre, apellido, cédula y email son obligatorios" });
    }

    const existeCedula = await Cliente.findOne({ cedula });
    if (existeCedula) return res.status(400).json({ msg: "La cédula ya está registrada" });

    const existeEmail = await Cliente.findOne({ email });
    if (existeEmail) return res.status(400).json({ msg: "El email ya está registrado" });

    const nuevoCliente = new Cliente(req.body);
    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Listar Clientes
const listarCliente= async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar Cliente por id
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.findById(id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    Object.assign(cliente, req.body); // Actualiza todos los campos recibidos
    await cliente.save();
    res.status(200).json(cliente);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar Cliente por id
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await cliente.findById(id);
    if (!cliente) return res.status(404).json({ msg: "Cliente no encontrado" });

    await cliente.deleteOne();
    res.status(200).json({ msg: "Cliente eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { crearCliente, listarCliente, actualizarCliente, eliminarCliente };
