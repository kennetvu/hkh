//	'use strict';

angular.module('surveyApp', [
	'ngRoute',
	'ngResource',
	'surveyApp.controllers',
	'surveyApp.services'
	])
.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'views/home.html',
		controller: 'UserinfoController'
	});
	$routeProvider.when('/programs',{
		templateUrl: 'views/programs.html',
		controller:'ProgramController'
	});
	$routeProvider.when('/programs/:id', {
		templateUrl:'views/programs/program-detail.html',
		controller: 'ProgramDetailController'
	});
	$routeProvider.when('/entry',{
		templateUrl: 'views/entry.html'
	});
	$routeProvider.when('/survey',{
		templateUrl: 'views/survey.html'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});

	}//Function, routeProvider
	]);

/*
Routing
/programs
/programs/12op3pOKOPKPO
getJson(id)
vis data.....

/programs/:id = get survey for spesific survey

*/
