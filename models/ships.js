const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define Schemas for the 3 different Spacecraft types
const LaunchVehicleSchema = new Schema ({
    name: String, 
    mass: Number, 
    height: Number, 
    thrust: Number, 
    capacity: Number
})
const RoboticSpacecraftSchema = new Schema ({
    name: String, 
    thrust: Number, 
    destination: String
})
const CrewedSpacecraftSchema = new Schema ({
    name: String, 
    mass: Number, 
    orbit: Number, 
    crewMembers: Number
})

//Define a method that outputs each spacecraft's attributes
LaunchVehicleSchema.methods.reportSelf = function () {
    return `The ship ${this.name} has a mass of ${this.mass} tons and a height of ${this.height} mts., with a thrust power of ${(this.thrust/101.9716005).toFixed(2)} kN and a capacity of ${this.capacity} kg.`
}
RoboticSpacecraftSchema.methods.reportSelf = function () {
    return `The ship ${this.name} has a thrust power of ${(this.thrust/101.9716005).toFixed(2)} kN and is heading to ${this.destination}.`
}
CrewedSpacecraftSchema.methods.reportSelf = function () {
    return `The ship ${this.name} has a mass of ${this.mass} tons and orbits at a distance of ${this.orbit} km. It is prepared to host ${this.crewMembers} crew members`
}

//Create models, export
const LaunchVehicle = mongoose.model("LaunchVehicle", LaunchVehicleSchema)
const RoboticSpacecraft = mongoose.model("RoboticSpacecraft", RoboticSpacecraftSchema)
const CrewedSpacecraft = mongoose.model("CrewedSpacecraft", CrewedSpacecraftSchema)

module.exports = { 
    CrewedSpacecraft: CrewedSpacecraft, 
    LaunchVehicle: LaunchVehicle, 
    RoboticSpacecraft: RoboticSpacecraft
};