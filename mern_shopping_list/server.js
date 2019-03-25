const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/items');
const path = require('path');

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db)
.then( () => console.log("MongoDB Connected"))
.catch( err => console.log(err));

// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('client/build'));
    app.get('*', ( req, resp) => {
        resp.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Variable for port in use
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port port: ${port}`));