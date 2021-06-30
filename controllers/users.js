
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/user');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async (req, res = response) => {

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body

    //validar contra la DB
    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    })
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });
    //Encriptar el pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)
    //Guardar DB
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params;

    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        usuario
    })
}


module.exports = {
    usuariosGet,
    usuariosDelete,
    usuariosPost,
    usuariosPut
}