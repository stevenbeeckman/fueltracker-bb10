function registerUser(){
    $("#activityindicator").slideToggle("slow", "swing");
    
    //validate
    var uservalidated = true;
    if($("#username").val() == undefined || $("#username").val() == "") {
	$("#username").addClass("invalid");
	uservalidated = false;
    } else {
	//	localStorage.setObject('username', $('#username').val());
    }

    if($("#password").val() == undefined || $("#password").val() == "") {
	$("#password").addClass("invalid");
	uservalidated = false;
    } else {
	//	localStorage.setObject('password', $('#password').val());
    }

    if($("#email").val() == undefined || $("#email").val() == "") {
	$("#email").addClass("invalid");
	uservalidated = false;
    } else {
	//	localStorage.setObject('email', $('#email').val());
    }

    if(uservalidated) {
	/*	$.ajax({
		timeout: 4000,
		    type: "POST",
		    url: "http://immense-springs-2963.herokuapp.com/user",
		    data: {email: $("#email").val(), password: $("#password").val()},
		    error: function(error) {
		      $("#activityindicator").slideToggle("slow", "swing");
		      $("#error").slideToggle("slow", "swing");
		      console.dir('error');
		      bb.pushScreen("addCar.html", "addCar");
		    },
		    success: function(response) {
		      bb.pushScreen("addCar.html", "addCar");
		    }
		    });*/
	var user = new Object();
	user.username = $("#username").val();
	user.password = $("#password").val();
	user.email = $("#email").val();
	localStorage.setObject('currentUser', user);
	bb.pushScreen("addCar.html", "addCar");
    } else {
	$("#error").slideToggle("slow", "swing");
    }
}

function registerCarBrand(brand, models){
    $("#activityindicator").slideToggle("slow", "swing");
    var user = localStorage.getObject('currentUser');
    user.car = new Object();
    user.car.brand = brand;
    localStorage.setObject('currentUser', user);
    console.dir(localStorage.getObject('currentUser'));
    //localStorage.setObject('brand', brand);
    //localStorage.setObject('car', car);
    bb.pushScreen('addModel.html', 'addModel', {'models': models}); 
}

function registerCarModel(model) {
    $("#activityindicator").slideToggle("slow", "swing");
    //localStorage.setObject('model', model);
    var user = localStorage.getObject('currentUser');
    user.car.model = model;
    localStorage.setObject('currentUser', user);
    console.dir(localStorage.getObject('currentUser'));
    /*
    var car = new Object();
    car = localStorage.getObject('car');
    car.model = model;
    console.log("registerCarModel() - car from localStorage:");
    console.dir(car);
    localStorage.setObject('car', car);    
    */
    bb.pushScreen('addEngine.html', 'addEngine', {'model': model});
}

function registerEngineType(fueltype) {
    $("#activityindicator").slideToggle("slow", "swing");
    var user = localStorage.getObject('currentUser');
    user.car.fueltype = fueltype;
    if(typeof user.cars == "undefined") {
	user.cars = new Array();
    }
    user.cars.push(user.car);
    localStorage.setObject('currentUser', user);
    console.dir(localStorage.getObject('currentUser'));
    /*
    localStorage.setObject('fueltype', fueltype);
    var car = new Object();
    car = localStorage.getObject('car');
    console.log("registerEngineType() - car from localStorage:");
    console.dir(car);
    car.fueltype = fueltype;
    localStorage.setObject('car', car);
    */
    bb.pushScreen('settings.html', 'settings');
    
}

function registerSettings() {
    
	/*
    console.log("registerSettings() - car from localStorage:");
    console.dir(localStorage.getObject('car'));
	*/
    if(localStorage.getObject('registrationFinished') == true) {
	bb.pushScreen('fueltracker.html', 'fueltracker');
    } else {
	localStorage.setObject('registrationFinished', true);
	bb.pushScreen('fueltracker.html', 'fueltracker');
    }
}

function changeUser() {
    bb.pushScreen("changeuser.html", "changeuser");
}

function logout() {
/*
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('email');
    localStorage.removeItem('car');
    localStorage.removeItem('brand');
    localStorage.removeItem('model');
    localStorage.removeItem('fueltype');
*/
    localStorage.removeItem('registrationFinished');
     
    localStorage.removeItem('currentUser');
    bb.pushScreen("firstScreen.html", "firstScreen");
}

function changeCarScreen() {
    bb.pushScreen("changecar.html", "changecar");
}

function changeCar(brand, model, fueltype) {
    var user = localStorage.getObject('currentUser');
    user.car.brand = brand;
    user.car.model = model;
    user.car.fueltype = fueltype;
    localStorage.setObject('currentUser', user);

    bb.pushScreen("fueltracker.html", "fueltracker");
}

function saveConsumption() {
    var consumption = new Object();
    consumption.mileage = $("#mileage").val();
    consumption.volume = $("#volume").val();
    consumption.unitprice = $("#unitprice").val();
    consumption.date = new Date();
    consumption.date = consumption.date.toDateString();
    var currentUser = localStorage.getObject('currentUser');
    console.dir(currentUser);
    console.dir(currentUser.car.consumptions);
    if(typeof currentUser.car.consumptions == "undefined") {
	console.log("currentUser.car.consumptions is undefined.");
	currentUser.car.consumptions = new Array();
    }
    currentUser.car.consumptions.push(consumption);
    localStorage.setObject('currentUser', currentUser);
    bb.pushScreen('stats.html', 'stats');
}