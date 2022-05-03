require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const voterRoutes = require('./routes/voter');
const electionPartyRoutes = require('./routes/electionParty');
const errorController = require('./controller/error');

app.use(express.json())
const app = express()
app.use(cors())

app.use('/auth', authRoutes);
app.use('/admin', authRoutes);
app.use('/voter', authRoutes);
app.use('/election-party', authRoutes);
app.use('/', authRoutes);

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI).then(async() => {
  return app.listen(PORT)
}).then(() => {
  console.log();
})





