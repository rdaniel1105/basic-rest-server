const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");
const permitedColections = ["users", "categories", "products", "roles"];

const usersSearch = async (termino, res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const user = await User.findById(termino);

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regExp = new RegExp(termino, "i");

  const users = await User.find({
    $or: [{ name: regExp }, { email: regExp }],
    $and: [{ status: true }],
  });

  res.json({
    results: users,
  });
};

const categoriesSearch = async (termino, res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const category = await Category.findById(termino);

    return res.json({
      results: category ? [category] : [],
    });
  }

  const regExp = new RegExp(termino, "i");

  const categories = await Product.find({
    $and: [{ status: true }, { name: regExp }],
  });

  res.json({
    results: categories,
  });
};

const productsSearch = async (termino, res = response) => {
  const isMongoId = ObjectId.isValid(termino);

  if (isMongoId) {
    const product = await Product.findById(termino).populate(
      "category",
      "name"
    );

    return res.json({
      results: product ? [product] : [],
    });
  }

  const regExp = new RegExp(termino, "i");

  const products = await Product.find({
    $and: [{ status: true }, { name: regExp }],
  }).populate("category", "name");

  res.json({
    results: products,
  });
};

const search = (req, res = response) => {
  const { colection, termino } = req.params;

  if (!permitedColections.includes(colection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${permitedColections}`,
    });
  }

  switch (colection) {
    case "users":
      usersSearch(termino, res);
      break;
    case "categories":
      categoriesSearch(termino, res);
      break;
    case "products":
      productsSearch(termino, res);
      break;
    default:
      res.status(500).json({
        msg: "Se me olvidó hacer esta búsqueda",
      });
  }
};

module.exports = {
  search,
};
