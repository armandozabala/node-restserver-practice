
//Ref

const txtUid = document.querySelector('#txtUid');
const  txtMensaje = document.querySelector('#txtMensajes');
const  ulUsuarios = document.querySelector('#ulUsuarios');
const  ulMensajes = document.querySelector('#ulMensajes');
const  btnSalir = document.querySelector('#btnSalir');

var url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
    : 'https://rest-users-node.herokuapp.com/api/auth/';
            
let usuario = null;
let socket = null;


const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { usuario: userDB, token: tokenDB } = await resp.json();
    localStorage.setItem('token', tokenDB);
    usuario = userDB;
    document.title = usuario.nombre;

    await conectarSocket();

}

const conectarSocket = async () => {

    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Socket Online')
    })

    socket.on('disconnect', () => {
        console.log('Socket Offline')
    })

    //Escucha
    socket.on('recibir-mensajes', () => {

    })

    socket.on('usuarios-activos', dibujarUsuarios)

    socket.on('mensaje-privado', () => {

    })



}

const dibujarUsuarios = ( usuarios=[] ) => {
    console.log(usuarios)
    let usersHtml = '';

    usuarios.forEach(({ nombre, uid }) => {
        usersHtml = `
            <li>
              <p>
                <h5 class="text-success">${nombre}</h5>
                <span class="fs-6 text-muted">${uid}</span>
              </p>
            </li>
        `
    });

    ulUsuarios.innerHTML = usersHtml;
}

const main = async () => {

    await validarJWT();

}

main();



