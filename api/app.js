require('dotenv').config();
const express = require('express');
const app = express();
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const propertiesRoutes = require('./routes/properties');
const MONGODB_URI = process.env.MONGODB_URI

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/properties',propertiesRoutes);

moongoose.connect(MONGODB_URI)
.then( result => {
  app.listen(5000,() => {
    console.log("server started");
})
})
.catch(err => {
    console.log(err)
})