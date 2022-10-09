const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validar-campos");
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categorias");
const { isACategoryId, isAdminRole } = require("../helpers/db-validators");
const { adminRole } = require("../middlewares");

const router = Router();

// Todas las categorias - public
router.get('/', getCategories);

// Categoria por Id - public
router.get('/:id', [
    check("id", "No es un id válido").isMongoId(),
    check('id', 'El category Id no se está registrado').custom( isACategoryId ),
    validateFields
], getCategory);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [ 
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], createCategory);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    check("id", "No es un id válido").isMongoId(),
    validateJwt,
    check('id', 'El category Id no está registrado').custom( isACategoryId ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], updateCategory);

// Borrar una categoria - Admin
router.delete('/:id', [
    check("id", "No es un id válido").isMongoId(),
    validateJwt,
    check('id', 'El category Id no está registrado').custom( isACategoryId ),
    isAdminRole,
    validateFields
], deleteCategory);



module.exports = router;