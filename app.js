const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const enrollRoute = require('./routes/enroll');
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});


app.get('/', (req, res) => {
    res.redirect('/enroll');
});

app.use('/enroll', enrollRoute);



app.listen(PORT, () => {
    console.log(`app running on Port ${PORT}`);
})

// 2023-12-17T17:10:01.593+00:00