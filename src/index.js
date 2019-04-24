const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', (socket) => {
    console.log('Nova conexão de Web Socket!');
    
    socket.emit('message', 'Welcome!');
    socket.broadcast.emit('message', 'Novo usuário conectou!')
   
    socket.on('sendMessage', (msg) =>{
        io.emit('message', msg)
    });

    socket.on('disconnect', () => {
        io.emit('message', 'Usuário desconectado!')
    });
   
});

server.listen(port, () => {
    console.log(`Servidor no ar na porta ${port}`);
});
