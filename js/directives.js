'use strict'

adminControllers.directive('navMenu', ['$parse', '$compile', function($parse, $compile) {
    return {
        restrict: 'C', //Class
        scope:true,
        templateUrl: 'partials/navigation.html'
    };
}])