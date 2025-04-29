var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import cors = require('cors');

var productRouter = require('./routes/product.route');
var userRouter = require('./routes/user.route');

var app = express();

const db = require("./db/shop.db");

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userRouter);
app.use('/products', productRouter);

module.exports = app;
