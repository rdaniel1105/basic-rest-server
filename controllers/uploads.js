const path = require("path");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");
const { uploadFileHelper } = require("../helpers");
const { User, Product } = require("../models");

const uploadFile = async (req, res = response) => {
  try {
    const fileName = await uploadFileHelper(req.files, undefined, "imgs");

    res.json({
      fileName,
    });
  } catch (msg) {
    res.status(401).json({
      msg,
    });
  }
};

const updateImage = async (req, res = response) => {
  const { colection, id } = req.params;
  let model;

  switch (colection) {
    case "users":
      try {
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    case "products":
      try {
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un producto con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  try {
    if (model.img) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        colection,
        model.img
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    const fileName = await uploadFileHelper(req.files, undefined, colection);
    model.img = fileName;

    await model.save();

    res.json(model);
  } catch (error) {
    throw error;
  }
};

const updateImageCloudinary = async (req, res = response) => {
  const { colection, id } = req.params;
  let model;

  switch (colection) {
    case "users":
      try {
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    case "products":
      try {
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un producto con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  try {
    if (model.img) {
      const imgURL = model.img.split('/');
      const imageName = imgURL[imgURL.length-1];
      const [ public_id ] = imageName.split('.');
      cloudinary.uploader.destroy( public_id );
    }
    const { tempFilePath } = req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload( tempFilePath );
    model.img = secure_url;

    await model.save();

    res.json(model);
  } catch (error) {
    throw error;
  }
};

const showImage = async (req, res = response) => {
  const { colection, id } = req.params;
  let model;

  switch (colection) {
    case "users":
      try {
        model = await User.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un usuario con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    case "products":
      try {
        model = await Product.findById(id);
        if (!model) {
          return res.status(400).json({
            msg: `No existe un producto con el id: ${id}`,
          });
        }
      } catch (error) {
        throw error;
      }
      break;

    default:
      return res.status(500).json({
        msg: "Se me olvidó validar esto",
      });
  }

  try {
    if (model.img) {
      const imagePath = path.join(
        __dirname,
        "../uploads",
        colection,
        model.img
      );
      if (fs.existsSync(imagePath)) {
        return res.sendFile( imagePath );
      }
    }
    const placeHolderPath = path.join(__dirname,'../assets/no-image.jpg');
    res.sendFile( placeHolderPath );
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadFile,
  updateImage,
  showImage,
  updateImageCloudinary
};
