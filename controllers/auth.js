const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJwt } = require("../helpers/generate-Jwt");

const authPost = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no es correcto",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no es correcto - status:false",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Contraseña no es correcto - password",
      });
    }

    const token = await generateJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Comunicarse con admin",
    });
  }
};

module.exports = {
  authPost,
};
