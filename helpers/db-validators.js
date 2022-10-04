const Role = require("../models/role");
const User = require("../models/user");

const isAValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`El rol ${role} no está registrado en la base de datos`);
  }
};

const isAValidEmail = async (email = "") => {
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error(`El correo ${email} ya está en uso`);
  }
};

const isAnUserId = async (id) => {
  const userId = await User.findById(id);
  if (!userId) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  isAValidRole,
  isAValidEmail,
  isAnUserId,
};
