const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const itemsRoute = require('./src/route/items');
const historyRoute = require('./src/route/history');
const categoryRoute = require('./src/route/category');
const userRoute = require('./src/route/user');



const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(itemsRoute);
app.use(historyRoute);
app.use(categoryRoute);
app.use(userRoute);
require('dotenv').config();

app.use('/image', express.static('./public/images'))


app.listen(process.env.PORT, ()=> {
    console.log('Server Working Succesfully')
})
