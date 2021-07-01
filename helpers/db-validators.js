const Role = require("../models/role")
const { Usuario, Categoria, Producto } = require("../models")



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


//Validador de Categoria
const existeCategoria = async ( id ) => {

    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`El id ${id} no existe`)
    }
}


//Validador de Producto
const existeProducto = async ( id ) => {

    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El id ${id} del producto no existe`)
    }
}

//Validar las colecciones permitidas
const coleccionesPermitidas = ( coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, las permitidas ${colecciones}`)
    }

    return true;
}



module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    coleccionesPermitidas
}