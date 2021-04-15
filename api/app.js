require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const moongoose = require('mongoose');
const bodyParser = require('body-parser');
const propertiesRoutes = require('./routes/properties');
const authRoutes = require('./routes/auth');
const MONGODB_URI = process.env.MONGODB_URI

app.use(bodyParser.json({ limit: "50mb" }))
app.use('/images/properties',express.static(path.join(__dirname,'images/properties')));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use('/auth',authRoutes);
app.use('/properties',propertiesRoutes);
app.use((error,req,res,next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message || 'Server Error';
  const data = error.data;
  res.status(status).json({ message : message,data : data});  
})

moongoose.connect(MONGODB_URI)
.then( result => {
  app.listen(5000,() => {
    console.log("server started");
})
})
.catch(err => {
    console.log(err)
})