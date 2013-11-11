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
//navn på controller, function
.controller('UserinfoController', function($scope, urlInfo, userInfo2){
//	surveyApp.controller('UserinfoController', function($scope, $http){

	console.log("Info fra urlINfo   " + urlInfo);

	//asyncron process
	userInfo2.get(function(data){
		$scope.firstname = data.firstName;
		$scope.lastname = data.surname;
	});
	$scope.ButtonClick = function(){
//		alert(userInfo.getFirstname());
};

var ala;
	/*userInfo2.get(function(something){
	$scope.firstname = something.name;
		$scope.username = something.userCredentials.username;
	}, function(err){
		$scope.username = "Not logged in";
	});*/
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
.controller('ProgramDetailController', ['$scope', '$http','$routeParams' ,'urlInfo','singleProgramInfo','programStagesInfo','dataElement','optionSet', function($scope, $http,$routeParams, urlInfo, singleProgramInfo, programStagesInfo,dataElement, optionSet){
	//var s = [];

	$scope.programStageDataElements = [];

	console.log($routeParams.id);
	$scope.id = $routeParams.id;
	singleProgramInfo.getData({id: $routeParams.id} , function(data){
		//console.log(data);
		$scope.programId = data;
		//All singleevent program only have 1 stage.
		parseStages(data.programStages[0].id);

	});

	/**/
	function parseStages(idStage){
	//console.log(idStage);
	programStagesInfo.getData({id: idStage}, function(data){
			//console.log(data);
			//$scope.programStageDataElements = data.programStageDataElements;
			//console.log(data.programStageDataElements);
			parseDataElement(data.programStageDataElements);
		});
}

function parseDataElement(idElement){
	$scope.programStageDataElements = idElement;
	//console.log(idElement);
	angular.forEach($scope.programStageDataElements, function(value, key){
		dataElement.getData({id: value.dataElement.id},function(data){
			console.log(data);
			console.log(key);
	//data.headers();
			//De osm har option set håndter disse
			if(data.optionSet === null){
				/*if() -> If interger*/
				//$scope.programStageDataElements.inputType = 'text';
				value.inputType = 'text';
				value.showInput = true;
				//console.log($scope.programStageDataElements);
				//$scope.programStageDataElement.type = "text";
			}
			else{
				//Optionset
				//value.inputType = 'password';
				value.showSelect = true;
				parseOptionSet(data.optionSet.id, key);
				//console.log($scope.programStageDataElements);
			}
			//$scope.programStageDataElements = s;
		});
	//console.log($scope.programStageDataElements);
});
	//console.log(s);

}//Function

function parseOptionSet(idOptionSet, key){
	optionSet.getData({id: idOptionSet}, function(data){
		$scope.programStageDataElements[key].optionSetValues = data.options;
	});//optionsetGetdata


}



}]);