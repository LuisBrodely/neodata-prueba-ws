const express = require('express')
const cors = require('cors');
const app = express();
const CoinGecko = require('coingecko-api');

const server = require('http').Server(app)

const CoinGeckoClient = new CoinGecko();

const PORT = 3000

app.use(cors())

const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
})

io.on('connection', (socket) => {
    console.log('Conectado Socket con id: ' + socket.id);

    

})

server.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
