const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/user');
const gifRoutes = require('./Routes/gifs')
const articleRoutes = require('./Routes/articles');
const feedRoute = require('./Routes/feed');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/gifs', gifRoutes);
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/feeds', feedRoute);



module.exports = app;