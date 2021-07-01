const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

   
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads'
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
        this.app.use(cors());
        //lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        //File Upload - Carga de Archivo
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

         this.app.use(this.paths.auth, require('../routes/auth'));
         this.app.use(this.paths.usuarios, require('../routes/users'));
         this.app.use(this.paths.categorias, require('../routes/categorias'));
         this.app.use(this.paths.productos, require('../routes/productos'));
         this.app.use(this.paths.buscar, require('../routes/buscar'));
         this.app.use(this.paths.uploads, require('../routes/upload'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Escuchando corriendo en ", process.env.PORT)
        });
    }
}

module.exports = Server