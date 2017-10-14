import socket from 'socket.io';
import http from 'http';

const server = http.createServer(() => {
});

const io = socket(server);

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