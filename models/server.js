const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');

const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      users: "/api/users",
      category: "/api/categories",
      search: "/api/search",
      products: "/api/products",
      uploads: '/api/uploads'
    };

    // Connect to Database
    this.connectDatabase();

    // Middelwares
    this.middelwares();

    // Rutas de mi aplicación
    this.routes();
  }

  async connectDatabase() {
    try {
      await dbConection();
    } catch (error) {
      throw error;
    }
  }

  middelwares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());

    // Directorio público
    this.app.use(express.static("public"));

    // FileUpload
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
  }));
  }

  routes() {
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.category, require("../routes/categorias"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.search, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = {
  Server,
};
