const express = require('express');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const path = require('path');
const config = require('config');

const app = express();

// bodyParser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then( () => console.log("MongoDB Connected"))
.catch( err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);

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