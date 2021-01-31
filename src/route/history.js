const express = require('express');
const route = express.Router();
const { getAllHistory,
        insertHistory,
        updateHistory,
        deleteHistory  } = require('../controller/history');

const { authentication,
        adminAuthorization,
        cashierAuthorization } = require('../helper/middleware/auth');
const { getHistoryRedis} = require('../helper/redis/history');

route
    .get('/history', authentication, adminAuthorization, getHistoryRedis, getAllHistory)         //admin
    .post('/history',authentication, cashierAuthorization, insertHistory)                        //cashier
    .put('/history/:id', authentication, adminAuthorization, updateHistory)                      //admin
    .patch('/history/:id', authentication, adminAuthorization, updateHistory)                    //admin
    .delete('/history/:id', authentication, adminAuthorization, deleteHistory)                   //admin

module.exports = route