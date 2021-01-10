const express = require('express');
const route = express.Router();
const { getAllItems, 
        insertItems, 
        updateItems, 
        deleteItems  } = require('../controller/items')

const { getAllCategory,  
        updateCategory, 
        deleteCategory,
        insertCategory  } = require('../controller/category')

route
//product route
  .get('/items', getAllItems)
  .post('/items', insertItems)
  .put('/items/:id', updateItems)
  .delete('/items/:id', deleteItems)
//category route
  .get('/category', getAllCategory)
  .post('/category', insertCategory)
  .put('/category/:id', updateCategory)
  .delete('/category/:id', deleteCategory)

module.exports = route