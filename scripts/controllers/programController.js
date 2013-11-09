var surveyApp = angular.module('surveyApp');

surveyApp.controller('ProgramController', ['$scope', '$http', 'urlInfo', 'programsInfo', function($scope,$http, urlInfo, programsInfo){
console.log(programsInfo.data());
	//$scope.programs = [];
	var url;
	var data;
	//console.log(url);
	$scope.programs = [];
	$scope.subPrograms = [];
	PopulatePrograms();

	function PopulatePrograms(){
		if(urlInfo == "localhost"){
			url = 'api/programs.json';
		}
		else{
			url = urlInfo + '/api/programs.json';
		}
		$http.get(url)
		.success(function(response){
			angular.forEach(response.programs, function(value, key){

				if(value.kind == 'SINGLE_EVENT_WITHOUT_REGISTRATION'){
					$scope.programs.push(value);
					//PopulateSubPrograms();
				}
			});
			PopulateSubPrograms();
		})
		.error(function(response, status){
			console.log(response + status);
			console.log("it dosnt work with jsonp.");
		});
	}

	function PopulateSubPrograms(){
		console.log($scope.programs[0]);

		angular.forEach($scope.programs, function (value,key){
			if(urlInfo == "localhost"){
				url = 'api/programs/' + value.id + '.json';
			}
			else{
				url = value.href + '.json';
			}
			$http.get(url)
			.success(function(response){
				console.log(response);

			})
			.error(function(response, status){
				console.log(response + status);
				console.log("it dosnt work with jsonp.");
			});
		});

	}

//	function 

/*Parse data or return data? */



}]);