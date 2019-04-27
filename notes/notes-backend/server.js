const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Connect to DB
mongoose
  .connect(process.env.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/auth', require('./routes/users'));

// Start server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on port ${port}`);
