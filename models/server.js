const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

   
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias'
        }
    
        //Conectar a la DB
        this.conectarDB();
        //Middlewares
        this.middlewares();
        //Rutas de mi App
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        //directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

         this.app.use(this.paths.auth, require('../routes/auth'));
         this.app.use(this.paths.usuarios, require('../routes/users'));
         this.app.use(this.paths.categorias, require('../routes/categorias'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Escuchando corriendo en ", process.env.PORT)
        });
    }
}

module.exports = Server