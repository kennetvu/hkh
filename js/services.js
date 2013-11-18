//'use strict';

/*Services*/
angular.module('surveyApp.services', ['ngResource'])

/*
* Factory to get urlInfo. Should be injected everytime we need to talk with restful
* REMEMBER TO CHANGE ELSE PART IF USING ANOTHER URLS!!!!
* Returns oppsal if current host is localhost
* Returns right path to oppsal if host is oppsal
* Returns DHIS2/DEMO else. 
* This factory returns without backslash
*/
.factory('urlInfo', function($location){
	//console.log("From urlInfo " + $location.absUrl());
	//console.log("host: " + $location.host());
	// Check if host is localhost, if yes, get url from else where.
	//Load from file? 
	if($location.host() == "localhost"){
		return $location.host();
	}
	else{
		//If host is oppsal. remember to add port.
		if($location.host() == "oppsal.dyndns.info"){
			return "http://oppsal.dyndns.info:8080/dhis";
		}// If dhis, just return url info? Remember to change this.
		else{
			return "http://apps.dhis2.org/demo";
			//Lazy fix to test on phone
			//return "http://" + $location.host() + "/survey/hkh";
		}
	}
})
/*Do a query against the server*/
.factory('userInfo2', ['$resource', 'urlInfo', function($resource, urlInfo){
	//console.log("URLINFO: " + urlInfo);
	//Hvis local så er addressen api/me.json
	// hvis ikke, så er den demo.dhis2.com/.... api/me.json
	var url = urlInfo == "localhost" ? "api/me.json" : urlInfo+"/api/me.json";
	//console.log("Url: " + url);
	return $resource(url, {}, {
		get: {method: 'GET', isArray:false}
	});

}])


/*Programs
GET /programs/ = get all programs
GET /programs/id = get programs by id

*/
.factory('programsInfo', ['$resource', 'urlInfo', function($resource, urlInfo){
	
	var url = urlInfo == "localhost" ? "api/programs.json" : urlInfo+"/api/programs.json";
	return $resource(url, {

		get:{method: 'GET', params:{}, headers: {'Content-Type': 'application/json'}},
	});
}])

/*Single events*/
.factory('singleProgramInfo',['$resource', 'urlInfo', function($resource, urlInfo){
	var url = urlInfo == "localhost" ? "api/programs" : urlInfo+"/api/programs";
	return $resource(url+"/:id", {id: "@id"}, {
		getData: {method: 'GET', params: {id : 'id'}, headers: {'Content-Type': 'application/json'} }

	});
}])
.factory('programStagesInfo', ['$resource', 'urlInfo', function($resource, urlInfo){
	var url = urlInfo == "localhost" ? "api/programStages" : urlInfo+"/api/programStages";

	return $resource(url+"/:id", {id: "@id"},{
		getData: {
			method: 'GET',
			params: {id: 'id'},
			headers: {'Content-Type': 'application/json'}
		}
	});
}])
/*Get single dataElement*/
.factory('dataElement', ['$resource', 'urlInfo', function($resource, urlInfo){
	var url = urlInfo == "localhost" ? "api/dataElements" : urlInfo+"/api/dataElements";

	return $resource(url+"/:id", {id: "@id"},{
		getData:{
			method: 'GET',
			params: {id: 'id'},
			headers: {'Content-type': 'application/json'}
		}
	});
}])
.factory('optionSet', ['$resource', 'urlInfo', function($resource, urlInfo){
	var url = urlInfo == "localhost" ? "api/optionSets" : urlInfo+"/api/optionSets";

	return $resource(url+"/:id", {id: "@id"}, {
		getData:{
			method: 'GET',
			params: {id: 'id'},
			headers: {'Content-type': 'application/json'}
		}
	});
}]);

/*Create a save to system setting*/