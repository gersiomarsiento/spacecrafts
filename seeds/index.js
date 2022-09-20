const mongoose = require('mongoose');
const Ships = require('../models/ships');

//Connect to mongoose
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/spaceships';
mongoose.connect(dbUrl)

//Connect to Database, log if error 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('Database Connected!');
})

//Define seeds - empty DB and add 3 ships for each of the 3 ship types
const seedDB = async () => {
await Ships.LaunchVehicle.deleteMany({});
await Ships.RoboticSpacecraft.deleteMany({});
await Ships.CrewedSpacecraft.deleteMany({});
const saturnV = new Ships.LaunchVehicle({name:"Saturn V", mass: 2900, height: 110, thrust: 3500, capacity: 118});
await saturnV.save()
const energia = new Ships.LaunchVehicle({name:"Energia", mass: 2400, height: 60, thrust: 3060, capacity: 100});
await energia.save()
const deltaIV = new Ships.LaunchVehicle({name:"Delta IV", mass: 733, height: 72, thrust: 350, capacity: 21});
await deltaIV.save()
const cassiniHuygens = new Ships.RoboticSpacecraft({name:"Cassini-Huygens", thrust: 45.39, destination: "Saturn"});
await cassiniHuygens.save()
const pioneerXI = new Ships.RoboticSpacecraft({name:"Pioneer XI", thrust: 26, destination: "Jupiter"});
await pioneerXI.save()
const marinerIV = new Ships.RoboticSpacecraft({name:"Mariner IV", thrust: 22.44, destination: "Mars"});
await marinerIV.save()
const skylab = new Ships.CrewedSpacecraft({name:"Skylab", mass: 77, orbit: 435, crewMembers: 3});
await skylab.save()
const salyut = new Ships.CrewedSpacecraft({name:"Salyut", mass: 19.8, orbit: 248.9, crewMembers: 3});
await salyut.save()
const eei = new Ships.CrewedSpacecraft({name:"EEI", mass: 420, orbit: 386, crewMembers: 7});
await eei.save()
}

//Run the seed function, then close after done
seedDB().then(()=>{
    console.log('Database Seeded!');
    mongoose.connection.close()
});