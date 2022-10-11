const validateJwtIndex = require("../middlewares/validate-jwt");
const validateFieldsIndex = require("../middlewares/validar-campos");
const validateRolesIndex = require("../middlewares/validate-roles");
const validateFileUpload = require('../middlewares/validate-files');

module.exports = {
  ...validateFieldsIndex,
  ...validateJwtIndex,
  ...validateRolesIndex,
  ...validateFileUpload
};
