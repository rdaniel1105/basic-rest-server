const express = require('express');
const cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middelwares
        this.middelwares();

        // Rutas de mi aplicación
        this.routes();
    }

    middelwares() {
        
        // CORS
        this.app.use( cors() );
        
        // Lectura y parseo del body
        this.app.use( express.json());

        // Directorio público
        this.app.use( express.static('public') );
    }

    routes() {
        
        this.app.use( this.usersPath , require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ',this.port);
        })
    }

}


module.exports = {
    Server
}