
const express = require('express');

const { login, 
        register,
        updateUser } = require('../controller/user');

const { authentication } = require('../helper/middleware/auth');

const Router = express.Router()

Router
  .post('/login', login)
  .post('/register', register)
  .patch('/updateuser/:id', authentication, updateUser)

module.exports = Router