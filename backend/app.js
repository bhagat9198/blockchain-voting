require('dotenv').config()
const path = require('path');
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger('project.log');
const cookieParser = require("cookie-parser");

const authRoutes = require('./routes/auth');
const commonRoutes = require('./routes/common');
const privligedCommonRoutes = require('./routes/privligedCommon');
const errorController = require('./controller/error');

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(express.static('files')); 
// app.use('/images', express.static('images'));

app.use('/auth', authRoutes);
app.use(commonRoutes);
app.use(privligedCommonRoutes);
// app.use('/', authRoutes);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 7000;

mongoose.connect(MONGODB_URI).then(async () => {
  return app.listen(PORT)
}).then(() => {
  console.log('Connected at PORT :: ', PORT);
}).catch(error => {
  console.log(error);
  log.error('Error in connection.  ::', error.message);
})





