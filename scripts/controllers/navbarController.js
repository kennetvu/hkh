var surveyApp = angular.module('surveyApp');

surveyApp.controller('NavbarController', function($scope, $location){
	console.log($location.path());

//	console.log(userInfo.getUsername());
	//Mark navbar active
	//Source: http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
	$scope.currentPage = function(viewLocation){
		return viewLocation === $location.path();
	};
});