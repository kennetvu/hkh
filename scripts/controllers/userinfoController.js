var surveyApp = angular.module('surveyApp');

surveyApp.controller('UserinfoController', function($scope, $http, userInfo){

	$scope.ButtonClick = function(){
		alert(userInfo.getFirstname());
	};
	console.log(userInfo.getLoggedIn());
	//userInfo.setLoggedIn(false);
	if(userInfo.getLoggedIn() === false){
		$scope.username = "Not logged in";
		$scope.show = false;
		return;
	}
	else{
		$scope.show = true;
		$scope.username = userInfo.getUsername();
		$scope.firstname = userInfo.getFirstname();
		$scope.lastname = userInfo.getLastname();
	}
/*
	$scope.$watch('userInfo.getLoggedIn()', function (newdata){
		console.log(newdata);
		$scope.show=true;
	});*/

});

