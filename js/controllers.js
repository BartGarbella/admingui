'use strict'

var adminControllers = angular.module('adminControllers',[]);

adminControllers.controller('NavCtrl', ['$scope','$location', function($scope,$location){

	$scope.menu = [
			{text: 'Admin Panel', href:'/#/adminpanel'},
			{text: 'Principal', href:'/#/princial', children: [
				{text:'Create new Principal', href:'/#/createprincipal'},
				{text:'View Principals', href:'/#/viewprincipal'},
				{text:'Modify Principals', href:'/#/modifyprincipal'}
			]},
			{text: 'Project', href:'/#/project', children: [
				{text:'Create new Project', href:'/#/createproject'},
				{text:'View Projects', href:'/#/viewproject'},
				{text:'Modify Projects', href:'/#/modifyproject'}
			]},
			{text: 'Principal', href:'/#/provider', children: [
				{text:'Create new Provider', href:'/#/createprovider'},
				{text:'View Providers', href:'/#/viewprovider'},
				{text:'Modify Provider', href:'/#/modifyprovider'}
			]},
			{text: 'Currency', href:'/#/currency'},
			{text: 'Logout', href:'/#/login'}

	]
	
}]);


adminControllers.controller('LoginCtrl', ['$scope', '$http', '$log', '$location',
 	function($scope, $http, $log, $location){

		$scope.$log = $log

		$scope.login = function(){
			$http({
    				url: 'http://localhost:8080/v1/authorization/text',
    				dataType: 'text',
    				method: 'POST',
    				data: $scope.pwd,
   					headers: {
        				"Content-Type": "text/plain"
    				}
    			}).
  				success(function(data, status, headers, config) {
  					$location.url('/adminpanel');
				}).
				error(function(data, status, headers, config) {
  					$location.url('/login')
				})
		};

		// manual logout via "ng-controller='LoginCtrl'"
		$http.delete("http://localhost:8080/v1/authorization").
			success(function(data, status, headers, config) {
				$location.url('/login');
			}).
			error(function(data, status, headers, config) {
				$log.info("logout failed")
			})
}])

adminControllers.controller('CurrencyCtrl', ['$scope', '$http', '$log', '$location',
 	function($scope, $http, $log, $location){

		$http({
				url: 'http://localhost:8080/v1/currency',
				dataType: 'json',
				method: 'GET'
			}).
			success(function(data, status, headers, config) {
				$scope.currency = data.Response;

			}).
			error(function(data, status, headers, config) {
				$scope.$currency = data.Status;	
			})
	
}])

adminControllers.controller('AdminCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){
		$http.get("http://localhost:8080/v1/user").
			success(function(data){
				$log.info(data.Response)
				$scope.user = data.Response
			}).
			error(function(data){
				$log.error("AP user call failed")
			});
}])



adminControllers.controller('PrincipalCtrl', ['$scope', '$http', '$log', '$location',
	function($scope, $http, $log, $location){

		$scope.createPrincipalFunc = function(){
			if ($scope.newPrincipalName != ""){
				$http({
					url: 'http://localhost:8080/v1/principal',
					dataType: 'json',
					method: 'PUT',
					data: {"Name": $scope.newPrincipalName},
					headers:{
						"ContentType": "application/json"
					}	
				})
			}
			
			else {
				alert("Enter new Principal Name")
			}
		};
	

		$scope.viewPrincipalFunc = function(){
			if ($scope.viewPrincipal != ""){
				$http.get("http://localhost:8080/v1/principal/" + $scope.viewPrincipal).
				success(function(data){
					$scope.principal = data.Response
				}).
				error(function(data){
					$log.error("AP user call failed / Principal not found")
				})


			} else {
				alert("Enter new Principal Name");
			}
		};

}]);
