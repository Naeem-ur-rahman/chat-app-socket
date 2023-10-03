const express = require('express')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const { join } = require('path')

const app = express();
const PORT = 3000;

const server = createServer(app);
app.use(express.static(join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'home.html'))
})

app.get('/about', (req, res) => {
    res.send('<h1> Web Socket Learing </h1>')
})

server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});