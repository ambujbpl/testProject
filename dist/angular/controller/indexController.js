angular
	.module('IndexMyApp')
	.controller('IndexController',['$scope','IndexService',function($scope,IndexService) {
		// Parameter Declaration
		$scope.users = {};
		
		// Function Declaration
		$scope.getUserList = _getUserList;

		function _getUserList(){

			IndexService.getUsersList({},function(response) {
				console.log('response');
				$scope.users = response.data.users
			});	

		}
		_getUserList();
	}]);