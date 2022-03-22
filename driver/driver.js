const io = require('socket.io-client');

const host ='http://localhost:3000'; //Heroku-link

const hupConnection = io.connect(host);

const pickup = (payload) => {
    let EVENT = {
      event: "pickup",
      time: new Date().toString(),
      payload: payload
    }
    // console.log(EVENT);
    hupConnection.emit('print', EVENT);
    setTimeout(function() {
      hupConnection.emit('hupinTtransit', EVENT.payload);
    }, 1000);
  }
  hupConnection.on('pickup', pickup);
  
  const inTtransit = (payload) => {
    
    
    let message=`DRIVER: picked up  ${payload.orderId}`;
    hupConnection.emit('print', message);
    let EVENT = {
        event: 'in-transit',
        time: new Date().toString(),
        payload: payload
    }
    // console.log(EVENT);
    hupConnection.emit('print', EVENT);
    setTimeout(function() {
        hupConnection.emit('hupDelivered', EVENT.payload);
      }, 3000);
    

}
hupConnection.on('inTtransit', inTtransit);

const delivered = (payload) => {
   let message= `DRIVER: delivered up  ${payload.orderId}`;
   hupConnection.emit('print', message);
    hupConnection.emit('hupNotification', payload);
    let EVENT = {
        event: 'delivered',
        time: new Date().toString(),
        payload: payload
    }
    hupConnection.emit('print', EVENT);
    // console.log(EVENT);


}
hupConnection.on('delivered', delivered);
