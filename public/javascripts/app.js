/**
* codeslam Module
*
* Description
*/
 var app = angular.module('codeslam', [
 	'authservice',
 	'codeservice',
	'facultyservice',
	'challengeSolveService',
	'controllers',
	'facultyctrl',
	'routes'
]);

app.filter('unsafe',function($sce){
	return function(val){
		return $sce.trustAsHtml(val);
	};
});