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
//ProgramDetailController -> Controller for programDetail sida.
.controller('ProgramDetailController', ['$scope', '$filter','$routeParams' ,'urlInfo','singleProgramInfo','programStagesInfo','dataElement','optionSet', function($scope, $filter,$routeParams, urlInfo, singleProgramInfo, programStagesInfo,dataElement, optionSet){
	//var s = [];

	//Create ng.show. for section and input?
	//Watch their values, if their change. Create watch.
	//$scope.programStageDataElements = [];

	$scope.alert = {
		show: false,
		dataElement: '',
		dataElementLength: ''
	};
	//console.log($routeParams.id);
	$scope.id = $routeParams.id;
	//Trenger egt ikke en sjekk. eller loop. er bare Single event
	singleProgramInfo.getData({id: $routeParams.id} , function(data){
		//console.log(data);
		$scope.programId = data;
		$scope.$broadcast('DataElementUpdate',{
			//programId : data
		});
		//All singleevent program only have 1 stage.
		//parseStages(data.programStages[0].id);

	});

	$scope.$on('DataSetUpdate', function(event, message){
		//console.log("Im printing from dataSetUPdate");
		console.log(message);
		$scope.dataSent = message;
		//var t = $filter('json')(message);
		//console.log(t);
	});

}])
//DataElementController -> Get all dataElement, post them out
.controller('DataElementController',['$scope','urlInfo', 'programStagesInfo','dataElement','optionSet', function($scope, urlInfo, programStagesInfo, dataElement,optionSet){
	console.log("DataElementController");
	//console.log($scope.id);
	//Update when parent contorller is done.
	$scope.$on('DataElementUpdate', function(){
		//Get program stages.
		//then parse all data
		programStagesInfo.getData({id: $scope.programId.programStages[0].id}, function(data){
			//console.log(data);
			$scope.programStageDataElements = data.programStageDataElements;
			parseDataElements($scope.programStageDataElements);
		});
	});

	//$scope.dataSent = [];

	$scope.submitData = function(){
		/*Broadcast to bigcontroller yo*/
		var data = {};
		console.log($scope.programStageDataElements);
		angular.forEach($scope.programStageDataElements, function(value, key){
			if(value.userData !== undefined){
				data[value.dataElement.id] = value.userData;
			}
		});
		//console.log(data);
		this.$emit('DataSetUpdate', data);
		//$scope.dataSent = angular.copy(data);

	};
	function parseDataElements(programStageData){
		console.log("parseDataElements");
		console.log(programStageData);

		angular.forEach(programStageData, function(value, key){
			//console.log(value);
			dataElement.getData({id: value.dataElement.id}, function(data){
				//console.log(data);
				value.showElement = true;
				if(data.optionSet === null){
					value.inputType = 'text';
					value.showInput = true;
					console.log(value);
				}
				else{
					value.showSelect = true;
					parseOptionSet(data.optionSet.id, key);
				}
			});
		});
	}
	//Parse based on each dataElement
	function parseOptionSet(id, key){
		optionSet.getData({id: id}, function(data){
			if(data.options.length < 50){
				//console.log(data);
				$scope.programStageDataElements[key].optionSetValues = data.options;
				$scope.programStageDataElements[key].userData = data.options[0];
				console.log("yolo");
			//	console.log($scope.userData);

		}
		else{
			console.log(data);
			$scope.programStageDataElements[key].showElement = false;
			$scope.alert.show = true;
			$scope.alert.dataElement = data.name;
			$scope.alert.dataElementLength = data.options.length;

			console.log($scope.alert.message);
		}
	});
	}
/*	$scope.watch('programId', function(newValue, oldValue){
		
});*/

}]);