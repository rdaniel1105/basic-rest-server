const { response, request } = require("express");
const { Product } = require("../models");


// getProducts - paginado - total - populate
const getProducts = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const statusQuery = { status: true };

  try {
    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(statusQuery),
      Product.find(statusQuery)
        .populate('category','name')
        .populate('user','name')
        .skip(from)
        .limit(limit),
    ]);

    res.json({
      totalProducts,
      products,
    });
  } catch (error) {
    throw error;
  }
};

// getProduct - populate
const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
	const product = await Product.findById(id)
    .populate('category','name')
    .populate('user','name')
	
	  res.json(product);
} catch (error) {
	throw error;
}
};

const createProduct = async (req, res = response) => {
  const name = req.body.name.toUpperCase();
  const { price, description ='',category } = req.body;
  // if (isNaN(price)) { price = 0 };

  try {
  const productDB = await Product.findOne({ name });
  

  if (productDB) {
    return res.status(400).json({
      msg: `El producto ${name} ya existe`,
    });
  }

  // Generate data to save
  const data = {
    name,
    price,
    description,
    user: req.authUser._id,
    category
  };

  const product = new Product(data);

  // Save to DB
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    throw error;
  }
};

// updateProduct
const updateProduct = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const { price, description ='' } = req.body;
  const { id } = req.params;
  // if (isNaN(price)) { price = 0 };

  
  try {
    const {category} = Product.findById(id);
    const data = {
      name,
      price,
      description,
      user: req.authUser._id,
      category
    };
    
    const product = await Product.findByIdAndUpdate(id, data);
    res.json(product);
  } catch (error) {
    throw error;
  }
};

// deleteProduct
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const status = { status:false };

  try {
	const product = await Product.findByIdAndUpdate(id, status);
	
	  res.json(product);
} catch (error) {
	throw error;
}

};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
