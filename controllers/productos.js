const { response, request } = require("express");
const { Producto } = require('../models');

//Obtener Todos los  Productos
const obtenerProductos = async ( req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const [total, productos] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
            .populate('usuario', 'nombre')
            .populate('categoria','nombre')
            .limit(Number(limite))
            .skip(Number(desde))
    ])

    res.json({
        total,
        productos
    })

}

//Obtener Producto por ID
const obtenerProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    res.json(producto);
}

//Crear Producto
const crearProducto = async (req = request, res = response) => {

    const {  estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if(productoDB){
        return res.status(400).json({
            msg: `el producto ${productoDB.nombre}, ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }
    const producto = await Producto(data);
    //Guardar DB
    await producto.save();

    res.status(201).json(producto);
}


//borrar producto
const borrarProducto = async (req = request, res = response) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true })
    .populate('usuario', 'nombre');

    res.json(productoBorrado);
}


//actualizar producto
const actualizarProducto = async (req = request, res = response) => {
    
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');


    res.json(producto);

}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    borrarProducto,
    actualizarProducto
}