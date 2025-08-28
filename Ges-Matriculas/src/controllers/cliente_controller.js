import Cliente from "../models/Cliente.js";

// Crear Cliente
const crearCliente = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      cedula,
      fecha_nacimiento,
      ciudad,
      direccion,
      telefono,
      email,
    } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !apellido || !cedula || !fecha_nacimiento || !email) {
      return res.status(400).json({
        msg: "Nombre, apellido, cédula, fecha de nacimiento y email son obligatorios",
      });
    }

    // Verificar si ya existe un cliente con la misma cédula
    const existeCedula = await Cliente.findOne({ cedula });
    if (existeCedula) {
      return res.status(400).json({ msg: "La cédula ya está registrada" });
    }

    // Verificar si ya existe un cliente con el mismo email
    const existeEmail = await Cliente.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }

    // Crear y guardar nuevo cliente
    const nuevoCliente = new Cliente({
      nombre,
      apellido,
      cedula,
      fecha_nacimiento,
      ciudad,
      direccion,
      telefono,
      email,
    });

    await nuevoCliente.save();
    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Listar Clientes
const listarCliente = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 }); // ordena por fecha descendente
    res.status(200).json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Actualizar Cliente por ID
const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    // Verificar si se quiere actualizar la cédula o email y si ya existen en otro cliente
    const { cedula, email } = req.body;

    if (cedula && cedula !== cliente.cedula) {
      const existeCedula = await Cliente.findOne({ cedula });
      if (existeCedula) {
        return res.status(400).json({ msg: "La cédula ya está registrada en otro cliente" });
      }
    }

    if (email && email !== cliente.email) {
      const existeEmail = await Cliente.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({ msg: "El email ya está registrado en otro cliente" });
      }
    }

    // Actualizar cliente
    Object.assign(cliente, req.body);
    await cliente.save();

    res.status(200).json(cliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// Eliminar Cliente por ID
const eliminarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const cliente = await Cliente.findById(id);
    if (!cliente) {
      return res.status(404).json({ msg: "Cliente no encontrado" });
    }

    await cliente.deleteOne();
    res.status(200).json({ msg: "Cliente eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export {
  crearCliente,
  listarCliente,
  actualizarCliente,
  eliminarCliente
};
