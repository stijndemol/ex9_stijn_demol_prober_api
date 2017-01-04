// >$ npm install request --save 
var request = require("request");
var dal = require('./storage.js');

// http://stackoverflow.com/questions/10888610/ignore-invalid-self-signed-ssl-certificate-in-node-js-with-https-request
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


var BASE_URL = "https://web-ims.thomasmore.be/datadistribution/API/2.0";
var Settings = function (url) {
	this.url = BASE_URL + url;
	this.method = "GET";
	this.qs = {format: 'json'};
	this.headers = {
		authorization: "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
	};
};

var Drone = function (id, name, mac) {
	this._id = id;
	this.name = name;
	this.mac = mac;
};

var DroneFile = function (id, date_loaded, date_first_record, date_last_record){
        this._id = id;
        this.dateLoaded = date_loaded;
        this.dateFirstRecord = date_first_record;
        this.dateLastRecord = date_last_record;
};

var dronesSettings = new Settings("/drones?format=json");


dal.clearDrone();


request(dronesSettings, function (error, response, dronesString) {
	var drones = JSON.parse(dronesString);
	console.log(drones);
	console.log("***************************************************************************");
	drones.forEach(function (drone) {
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
		request(droneSettings, function (error, response, droneString) {
			var drone = JSON.parse(droneString);
			dal.insertDrone(new Drone(drone.id, drone.name, drone.mac_address));
//                       console.log(drone);
//                        console.log("***************************************************************************");
//                        var drone_file = JSON.parse(fileString);
//                        
//                        
//                        drone_file.forEach(function (files){
//                            var fileDrone = new Settings ("/files/" + files.id + "&format=json&date_loaded.greaterOrEqual=2016-12-01T00:00:00");
//                            request(fileDrone, function (error, response, fileString){
//                                var files = JSON.parse(fileDrone);
//                                dal.insertFile(new DroneFile(files.id, files.date_loaded, files.date_first_record, files.date_last_record));
//                            });
//                        });
		});
	});
});

var filesSettings = new Settings("/drones&format=json");
dal.clearFile();

request(filesSettings, function (error, response, dronesString){
        
        var drones = JSON.parse(dronesString)
        console.log(files);
        console.log("***************************************************************************");
        console.log(drones);
        console.log("***************************************************************************");
        drones.forEach(function (drone) {
		var droneSettings = new Settings("/drones/" + drone.id + "?format=json");
                var files = JSON.parse(filesString);
                
                files.forEach(function (files) {
		var fileSettings = new droneSettings("/files/" + files.id + "&format=json&date_loaded.greaterOrEqual=2016-12-01T00:00:00");
                
//              var fileSettings = new Settings("/drones/" + drone.id + "/files/" + file.id + "&format=json&date_loaded.greaterOrEqual=2016-12-01T00:00:00");
                request(fileSettings, function (error, response, fileString){
                    var file = JSON.parse(fileString);
                    dal.insertFile(new DroneFile(file.id, file.date_loaded, file.date_first_record, file.date_last_record));
                });
        });
});
});
  
  
console.log("Hello World!");
/*//
//
//            
//            /* Below: Here, I add the url, what kind of method, the datatype in json (of course :) ), and the headers (like that password stuff etc.) to the code */
//            var setup = function(url){
//                this.url = url;
//                this.method = "GET";
//                this.datatype = "json";
//                this.headers = {
//                    "authorization" : "Basic aW1zOno1MTJtVDRKeVgwUExXZw=="
//                };
//            };
//            
//            /* Below: Here, I set the initiate file */
//            var DroneSetup = new setup("https://web-ims.thomasmore.be/datadistribution/API/2.0/drones?format=json");
//            $.ajax(DroneSetup).done(function(drones){
//                
//                drones.forEach(function(drones){ // for every drone that existed here
//                    
//                    var DroneDetailSetup = new setup("https://web-ims.thomasmore.be/datadistribution/API/2.0/drones/"+drones.id+"?format=json"); // I filter the file then on the id of the drone
//                    $.ajax(DroneDetailSetup).done(function(droneDetails){
//                        
//                        var fileSetup = new setup("https://web-ims.thomasmore.be/datadistribution/API/2.0/files?drone_id.is="+droneDetails.id+"&format=json"); // but I want some more, so I added the details...
//                        $.ajax(fileSetup).done(function(files){
//                            
//                            files.forEach(function(files){ // just like every drone (you can read the code on line 33), here I want every file
//                                
//                                var filesDetailSetup = new setup("https://web-ims.thomasmore.be/datadistribution/API/2.0/files/"+files.id+"?format=json");
//                                
//                                $.ajax(filesDetailSetup).done(function(fileDetails){
//                                    // Below: I add the data that I've collected in the table that I've created below at the bottom of this file 
//                                    $("#tabel").append('<tr>' +
//                                            '<td>' + droneDetails.name + '</td>' +
//                                            '<td>' + droneDetails.mac_address + '</td>' +
//                                            '<td>' + files.id + '</td>' +
//                                            '<td>' + fileDetails.date_first_record + '</td>' +
//                                            '<td>' + fileDetails.date_last_record + '</td></tr>');
//                                       
//                                }).fail(function(){ // fail function n° 1
//                                    
//                                });
//                            });
//                        }).fail(function(){
//                            alert('ERROR!!! Revise your code and try again!'); // fail function n° 2
//                        });
//                    }).fail(function(){
//                        alert('ERROR!!! Revise your code and try again!'); // fail function n° 3
//                    });
//                });
//            }).fail(function(){
//                alert('ERROR!!! Revise your code and try again!'); // fail function n° 4
//            });
//            
//            */