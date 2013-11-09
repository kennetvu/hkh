var surveyApp = angular.module('surveyApp.service', []);

/*
* Factory to get urlInfo. Should be injected everytime we need to talk with restful
* REMEMBER TO CHANGE ELSE PART IF USING ANOTHER URLS!!!!
* Returns oppsal if current host is localhost
* Returns right path to oppsal if host is oppsal
* Returns DHIS2/DEMO else. 
* This factory returns without backslash
*/
surveyApp.factory('urlInfo', function($location){
	//console.log("From urlInfo " + $location.absUrl());
	//console.log("host: " + $location.host());
	// Check if host is localhost, if yes, get url from else where.
	//Load from file? 
	if($location.host() == "localhost"){
		return $location.host();
//		return "http://oppsal.dyndns.info:8080/dhis";
}
else{
		//If host is oppsal. remember to add port.
		if($location.host() == "oppsal.dyndns.info"){
			return "http://oppsal.dyndns.info:8080/dhis";
		}// If dhis, just return url info? Remember to change this.
		else{
			return "http://apps.dhis2.org/demo";
		}
	}
	
});
/*Descrive a user.*/
surveyApp.factory('userInfo', function($http, urlInfo){
	var username = 'Not logged in';
	var firstname = '';
	var lastname = '';


	//tmp solution:
	var url = '';
	console.log(urlInfo);
	if(urlInfo == "localhost"){
		url = 'api/me.json';
	}
	else{
		url = urlInfo + '/api/me.json';
	}


/*	url = 'http://apps.dhis2.org/demo/api/me.json';

	var promise = $.ajax({
		url: url,
		dataType: 'json',
		crossDomain: true
	}).success(function(data){
		console.log(data);
	}).error(function(data){
		console.log("fail yo");
	});*/
var promise = $http.get(url)
.success(function(data){
	console.log(data);
	username = data.userCredentials.username;
	firstname = data.firstName;
	lastname = data.surname;


})
.error(function(response, status){
	console.log(response + status);
	console.log("it dosnt work with jsonp.");
});
return {
	promise:promise,
	getUsername: function(){return username;},
	setUsername: function(name){
		username = name;
	},

	getFirstname: function(){return firstname;},
	setFirstname: function(name){
		firstname = name;
	},
	getLastname: function(){return lastname;},
	setLastname: function(name){
		lastname = name;
	}
};
});

/*Programs*/
surveyApp.factory('programsInfo', function($http, urlInfo){
	var url = '';

	if(urlInfo == "localhost"){
		url = 'api/programs.json';
	}
	else{
		url = urlInfo + '/api/programs.json';
	}
	var data;
	console.log(url);
	var promise = $http.get(url)
	.success(function(response){
		console.log(response.programs);
		data = response;
	})
	.error(function(response, status){
		console.log(response + status);
		console.log("it dosnt work with jsonp.");
	});
	/*Parse data or return data? */
	return {
		promise: promise,
		data: function(){return data;}
	}
});
/*Single events*/
