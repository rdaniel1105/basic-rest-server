const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

const userGet = async(req = request, res = response) => {
  const {limit = 5, from = 0} = req.query;
  const statusQuery = { status: true }

  // const users = await User.find(statusQuery)
  //   .skip(from)
  //   .limit(limit);

  // const totalUsers = await User.countDocuments(statusQuery);

  const [totalUsers,users] = await Promise.all([
    User.countDocuments(statusQuery),
    User.find(statusQuery)
      .skip(from)
      .limit(limit)])

  res.json({
    totalUsers,
    users
  });
};

const userPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...leftData } = req.body;

  // TODO validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync();
    leftData.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, leftData);

  res.json(user);
};

const userPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json(user);
};

const userPatch = (req, res = response) => {
  res.json({
    msg: "Patch API - controller",
  });
};

const userDelete = async(req, res = response) => {
  const { id } = req.params;
  
  // Deletion
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate( id, { status:false });

  res.json(user);
};

module.exports = {
  userGet,
  userPut,
  userPost,
  userPatch,
  userDelete,
};
