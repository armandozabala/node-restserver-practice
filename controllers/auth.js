const { response, request } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
    
    const { correo, password } = req.body

    try {

        //Verificar email existe
        const usuario = await Usuario.findOne({ correo });
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - email'
            })
        }
        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }
        //Verificar Contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
             return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar JWT
        const token = await generarJWT( usuario.id )

        res.json({
            usuario,
            token
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    login
}