const express = require('express');
const route = express.Router();
const { getAllHistory,
        insertHistory,
        updateHistory,
        deleteHistory  } = require('../controller/history')

route
//product route
.get('/history', getAllHistory)
.post('/history', insertHistory)
.put('/history/:id', updateHistory)
.delete('/history/:id', deleteHistory)

module.exports = route