//'use strict';

/*Controllers*/

angular.module('surveyApp.controllers', [])
.controller('MainController', function($scope, $http, userInfo){

})
.controller('NavbarController', function($scope, $location, userInfo2){
	console.log($location.path());

//	console.log(userInfo.getUsername());
	//Mark navbar active
	//Source: http://stackoverflow.com/questions/16199418/how-do-i-implement-the-bootstrap-navbar-active-class-with-angular-js
	$scope.currentPage = function(viewLocation){
		return viewLocation === $location.path();
	};

	userInfo2.get(function(data){
		$scope.user = data.name;
	});

})
.controller('UserinfoController', function($scope, $http, userInfo2){
//	surveyApp.controller('UserinfoController', function($scope, $http){
	$scope.ButtonClick = function(){
//		alert(userInfo.getFirstname());
	};

	var ala;
	userInfo2.get(function(something){
		$scope.firstname = something.name;
		$scope.username = something.userCredentials.username;
	}, function(err){
		$scope.username = "Not logged in";
	});
	$scope.show = true;

})
.controller('ProgramController', ['$scope', '$http', 'urlInfo', 'programsInfo', function($scope,$http, urlInfo, programsInfo){

	$scope.programs = [];

	programsInfo.get(function(data){
		console.log(data);
		angular.forEach(data.programs, function(value,key){
			if(value.kind == 'SINGLE_EVENT_WITHOUT_REGISTRATION'){
					$scope.programs.push(value);
			}
		});
	});
}])
.controller('ProgramDetailController', ['$scope', '$http','$routeParams' ,'urlInfo','singleProgramInfo','programStagesInfo', function($scope, $http,$routeParams, urlInfo, singleProgramInfo, programStagesInfo){


	console.log($routeParams.id);
	$scope.id = $routeParams.id;
	singleProgramInfo.getData({id: $routeParams.id} , function(data){
		//console.log(data);
		$scope.programId = data;
		//All singleevent program only have 1 stage.
		parseStages(data.programStages[0].id);

	});

	function parseStages(idStage){
		console.log(idStage);
		programStagesInfo.getData({id: idStage}, function(data){
			console.log(data);
			$scope.programStageDataElements = data.programStageDataElements;
			console.log(data.programStageDataElements);
		});
	}



}]);