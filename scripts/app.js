/*
* Root file for our angular app!
* Written by hkh
* NB!!! Remember to change URLINFO if you're using another app than dhis/demo
*/

var surveyApp = angular.module('surveyApp', [
	//'ngRoute'
	]);

surveyApp.config(function($routeProvider){
	$routeProvider
	.when('/',
	{
		templateUrl:"views/home.html"
	})

	.when('/home',{
		templateUrl: 'views/home.html'
	})
	.when('/form',{
		templateUrl: 'views/form.html'
	})
	.when('/entry',{
		templateUrl: 'views/entry.html'
	})
	.when('/survey',{
		templateUrl: 'views/survey.html'
	})
	.otherwise({
		rederictTo: '/home'
	});

	}//Function, routeProvider
	);

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
		url = 'data/me.json';
	}
	else{
		url = urlInfo + '/api/me.json';
	}
	$http.get(url)
	.success(function(data){
		//console.log(data);
		username = data.userCredentials.username;
		firstname = data.firstName;
		lastname = data.surname;


	})
	.error(function(response, status){
		console.log(response + status);
	});
	return {
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

//RUn this after controller is started
surveyApp.controller('MainController', function($scope, $http, userInfo, urlInfo){
	

});
surveyApp.controller('DebugController', function($scope, $location){
	//alert($location.absUrl());
	console.log("sup");
});