const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter');
const bodyParser = require("body-parser");
const PORT = 3000;
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const urlencodedParser = bodyParser.urlencoded({ extended: false })

server.listen(PORT, '192.168.50.52');

app.use(urlencodedParser)
app.set('view engine', 'ejs');
app.use("/", authRouter)



const start = () => {
    try {
        mongoose.connect(`mongodb+srv://maksim:maksim123@cluster0.fsmzm.mongodb.net/auth?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
    } catch (e) {
        console.log(e)
    }
}

start()

users = [];
connections = [];

io.sockets.on('connection', function (socket) {
    //console.log('Успешное соединение');
    connections.push(socket);

    socket.on('disconnect', function (data) {
        connections.splice(connections.indexOf(socket), 1);
        //console.log('Отключение');
    })

    socket.on('send mess', function (data) {
        // console.log(data.mess)
        if (data.mess) {
            io.sockets.emit('add mess', { mess: data.mess, name: data.name, className: data.className });
        }
    });

});