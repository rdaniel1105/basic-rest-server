const { Router } = require("express");
const { check } = require("express-validator");
const { authPost } = require("../controllers/auth");
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

module.exports = router;
