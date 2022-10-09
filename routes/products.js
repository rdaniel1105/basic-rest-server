const { Router } = require("express");
const { check } = require("express-validator");
const { validateJwt } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validar-campos");
const { createProduct, updateProduct, getProduct, getProducts, deleteProduct } = require("../controllers/products");
const { isAdminRole, isAProductId, isACategoryId } = require("../helpers/db-validators");
const { adminRole } = require("../middlewares");

const router = Router();

// Todas las categorias - public
router.get('/', getProducts);

// Categoria por Id - public
router.get('/:id', [
    check("id", "No es un id válido").isMongoId(),
    check('id', 'El product Id no está registrado').custom( isAProductId ),
    validateFields
], getProduct);

// Crear categoria - privado - cualquier persona con token valido
router.post('/', [ 
    validateJwt,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'El category Id no es un Id de Mongo').isMongoId(),
    check('category', 'El category Id no está registrado').custom( isACategoryId ),
    validateFields
], createProduct);

// Actualizar - privado - cualquiera con token valido
router.put('/:id', [
    check("id", "No es un id válido").isMongoId(),
    validateJwt,
    check('id', 'El product Id no está registrado').custom( isAProductId ),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields
], updateProduct);

// Borrar una categoria - Admin
router.delete('/:id', [
    check("id", "No es un id válido").isMongoId(),
    validateJwt,
    check('id', 'El product Id no está registrado').custom( isAProductId ),
    isAdminRole,
    validateFields
], deleteProduct);



module.exports = router;