const express = require('express');
const route = express.Router();
const { getAllItems, 
        insertItems, 
        updateItems, 
        deleteItems,  } = require('../controller/items');
const { authentication,
        adminAuthorization,
        cashierAuthorization } = require('../helper/middleware/auth');
const { getItemsRedis} = require('../helper/redis/item');

const singleUpload = require('../helper/middleware/upload');

route
//product route
  .get('/items', authentication, getItemsRedis, getAllItems)
  .get('/items', authentication, adminAuthorization, getAllItems)              //cashier & admin
  .post('/items', authentication, adminAuthorization, singleUpload, insertItems)        //admin
  .put('/items/:id', authentication, adminAuthorization, singleUpload, updateItems)     //admin
  .patch('/items/:id', authentication, adminAuthorization, updateItems)   //admin
  .delete('/items/:id', authentication, adminAuthorization, deleteItems)  //admin

module.exports = route