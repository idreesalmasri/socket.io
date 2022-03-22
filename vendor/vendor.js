'use strict';
const { faker } = require('@faker-js/faker');

const io = require('socket.io-client');

const host ='http://localhost:3000'; //Heroku-link

const hupConnection = io.connect(host);


const createOrder = () => {
    let order ={
        store: '1-206-flowers',
        orderId: faker.random.uuid(),
        customer: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: `${faker.address.city()}, ${faker.address.stateAbbr()}`
      }
        // console.log("new order tobe picked up");
        hupConnection.emit('print', "vendor :new order tobe picked up");
        hupConnection.emit('hupPickup', order);
      
      }
      hupConnection.on('createOrder', createOrder);
     
     
     const notification = (payload) => {

       let message=`vendor :Thank you for delivering ${payload.orderId}`;
        hupConnection.emit('print', message);
      
      }
      

      hupConnection.on('notification', notification);

