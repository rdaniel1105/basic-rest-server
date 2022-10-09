const { response, request } = require("express");
const { Category } = require("../models");


// getCategories - paginado - total - populate
const getCategories = async (req, res) => {
  const { limit = 5, from = 0 } = req.query;
  const statusQuery = { status: true };

  try {
    const [totalCategories, categories] = await Promise.all([
      Category.countDocuments(statusQuery),
      Category.find(statusQuery)
        .populate('user','name')
        .skip(from)
        .limit(limit),
    ]);

    res.json({
      totalCategories,
      categories,
    });
  } catch (error) {
    throw error;
  }
};

// getCategory - populate
const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
	const category = await Category.findById(id)
	    .populate('user','name');
	
	  res.json(category);
} catch (error) {
	throw error;
}
};

const createCategory = async (req, res = response) => {
  const name = req.body.name.toUpperCase();

  try {
  const categoryDB = await Category.findOne({ name });
  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoría ${name} ya existe`,
    });
  }

  // Generate data to save
  const data = {
    name,
    user: req.authUser._id,
  };

  const category = new Category(data);

  // Save to DB
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    throw error;
  }
};

// updateCategory
const updateCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();
  const { id } = req.params;

  const data = {
    name,
    user: req.authUser._id,
  };

  try {
    const category = await Category.findByIdAndUpdate(id, data);
    res.json(category);
  } catch (error) {
    throw error;
  }
};

// deleteCategory
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const status = { status:false };

  try {
	const category = await Category.findByIdAndUpdate(id, status);
	
	  res.json(category);
} catch (error) {
	throw error;
}

};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
