var surveyApp = angular.module('surveyApp');

/*
* Not really in use because mainController gets loaded before routes. 
* Injection wont work, because the object is created AFTER maincontroller.
*/
surveyApp.controller('MainController', function($scope, $http, userInfo){

});