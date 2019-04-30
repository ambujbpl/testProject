angular
	.module('MyApp')
	.controller('ChartController',['$scope','ContactService',function($scope,ContactService) {
		var id = _getUrlParamater('id');
		
		// Parameter Declaration
		$scope.newcontact = {};


		// Function Declaration
		$scope.getUrlParameter = _getUrlParamater;
		$scope.GetUserInfo = _GetUserInfo
		$scope.saveContact = _saveContact;

		function _getUrlParamater(name) {
		    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
		    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
		    var results = regex.exec(location.search);
		    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		};

		if(id) {
			_GetUserInfo(id);
		}
		/**
		 * Gets the user Info.
		 */
		function _GetUserInfo(id) {
			ContactService.GetUserInfo({id},function(response) {
				if(response.data.resCode.toLowerCase().trim() == 'ok' && response.data.data && response.data.data.length > 0) {
					$scope.newcontact = response.data.data[0];
					$scope.newcontact.id = id;
				} else {
					console.log(response, '---error in processing');
				}
			});
		};



		function _saveContact() {
			ContactService.saveContact($scope.newcontact,function(response) {
				console.log(response, ' ---response');
			});
		};
	}]);