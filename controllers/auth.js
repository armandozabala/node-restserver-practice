const { response, request } = require("express");
const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignIn =  async( req = request , res = response ) => {

   
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);
        

            let usuario = await Usuario.findOne({correo})

            if (!usuario) {
                //tengo que crear el usuario
                const data = {
                    nombre,
                    correo,
                    password: '',
                    img,
                    google: true
                }

                usuario = new Usuario(data)
                await usuario.save();
            }
            
            //Si el usuario en DB
            if (!usuario.estado) {
                return res.status(401).json({
                    msg: 'Hable con el administrador - bloqueado'
                })     
            }
        
            //Generar JWT
            const token = await generarJWT( usuario.id )
            
            res.json({
                usuario,
                token
            });
        
    } catch (error) {
         res.status(404).json({
                msg: 'Token Google no es valido',
         })
    }
}


const validarTokenUsuario = async (req, res = response ) => {

    // Generar el JWT
    const token = await generarJWT( req.usuario._id );
    
    res.json({
        usuario: req.usuario,
        token: token,
    })

}




module.exports = {
    login,
    googleSignIn,
    validarTokenUsuario
}