const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { generateJwt } = require("../helpers/generate-Jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn = async(req, res = response) => {
  const {id_token} = req.body;

  try {
    const { name, img, email } = await googleVerify( id_token );
    
    let user = await User.findOne({email});

    if (!user) {
      const data = {
        name,
        email,
        password: ':P',
        img,
        google: true,
        role: 'USER_ROLE'
      };

      user = new User(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'Speak with admin'
      })
    }

    const token = await generateJwt(user.id);

    res.json({
      user,
      token
    })
    
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Token not verified'
    });
    return console.log(error);
  }


}

module.exports = {
  authPost,
  googleSignIn
};
