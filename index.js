const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const { join } = require('path')

const app = express();
const PORT = 3000;

const server = createServer(app);
app.use(express.static(join(__dirname, 'public')))

const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'home.html'))
})

app.get('/about', (req, res) => {
    res.send('<h1> Web Socket Learing </h1>')
})

// io.on('connection', (socket) => {
//     console.log('a user connected', socket.id);
//     socket.on('chat message', (msg) => {
//         console.log('Message : ', msg)
//         socket.broadcast.emit('hi');
//     })
//     socket.on('disconnect', () => {
//         console.log('user disconnected', socket.id);
//     });
// })

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        io.emit('user', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});