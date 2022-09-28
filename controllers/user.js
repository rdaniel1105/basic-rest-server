const { response, request } = require('express');


const userGet = (req = request, res = response ) => {
    
    const {q,nombre,apikey} = req.query;

    res.json({
      msg: "get API - controller",
      q,
      nombre,
      apikey
    });
  }

  const userPut = (req, res = response ) => {
    
    const {id} = req.params;
    
    res.json({
      msg: "Put API - controller",
      id
    });
  }

  const userPost = (req, res = response ) => {
    
    const body = req.body;
    
    res.json({
      msg: "Post API - controller",
      body
    });
  }

  const userPatch = (req, res = response ) => {
    res.json({
      msg: "Patch API - controller",
    });
  }

  const userDelete = (req, res = response ) => {
    res.status(500).json({
      msg: "Delete API - controller",
    });
  }

module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}