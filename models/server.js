const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        //Middlewares
        this.middlewares();
        //Rutas de mi App
        this.routes();
    }

    middlewares() {
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Escuchando corriendo en ", process.env.PORT)
        });
    }
}

module.exports = Server