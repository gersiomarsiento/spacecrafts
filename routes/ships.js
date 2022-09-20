const express = require('express');
const router = express.Router();
const ships = require('../controllers/ships'); //Import controller methods
const catchAsyncError = require('../utils/catchAsyncError');


//Define routes
router.get('/index', catchAsyncError(ships.showIndex)); //Show full spaceship list
router.get('/add', ships.addSpacecraft); //Show add spaceship page
router.post('/add', catchAsyncError(ships.postSpacecraft)); //Add new spaceship
router.all('*', (req, res)=>{ // Define not found error
    res.render('./error')
})

module.exports = router;