function registerUser(){
    $("#activityindicator").slideToggle("slow", "swing");
    
    //validate
    var uservalidated = true;
    if($("#username").val() == undefined || $("#username").val() == "") {
	$("#username").addClass("invalid");
	uservalidated = false;
    } else {
	localStorage.setItem('username', $('#username').val());
    }

    if($("#password").val() == undefined || $("#password").val() == "") {
	$("#password").addClass("invalid");
	uservalidated = false;
    } else {
	localStorage.setItem('password', $('#password').val());
    }

    if($("#email").val() == undefined || $("#email").val() == "") {
	$("#email").addClass("invalid");
	uservalidated = false;
    } else {
	localStorage.setItem('email', $('#email').val());
    }

    if(uservalidated) {
	$.ajax({
		timeout: 16000,
		    type: "POST",
		    url: "http://immense-springs-2963.herokuapp.com/user",
		    data: {email: $("#email").val(), password: $("#password").val()},
		    error: function(error) {
		      $("#activityindicator").slideToggle("slow", "swing");
		      $("#error").slideToggle("slow", "swing");
		    },
		    success: function(response) {
		      bb.pushScreen("addCar.html", "addCar");
		    }
	    });
    } else {
	$("#activityindicator").slideToggle("slow", "swing");
    }
}

function registerCarBrand(brand){
    $("#activityindicator").slideToggle("slow", "swing");
    var car = new Object();
    car.brand = brand;
    localStorage.setItem('brand', brand);
    localStorage.setItem('car', car);
    bb.pushScreen('addModel.html', 'addModel', {'brand': brand}); 
}

function registerCarModel(model) {
    $("#activityindicator").slideToggle("slow", "swing");
    localStorage.setItem('model', model);
    var car = new Object();
    car = localStorage.getItem('car');
    car.model = model;
    console.log("registerCarModel() - car from localStorage:");
    console.dir(car);
    localStorage.setItem('car', car);    
    bb.pushScreen('addEngine.html', 'addEngine', {'model': model});
}

function registerEngineType(fueltype) {
    $("#activityindicator").slideToggle("slow", "swing");
    localStorage.setItem('fueltype', fueltype);
    var car = new Object();
    car = localStorage.getItem('car');
    console.log("registerEngineType() - car from localStorage:");
    console.dir(car);
    car.fueltype = fueltype;
    localStorage.setItem('car', car);
    bb.pushScreen('settings.html', 'settings');
    
}

function registerSettings() {
    console.log("registerSettings() - car from localStorage:");
    console.dir(localStorage.getItem('car'));

    if(localStorage.getItem('registrationFinished') == true) {
	bb.pushScreen('fueltracker.html', 'fueltracker');
    } else {
	localStorage.setItem('registrationFinished', true);
	bb.pushScreen('fueltracker.html', 'fueltracker');
    }
}
