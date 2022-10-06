const { Router } = require("express");
const { check } = require("express-validator");
const { authPost, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validateFields,
  ],
  authPost
);

router.post(
  "/google",
  [
    check("id_token", "El id_token es obligatorio").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
