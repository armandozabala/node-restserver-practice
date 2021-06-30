/*{
        nombre: '',
        correo: '',
        password: '',
        img: '',
        rol: '',
        estado: false,
        google: true
}*/

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'El password es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}


module.exports = model('Usuario', UsuarioSchema);