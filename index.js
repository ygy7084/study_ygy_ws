import socket from 'socket.io';
import http from 'http';
import fs from 'fs';
import path from 'path';
import https from 'https';
// SSL (임시 방편 - 자체 SSL, 공인 인증 SSL(기관 인증) 아님)
const options = {
  key: fs.readFileSync(path.join(__dirname, '../', 'certs', 'server', 'privkey.pem'))
  , cert: fs.readFileSync(path.join(__dirname, '../', 'certs', 'server', 'fullchain.pem'))
};
const server = https.createServer((options) => {
});

const io = socket.listen(server);

let a = 0;

io.on('connection', (socket) => {
    a++;
    console.log('connection : '+a);
    socket.emit('connection',{ msg : 'hi'});

    socket.on('disconnect', () => {
        a--;
        console.log('connection : '+a);
    });

    socket.on('chat', (chat) => {
        io.emit('chat', chat)
    });
    socket.on('modify', (modify) => {
        io.emit('modify', modify)
    });
    socket.on('modifyCoords', (modifyCoords) => {
        io.emit('modifyCoords', modifyCoords)
    });
    socket.on('remove', (remove) => {
        io.emit('remove', remove);
    });
    socket.on('write', (write) => {
        io.emit('write', write);
    });
});

server.listen(3000,() => {
    console.log('websocket server on',3000);
});
