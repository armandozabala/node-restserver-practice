
const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const { q, nombre = 'no name', page = 1, limit } = req.query;

    res.json({
        msg: 'get API desde controller ', q, limit, page, nombre
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API desde controller ' + id
    })
}

const usuariosPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API desde controller - ' + nombre + ' edad ' + edad
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API desde controller'
    })
}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}