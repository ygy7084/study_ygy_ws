'use strict';

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = _http2.default.createServer(function () {});

var io = (0, _socket2.default)(server);

var a = 0;

io.on('connection', function (socket) {
    a++;
    console.log('connection : ' + a);
    socket.emit('connection', { msg: 'hi' });

    socket.on('disconnect', function () {
        a--;
        console.log('connection : ' + a);
    });

    socket.on('chat', function (chat) {
        io.emit('chat', chat);
    });
    socket.on('modify', function (modify) {
        io.emit('modify', modify);
    });
    socket.on('modifyCoords', function (modifyCoords) {
        io.emit('modifyCoords', modifyCoords);
    });
    socket.on('remove', function (remove) {
        io.emit('remove', remove);
    });
    socket.on('write', function (write) {
        io.emit('write', write);
    });
});

server.listen(8081, function () {
    console.log('websocket server on', 8081);
});
