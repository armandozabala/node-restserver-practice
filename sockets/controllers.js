const { comprobarJWT } = require("../helpers/generar-jwt");
const { ChatMensajes } = require("../models");

const chatMensajes = new ChatMensajes();

console.log(chatMensajes);

const socketController = async ( socket, io ) => {

    const token = socket.handshake.headers['x-token'];

    const usuario = await comprobarJWT(token);

    if (!usuario) {
        return socket.disconnect();
    }
    //Agregar el usuario
    chatMensajes.conectarUsuario(usuario)
    io.emit('usuarios-activos', chatMensajes.usuariosArr);

    //Limpia cuando se desconecta
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
         io.emit('usuarios-activos', chatMensajes.usuariosArr);
    });
}

module.exports = {
    socketController
}