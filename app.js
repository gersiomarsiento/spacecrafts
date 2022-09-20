//Initial requirements
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require("ejs-mate");
const mongoose = require('mongoose');


// DB setup
const dbUrl = 'mongodb://localhost:27017/spaceships'
mongoose.connect(dbUrl)

const db = mongoose.connection; //Connect to Database, log if error 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('Database Connected');
})

app.engine('ejs', ejsMate) //EJS-Mate to use layout boilerplates
app.set('view engine', 'ejs'); //Set up paths and views
app.set('views', path.join(__dirname, 'views'));// Define 'views' folder
app.use(express.urlencoded({ extended:true })); //urlencoded extended true to enable calling req.body and parsing it
app.use(express.static(path.join(__dirname, 'public'))); //Define PUBLIC folder 

const shipsRoutes = require('./routes/ships'); // Implement routes
app.use('/', shipsRoutes); //Import Routes to render

//Set server
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`Serving on port ${port}`)
});
