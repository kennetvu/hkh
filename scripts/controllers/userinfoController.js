var surveyApp = angular.module('surveyApp');

/*User should always be logged in, since the program is running through DHIS.*/
surveyApp.controller('UserinfoController', function($scope, $http, userInfo){
//	surveyApp.controller('UserinfoController', function($scope, $http){
	$scope.ButtonClick = function(){
		alert(userInfo.getFirstname());
	};

	$scope.show = true;
	$scope.username = userInfo.getUsername();
	$scope.firstname = userInfo.getFirstname();
	$scope.lastname = userInfo.getLastname();

/*
	$scope.$watch('userInfo.getLoggedIn()', function (newdata){
		console.log(newdata);
		$scope.show=true;
	});*/

});

