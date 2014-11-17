'use strict'

var paymentAdminApp = angular.module('paymentAdminApp',[
	'ngRoute',
	'adminControllers'
	]);

paymentAdminApp.config(['$routeProvider', '$httpProvider',
	function($routeProvider, $httpProvider) {
		$httpProvider.interceptors.push('httpInterceptor');
		$routeProvider.
			when('/login', {
				templateUrl: 'partials/loginscreen.html',
				controller: 'LoginCtrl'
			}).
			when('/adminpanel', {
				templateUrl: 'partials/adminpanel.html',
				controller: 'AdminCtrl'
			}).	
			when('/currency', {
				templateUrl: 'partials/currency.html',
				controller: 'CurrencyCtrl'
			}).
			when('/createprincipal', {
				templateUrl: 'partials/principal.html',
				controller: 'PrincipalCtrl'
			}).
			otherwise({
				redirectTo: '/adminpanel'
			});
	}
]);

// this interceptor is used for auth checking on every http req
paymentAdminApp.factory('httpInterceptor', ['$q', '$location', '$log', function($q, $location, $log) {
	return {

		// Valid response Interceptor
		'response': function(response) {
			$log.info(response.status + ' Valid interceptor running(inactive)')
		  	return response;
		},
		// Error response Interceptor
		'responseError': function(response) {
			if (response.status == 401){
				$location.url('/login');
			}
		  return $q.reject(response);
		}
	};
}]);
