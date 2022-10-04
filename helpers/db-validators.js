const Role = require("../models/role");
const User = require("../models/user");

const isAValidRole = async (role = "") => {
  try {
    const existsRole = await Role.findOne({ role });
    if (!existsRole) {
      throw new Error(`El rol ${role} no está registrado en la base de datos`);
    }
  } catch (error) {
    throw error;
  }
};

const isAValidEmail = async (email = "") => {
  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      throw new Error(`El correo ${email} ya está en uso`);
    }
  } catch (error) {
    throw error;
  }
};

const isAnUserId = async (id) => {
  try {
    const userId = await User.findById(id);
    if (!userId) {
      throw new Error(`El id: ${id} no existe`);
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  isAValidRole,
  isAValidEmail,
  isAnUserId,
};
