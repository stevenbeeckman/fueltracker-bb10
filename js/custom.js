Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

var carBrands = new Array();
carBrands = {brands: [{name: "Audi", models: {models: [{name: "A1"}, {name: "A3"}, {name: "A5"}, {name: "Q7"}]}}
		       , {name: "BMW", models: {models: [{name: "Z4"}, {name: "X3"}, {name: "X5"}, {name: "X6"}]}}
			  , {name: "Mercedes", models: {models: [{name: "SLS-AMG"}, {name: "ML"}, {name: "GL"}]}}
	    ]};

function createBrandItem(brand) {
    console.log("createBrandItem() for:");
    console.dir(brand);
    var item = document.createElement('div');
    item.setAttribute('data-bb-type', 'item');
    console.log("These are the brand's models: " + brand.models);
    item.setAttribute('onclick', "registerCarBrand('" + brand.name + "', " + JSON.stringify(brand.models.models) + ");");
    item.setAttribute('data-bb-title', brand.name);
    console.log("createBrandItem() generated this:");
    console.dir(item);
    return item;
}

function appendCarBrandItems(brands) {
    console.log("appendCarBrandItems(), these are the brands:");
    console.dir(brands);
    var list = document.getElementById("carbrandslist");
    var item;

    for(var i = 0; i < brands.length; i++) {
	item = createBrandItem(brands[i]);
	list.appendItem(item);
    }
}

function createModelItem(model) {
    var item = document.createElement('div');
    console.dir(model);
    item.setAttribute('data-bb-type', 'item');
    item.setAttribute('onclick', "registerCarModel('" + model.name + "')");
    item.setAttribute('data-bb-title', model.name);
    return item;
}

function appendBrandModels(models) {
    var list = document.getElementById('modelslist');
    var item;
    console.log("models:");
    console.dir(models);
    for(var i = 0; i < models.length; i++) {
	item = createModelItem(models[i]);
	list.appendItem(item);
    }
}

function createCarItem(car) {
    var item = document.createElement('div');
    console.dir(car);
    item.setAttribute('data-bb-type', 'item');
    item.setAttribute('onclick', "changeCar('" 
		      + car.brand + "', '" 
		      + car.model + "', '"
		      + car.fueltype + "');");
    item.setAttribute('data-bb-title', car.brand);
    item.innerHTML = car.model + " (" + car.fueltype + ")";
    return item;
}

function appendCars() {
    var cars = localStorage.getObject('currentUser').cars;
    var item;
    var list = document.getElementById("usercarslist");

    console.log("cars of this user:");
    console.dir(cars);
    
    for(var i = 0; i < cars.length; i++) {
	item = createCarItem(cars[i]);
	list.appendItem(item);
    }
}

function addStatsRows() {
    var consumptions = localStorage.getObject('currentUser').car.consumptions;
    var row
	, cell;
    var t = document.getElementById('userstats');
    
    console.log("consumptions of the current car:");
    console.dir(consumptions);

    for(var i = consumptions.length-1; i >= 0; i--) {
	row = t.insertRow(t.rows.length);
	row.insertCell(0).innerHTML = consumptions[i].date;
	row.insertCell(1).innerHTML = consumptions[i].mileage;
	row.insertCell(2).innerHTML = consumptions[i].volume;
	row.insertCell(3).innerHTML = consumptions[i].unitprice;
    }
}

document.addEventListener('webworksready', function(e) {
	bb.init({actionBarDark: true, controlsDark: true, listsDark: true, highlightColor: '#00A8DF', bb10ForPlayBook: true,
		    ondomready: function(element, id, params) {
		    if(id == "firstScreen") {	
			console.log('registrationFinished:');
			console.dir(localStorage.getItem('registrationFinished'));
			if(localStorage.getItem('registrationFinished')) {
			    console.log('showing fueltracker');
			    bb.pushScreen('fueltracker.html', 'fueltracker');
			}
		    }
		    
		    if(id == "fueltracker") {
			document.getElementById("usernamebutton").setCaption(localStorage.getObject('currentUser').username);
			console.dir(localStorage.getObject('currentUser'));
			document.getElementById("carbutton").setCaption(localStorage.getObject('currentUser').car.brand + " " + localStorage.getObject('currentUser').car.model);
		    }

		    if(id == "addCar") {
			console.log("Trying to add something to addCar.");
			appendCarBrandItems(carBrands.brands);
		    }
		    if(id == "addModel") {
			console.dir(params);
			appendBrandModels(params['models']);
		    }
		    if(id == "changecar") {
			appendCars();
		    }
		    if(id == "stats") {
			document.getElementById("usernamebutton").setCaption(localStorage.getObject('currentUser').username);
			console.dir(localStorage.getObject('currentUser'));
			document.getElementById("carbutton").setCaption(localStorage.getObject('currentUser').car.brand + " " + localStorage.getObject('currentUser').car.model);
			addStatsRows();
		    }
		}});
	// Open our first screen
	bb.pushScreen('firstScreen.html', 'firstScreen');
    }, false);
