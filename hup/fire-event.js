'use strict';

const io = require('socket.io-client');
const host = 'http://localhost:3000';
const hupConnection=io.connect(host);

setInterval(()=>{
    hupConnection.emit("start");
},9000)

