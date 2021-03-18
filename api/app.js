const express = require('express');

const app = express();
const propertiesRoutes = require('./routes/properties');
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
app.listen(5000,() => {
    console.log("server started");
})