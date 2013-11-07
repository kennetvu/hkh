var surveyApp = angular.module('surveyApp', [
	//'ngRoute'
	]);

surveyApp.config(function($routeProvider){
	$routeProvider
	.when('/',
	{
		templateUrl:"view/home.html"
	})

	.when('/home',{
		templateUrl: 'view/home.html'
	})
	.when('/form',{
		templateUrl: 'view/form.html'
	})
	.when('/entry',{
		templateUrl: 'view/entry.html'
	})
	.when('/survey',{
		templateUrl: 'view/survey.html'
	})
	.otherwise({
		rederictTo: '/home'
	});

	}//Function, routeProvider
	);

surveyApp.factory('userInfo', function(){
	var username = '';
	var firstname = '';
	var lastname = '';
	var loggedIn = false;
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
		},

		getLoggedIn: function(){return loggedIn;},
		setLoggedIn: function(status){loggedIn = status;}
	};
});

//RUn this after controller is started
surveyApp.controller('MainController', function($scope, $http, userInfo){
	//var url = "http://apps.dhis2.org/demo/api/me.json";
	var url = "http://oppsal.dyndns.info:8080/dhis/api/me.json";
	$.getJSON( url, function( data ) {
	//	console.log(data.userCredentials.username);
		userInfo.setUsername(data.userCredentials.username);
		userInfo.setFirstname(data.firstName);
		userInfo.setLastname(data.surname);
		userInfo.setLoggedIn(true);
		//console.log(userInfo.getLoggedIn())
	}).fail(function(jqxhr, textStatus, error){
		console.log("fail");
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});
	$http.get('http://oppsal.dyndns.info:8080/dhis/api/me').then(function(response){
		//console.log(response);
	});
	console.log("after query");	
	


});
surveyApp.controller('DebugController', function($scope, $location){
	//alert($location.absUrl());
	console.log("sup");
});