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
    localStorage.setItem('brand', brand);
    bb.pushScreen('addModel.html', 'addModel', {'brand': brand}); 
}

function registerCarModel(model) {
    $("#activityindicator").slideToggle("slow", "swing");
    localStorage.setItem('model', model);
    bb.pushScreen('addEngine.html', 'addEngine', {'model': model});
}

function registerEngineType(fueltype) {
    $("#activityindicator").slideToggle("slow", "swing");
    localStorage.setItem('fueltype', fueltype);
    bb.pushScreen('settings.html', 'settings');
}

function registerSettings() {
    console.dir(localStorage.getItem('car'));

    if(localStorage.getItem('registrationFinished') == true) {
	bb.pushScreen('fueltracker.html', 'fueltracker');
    } else {
	localStorage.setItem('registrationFinished', true);
	bb.pushScreen('fueltracker.html', 'fueltracker');
    }
}
