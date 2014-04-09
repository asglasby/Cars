var myApp = {};
myApp.url = "https://carsalex.firebaseio.com/.json";
myApp.makeCar = function () {
    var color = document.getElementById("color").value;
    var make = document.getElementById("make").value;
    myApp.post(new myApp.Car(color, make));
    document.getElementById("color").value = "";
    document.getElementById("make").value = "";
    myApp.writeTable();
}
myApp.Car = function (color, make) {
    this.color = color;
    this.make = make;
}
myApp.Cars = [{ color: "Red", make: "Ford" },
    new myApp.Car("Yellow", "Tesla")];

myApp.writeTable = function () {
    var holder = "<table class='table table-striped'>";
    for (var car in myApp.Cars) {
        holder += "<tr>";
        holder += "<td>" + myApp.Cars[car].make + "</td>";
        holder += "<td>" + myApp.Cars[car].color + "</td>";
        holder += "<td>" +
            "<span class='btn btn-danger glyphicon glyphicon-trash'" +
            "onclick='myApp.deleteCar(" + car + ")'></span>"
            + "</td>";
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("CarTable").innerHTML = holder;
};
myApp.deleteCar = function (index) {
    myApp.Cars.splice(index, 1);
    myApp.writeTable();
}
myApp.sortCars = function (sortBy, desc) {
    myApp.Cars.sort(function (a, b) {
        if (a[sortBy].toLowerCase() > b[sortBy].toLowerCase())
            return 1;
        if (a[sortBy].toLowerCase() < b[sortBy].toLowerCase())
            return -1;
        // a must be equal to b
        return 0;
    });
    if (desc) {
        myApp.Cars.reverse();
    }
    myApp.writeTable();
}
myApp.post = function (car) {
    var request = new XMLHttpRequest();
    request.open("Post", myApp.url, true);
    request.onload = function () {
        myApp.get();
        console.log(this.response);
    }; // request.onerror = function () { };
    request.send(JSON.stringify(car));
};
myApp.get = function () {
    var request = new XMLHttpRequest();
    request.open("Get", myApp.url, true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            myApp.Cars = [];
            for (var x in data) {
                myApp.Cars.push(data[x]);
            }
            myApp.writeTable();
        }
        else { console.log("ERRRRR:" + this.response) }
    };
    request.onerror = function () {
        console.log("There was a communication error");
    };
    request.send();
};
myApp.get();
//alert("CarsJS Loaded");