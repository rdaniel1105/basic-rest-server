const { request, response } = require("express");


const validateFilesBody = (req=request, res=response,next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({
            msg: 'Debes enviar el archivo a subir'
        })
    }
    next();
}

module.exports = {
    validateFilesBody
}