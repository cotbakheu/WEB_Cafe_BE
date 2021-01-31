const express = require('express');
const route = express.Router();
const { getAllCategory,  
        updateCategory, 
        deleteCategory,
        insertCategory  } = require('../controller/category');

route
    .get('/category', getAllCategory)
    .post('/category', insertCategory)
    .put('/category/:id', updateCategory)
    .patch('/category/:id', updateCategory)
    .delete('/category/:id', deleteCategory)

module.exports = route;