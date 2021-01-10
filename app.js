const express = require('express');
const bodyParser = require('body-parser');
const itemsRoute = require('./src/route/items')
const historyRoute = require('./src/route/history')
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(itemsRoute)
app.use(historyRoute)
app.use(cors())



app.listen(3000, ()=> {
    console.log('Server Working Succesfully')
})
