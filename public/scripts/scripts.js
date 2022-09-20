function showFilters () { // listener on button to display filter menu
    $(".search-form").toggleClass("active")
}

$('.ship-type-selector').on('change',function(){ //Switch form displayed depending on selected Spacecraft type
    let type = $(this).val();
    switch(type){
        case "1":
        $(".launchVehicleInputsForm").toggleClass("active")
        $(".roboticSpacecraftInputsForm").removeClass("active")
        $(".crewedSpacecraftInputsForm").removeClass("active")  
        break;
        case "2":
        $(".launchVehicleInputsForm").removeClass("active")
        $(".roboticSpacecraftInputsForm").toggleClass("active")
        $(".crewedSpacecraftInputsForm").removeClass("active")  

        break;
        case "3":
        $(".launchVehicleInputsForm").removeClass("active")
        $(".roboticSpacecraftInputsForm").removeClass("active")
        $(".crewedSpacecraftInputsForm").toggleClass("active")  
        break;
        case "None specified":
        $(".launchVehicleInputsForm").removeClass("active")
        $(".roboticSpacecraftInputsForm").removeClass("active")
        $(".crewedSpacecraftInputsForm").removeClass("active")  
    }
});

//Filter functionality
let filterObject = { //Define filter object to compare ships with
    type: "",
    name: "", 
    mass: "",
    minMass: "", 
    maxMass: "", 
    height: "", 
    minHeight: "", 
    maxHeight: "", 
    thrust: "", 
    minThrust: "", 
    maxThrust: "", 
    capacity: "",
    minCapacity: "",
    maxCapacity: "",
    destination: "",
    orbit: "", 
    minOrbit: "", 
    maxOrbit: "", 
    crewMembers: "",
    minCrewMembers: "",
    maxCrewMembers: ""
};

function clearFilters (obj) {
    Object.keys(obj).forEach(x=>{
        obj[x] = ""
    })
}
function clearKeepingName () {
    nameToKeep = filterObject.name
    clearFilters(filterObject);
    filterObject.name = nameToKeep;
}

$('.search-type').on('change',function(){ //Type filter
    $(`.ship-card`).css( "display", "none" );
    
    clearKeepingName();
    if(this.value==1){
        filterObject.type = 'Launch Vehicle';
    } else if (this.value == 2){
        filterObject.type = 'Robotic Spacecraft';
    } else if (this.value == 3){
        filterObject.type = 'Crewed Spacecraft';
    } 
    
    console.log(filterObject);

    if(filterObject.type == "" && filterObject.name == ""){
        $(`.ship-card`).css( "display", "flex" );
    } else if (filterObject.type  && filterObject.name){
        $(`.ship-card[data-type*="${filterObject.type}"].ship-card[data-name*="${filterObject.name}"] `).css( "display", "flex" );
    } else if (filterObject.type == "" && filterObject.name != ""){
        $(`.ship-card[data-name*="${filterObject.name}"]`).css( "display", "flex" );
    } else if (filterObject.type != "" && filterObject.name == ""){
        $(`.ship-card[data-type*="${filterObject.type}"]`).css( "display", "flex" );
    }
})

$('.search-input').on('change keyup',function(){
    $(`.ship-card`).css( "display", "none" ); // Hide all
    let value = this.value;
    let category = `${this.name}`;
    filterObject[category] = value;

    if(value==="" || value ===0){
        if(filterObject.type){
            $(`.ship-card[data-type*="${filterObject.type}"]`).css( "display", "flex" );
        } else {
            return $(`.ship-card`).css( "display", "flex" ); // Show all
        }
    }

    (filterObject.minMass=="")?filterObject.minMass=0:"";
    (filterObject.maxMass=="")?filterObject.maxMass=2**52:"";
    (filterObject.minHeight=="")?filterObject.minHeight=0:"";
    (filterObject.maxHeight=="")?filterObject.maxHeight=2**52:"";
    (filterObject.minThrust=="")?filterObject.minThrust=0:"";
    (filterObject.maxThrust=="")?filterObject.maxThrust=2**52:"";
    (filterObject.minCapacity=="")?filterObject.minCapacity=0:"";
    (filterObject.maxCapacity=="")?filterObject.maxCapacity=2**52:"";
    (filterObject.minOrbit=="")?filterObject.minOrbit=0:"";
    (filterObject.maxOrbit=="")?filterObject.maxOrbit=2**52:"";
    (filterObject.minCrewMembers=="")?filterObject.minCrewMembers=0:"";
    (filterObject.maxCrewMembers=="")?filterObject.maxCrewMembers=2**52:"";
    
    
    $(`.ship-card`).filter(function(index, element){
        switch(filterObject.type){
            case "Launch Vehicle":
                return (
                   element.dataset.type.toLowerCase().includes(filterObject.type.toLowerCase()) 
                && element.dataset.name.toLowerCase().includes(filterObject.name.toLowerCase()) 
                && parseInt(element.dataset.mass)>parseInt(filterObject.minMass) 
                && parseInt(element.dataset.mass)<parseInt(filterObject.maxMass) 
                && parseInt(element.dataset.height)>parseInt(filterObject.minHeight) 
                && parseInt(element.dataset.height)<parseInt(filterObject.maxHeight) 
                && parseInt(element.dataset.thrust)>parseInt(filterObject.minThrust) 
                && parseInt(element.dataset.thrust)<parseInt(filterObject.maxThrust) 
                && parseInt(element.dataset.capacity)>parseInt(filterObject.minCapacity) 
                && parseInt(element.dataset.capacity)<parseInt(filterObject.maxCapacity) 
                );
            case "Robotic Spacecraft":
                return (
                   element.dataset.type.toLowerCase().includes(filterObject.type.toLowerCase()) 
                && element.dataset.name.toLowerCase().includes(filterObject.name.toLowerCase()) 
                && element.dataset.destination.toLowerCase().includes(filterObject.destination.toLowerCase()) 
                && parseInt(element.dataset.thrust)>parseInt(filterObject.minThrust) 
                && parseInt(element.dataset.thrust)<parseInt(filterObject.maxThrust) 
                );
            case "Crewed Spacecraft":
                console.log(element.dataset)
                console.log(filterObject.minCrewMembers)
                console.log(filterObject.maxCrewMembers)
                return (
                   element.dataset.type.toLowerCase().includes(filterObject.type.toLowerCase()) 
                && element.dataset.name.toLowerCase().includes(filterObject.name.toLowerCase()) 
                && parseInt(element.dataset.mass)>parseInt(filterObject.minMass) 
                && parseInt(element.dataset.mass)<parseInt(filterObject.maxMass) 
                && parseInt(element.dataset.orbit)>parseInt(filterObject.minOrbit) 
                && parseInt(element.dataset.orbit)<parseInt(filterObject.maxOrbit) 
                && parseInt(element.dataset.crewmembers)>parseInt(filterObject.minCrewMembers) 
                && parseInt(element.dataset.crewmembers)<parseInt(filterObject.maxCrewMembers) 
                );
            case "":
                return (
                    element.dataset.type.toLowerCase().includes(filterObject.type.toLowerCase()) 
                 && element.dataset.name.toLowerCase().includes(filterObject.name.toLowerCase()) 
                )
        }
    }).css( "display", "flex" );    
})