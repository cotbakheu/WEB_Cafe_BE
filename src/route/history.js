const express = require('express');
const route = express.Router();
const { getAllHistory,
        insertHistory,
        updateHistory,
        deleteHistory,
        detailHistroy  } = require('../controller/history');

const { authentication,
        adminAuthorization,
        cashierAuthorization } = require('../helper/middleware/auth');
const { getHistoryRedis} = require('../helper/redis/history');

route
    .get('/history',authentication, adminAuthorization, getHistoryRedis, getAllHistory)
    .get('/history/:invoice',authentication, adminAuthorization, detailHistroy)
    .post('/history',authentication, cashierAuthorization, insertHistory)         //kasir
    .put('/history/:id', authentication, adminAuthorization, updateHistory)                      //admin
    .patch('/history/:id', authentication, adminAuthorization, updateHistory)                    //admin
    .delete('/history/:id', authentication, adminAuthorization, deleteHistory)                   //admin

module.exports = route