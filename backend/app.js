require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose');
const log = require('simple-node-logger').createSimpleLogger('project.log');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');
const electionPartyRoutes = require('./routes/electionParty');
const errorController = require('./controller/error');

const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', authRoutes);
app.use("/admin", adminRoutes);
app.use("/voter", voterRoutes);
app.use("/election-party", electionPartyRoutes);
// app.use('/', authRoutes);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI).then(async () => {
  return app.listen(PORT)
}).then(() => {
  console.log('Connected at PORT :: ', PORT);
}).catch(error => {
  console.log(error);
  log.error('Error in connection.  ::', error.message);
})





