Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function(key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
};

var carBrands = new Array();
carBrands = {brands: [{name: "Audi", models: [{name: "A1"}, {name: "A3"}, {name: "A5"}, {name: "Q7"}]}
	    , {name: "BMW", models: [{name: "Z4"}, {name: "X3"}, {name: "X5"}, {name: "X6"}]}
	    , {name: "Mercedes", models: [{name: "SLS-AMG"}, {name: "ML"}, {name: "GL"}]}
	    ]};

function createBrandItem(brand) {
    var item = document.createElement('div');
    item.setAttribute('data-bb-type', 'item');
    item.setAttribute('onclick', "registerCarBrand('" + brand + "');");
    item.setAttribute('data-bb-title', brand);
    return item;
}

function appendCarBrandItems(brands) {
    var list = document.getElementById("carbrandslist");
    var item;
    for(var i = 0; i < brands.length; i++) {
	item = createBrandItem(brands[i]);
	list.appendItem(item);
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
			console.dir(localStorage.getObject('car'));
			document.getElementById("carbutton").setCaption(localStorage.getObject('car').car.brand + " " + localStorage.getObject('car').car.model);
		    }
		    if(id == "addCar") {
			console.log("Trying to add something to addCar.");
			appendCarBrandItems(brands);
		    }
		    
		}});
	// Open our first screen
	bb.pushScreen('firstScreen.html', 'firstScreen');
    }, false);
