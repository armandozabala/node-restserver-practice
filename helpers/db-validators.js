const Role = require("../models/role")
const Usuario = require("../models/user")



const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la DB`)
    }
}

const emailExiste = async (correo = '') => {
    //Verificar correo exista
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    //Verificar correo exista
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}