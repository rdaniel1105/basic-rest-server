const { response } = require("express");

const adminRole = (req, res = response, next) => {
  if (!req.authUser) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token primero",
    });
  }

  const { role, name } = req.authUser;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${name} no es administrador - No puede hacer esto`,
    });
  }
  next();
};

const validateRoles = (...roles) => {
  return (req, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token primero",
      });
    }
    if (!roles.includes(req.authUser.role)) {
      return res.status(401).json({
        msg: `El servicio requiere uno de estos roles: ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  adminRole,
  validateRoles,
};
