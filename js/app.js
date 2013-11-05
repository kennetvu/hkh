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
	}).
	otherwise({
		rederictTo: '/home'
	});

	}//Function, routeProvider
	);

surveyApp.controller('DebugController', function($scope, $location){
	//alert($location.absUrl());
	console.log("sup");
});