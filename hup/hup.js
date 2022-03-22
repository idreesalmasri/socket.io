'use strict';

const port = process.env.PORT || 3000;


const io = require('socket.io')(port);
io.on('connection', (socket) => {
    console.log('CONNECTED ', socket.id);

    socket.on('start',() => {
        
        io.emit('createOrder'); 
    })

    socket.on('hupPickup', payload => {
        io.emit('pickup', payload)
    })
    socket.on('hupinTtransit', payload => {
        io.emit('inTtransit', payload)
    })
    socket.on('hupDelivered', payload => {
        io.emit('delivered', payload)
    })
    socket.on('hupNotification', payload => {
        io.emit('notification', payload)
    })
    socket.on('print', payload => {
        console.log(payload);
    })
});


