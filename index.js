// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const HomeRouter = require('./routers/HomeRouter');
// const DB = process.env.DATABASE;

const port = process.env.PORT || 8080;

const app = express();

const DB = 'mongodb+srv://aayushm017:Scts9693@cluster1.szzkw0i.mongodb.net/mernWebsite?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connection Successful');
}).catch((err) => console.log('No connection'));

app.set('view engine', 'ejs');

app.use(express.static('public'));   //use this code link css from ejs/html file..

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', HomeRouter);

app.listen(port);

