const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');

const router = Router();


//Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

//Obtener categoria por ID
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
],obtenerCategoria);

//Crear categorias - privada con token
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


//pendientes
//Actualizar Categoria
router.put('/:id', (req, res) => {
    res.json({
        msg: 'post'
    })
});

//Delete o borrar categoria - solo si solo es Admin
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'delete - estado'
    })
});


module.exports = router;