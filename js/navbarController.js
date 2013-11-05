var surveyApp = angular.module('surveyApp');

surveyApp.controller('NavbarController', function($scope, $location){
	console.log($location.path());
});