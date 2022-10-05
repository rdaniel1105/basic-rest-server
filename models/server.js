const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

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
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
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
