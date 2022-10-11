const { Router, response } = require("express");
const { check } = require("express-validator");
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require("../controllers/uploads");
const { isPermitedColection } = require("../helpers");
const { validateFilesBody } = require("../middlewares");
const { validateFields } = require("../middlewares/validar-campos");

const router = Router();

router.get('/:colection/:id', [
    check('id', 'El Id debe de ser de mongo').isMongoId(),
    check('colection').custom( c => isPermitedColection(c, ['users','products'])),
    showImage,
    validateFields
], );

router.post('/', validateFilesBody, uploadFile);

router.put('/:colection/:id', [
    check('id', 'El Id debe de ser de mongo').isMongoId(),
    check('colection').custom( c => isPermitedColection(c, ['users','products'])),
    validateFilesBody,
    validateFields
], updateImageCloudinary);

module.exports = router;
