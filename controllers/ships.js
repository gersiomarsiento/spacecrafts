//Import spacecrafts models
const Ships = require('../models/ships');

//Define and export controller methods
module.exports.showIndex = async (req, res, next) => { //Get ships from DB, render index view
    const launchVehicles = await Ships.LaunchVehicle.find({});
    const roboticSpacecrafts = await Ships.RoboticSpacecraft.find({});
    const crewedSpacecrafts = await Ships.CrewedSpacecraft.find({});
    res.render('index', {launchVehicles, roboticSpacecrafts, crewedSpacecrafts})
}

module.exports.addSpacecraft = async (req, res, next)=>{ //Render view to add ships 
    res.render("add")
}

module.exports.postSpacecraft = async (req, res, next)=>{ //Post new ship
    if(req.body.type==="LaunchVehicle"){
        let ship = await new Ships.LaunchVehicle(req.body.ship);
        await ship.save();
        res.redirect('/index');
    } else if (req.body.type==="RoboticSpacecraft"){
        const ship = new Ships.RoboticSpacecraft(req.body.ship);
        await ship.save();
        res.redirect('/index');
    } else if (req.body.type==="CrewedSpacecraft"){
        const ship = new Ships.CrewedSpacecraft(req.body.ship);
        await ship.save();
        res.redirect('/index');
    }
}
