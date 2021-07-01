const { response, request } = require("express");
const { Categoria } = require('../models');



//Obtener
const obtenerCategorias = async ( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true }),
        Categoria.find({ estado: true })
            .populate('usuario','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ])

    res.json({
        total,
        categorias
    })

}

//Obtener Categoria por ID
const obtenerCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findById(id)
        .populate('usuario', 'nombre');

    res.json(categoria);
}


//actualizar
const actualizarCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;

    const { estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })
    .populate('usuario', 'nombre');


    res.json(categoria);

}
    
//borrar
const borrarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, { estado: false }, { new: true })
    .populate('usuario', 'nombre');

    res.json(categoriaBorrada);
}


const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if(categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }
    const categoria = await Categoria(data);
    //Guardar DB
    await categoria.save();

    res.status(201).json(categoria);
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}