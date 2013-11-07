/*
* Root file for our angular app!
* Written by hkh
* NB!!! Remember to change URLINFO if you're using another app than dhis/demo
*/
var surveyApp = angular.module('surveyApp', [
	//'ngRoute'
	'surveyApp.service'
	]);

surveyApp.config(function($routeProvider){
	$routeProvider
	.when('/',
	{
		templateUrl:"views/home.html",
		//controller:'MainController'
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


//RUn this after controller is started

/*surveyApp.controller('DebugController', function($scope, $location){
	//alert($location.absUrl());
	console.log("sup");
});*/