const { request, response } = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const validateJwt = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const authUser = await User.findById(uid);

    if (!authUser) {
      return res.status(401).json({
        msg: "Non existant user",
      });
    }

    if (!authUser.status) {
      return res.status(401).json({
        msg: "Deleted user",
      });
    }

    req.authUser = authUser;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validateJwt,
};
