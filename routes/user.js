const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
} = require("../controllers/user");
const {
  isAValidRole,
  isAValidEmail,
  isAnUserId,
} = require("../helpers/db-validators");

const {
  validateFields,
  validateJwt,
  validateRoles,
  adminRole,
} = require("../middlewares");

const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isAnUserId),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y debe contener mas de 6 letras"
    ).isLength({ min: 6 }),
    // check('email', 'El correo no es válido').isEmail(),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check("email").custom(isAValidEmail),
    check("role").custom(isAValidRole),
    validateFields,
  ],
  userPost
);

router.patch("/", userPatch);

router.delete(
  "/:id",
  [
    validateJwt,
    //adminRole,
    validateRoles("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isAnUserId),
    validateFields,
  ],
  userDelete
);

module.exports = router;
