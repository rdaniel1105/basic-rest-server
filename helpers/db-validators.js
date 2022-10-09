const { response } = require("express");
const { Category, Product } = require("../models");
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

const isACategoryId = async (id='') => {
  try {
    const categoryId = await Category.findById(id);
    if (!categoryId) {
      throw (`El id: ${id} no existe`);
    }
  } catch (error) {
    throw error;
  }
};

const isAProductId = async (id='') => {
  try {
    const productId = await Product.findById(id);
    if (!productId) {
      throw (`El product id: ${id} no existe`);
    }
  } catch (error) {
    throw error;
  }
};

const isAdminRole = async (req,res=response,next) => {
  const adminRole = await User.findById(req.authUser.id);
  if (!adminRole.role) {
    return res.status(500).json({
      msg: 'No se pudo encontrar'
    })
  }
  if (adminRole.role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `El usuario ${adminRole.name} no es Admin`
    })
  }
  next();
}

module.exports = {
  isAValidRole,
  isAValidEmail,
  isAnUserId,
  isACategoryId,
  isAdminRole,
  isAProductId
};
