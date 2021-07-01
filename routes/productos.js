const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, borrarProducto, actualizarProducto } = require('../controllers/productos');
const { existeProducto, existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();


//Obtener todas las productos - publico
router.get('/', obtenerProductos);


//Obtener producto por ID
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos,
], obtenerProducto);


//Crear producto - privada con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID valido de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto);


//Borrar Producto
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], borrarProducto);


//Actualizar Categoria
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos,
],actualizarProducto);


module.exports = router;