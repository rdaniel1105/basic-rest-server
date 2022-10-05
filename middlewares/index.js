const validateJwtIndex = require("../middlewares/validate-jwt");
const validateFieldsIndex = require("../middlewares/validar-campos");
const validateRolesIndex = require("../middlewares/validate-roles");

module.exports = {
  ...validateFieldsIndex,
  ...validateJwtIndex,
  ...validateRolesIndex,
};
