const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const noteRoutes = require('./api/routes/notes');
const userRoutes = require('./api/routes/users');

const app = express();

// Import local env variables if not in prod mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(`${process.env.mongoURI}`, { useNewUrlParser: true });

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Setup
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    req.header('Access-Control-Allow-Headers', 'GET, POST, PATCH, DELETE');
    res.status(200).json({});
  }
  next();
});

app.use('/notes', noteRoutes);
app.use('/auth', userRoutes);

// Handle Invalid URLS
app.use((req, res, next) => {
  const error = new Error('Invalid URL');
  error.status = 404;
  next(error);
});

// Capture all un-caught errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening on port : ${port}`);
console.log(`MongoDB Connected`);
