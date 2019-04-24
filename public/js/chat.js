const socket = io();

socket.on('message', (msg) => {
    console.log(msg);
});

let form = document.getElementById('formulario');
let campo = document.getElementById('campo');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    let msg = campo.value;
    socket.emit('sendMessage', msg);
});

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation){
        return alert('Função não disponível')
    } 

    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
    });
});
