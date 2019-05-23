angular
	.module("IndexMyApp")
	.service("IndexService" , ['$http',function($http){
		return {
          	getUsersList: function(data, callback) {
                $http({
                    method: 'GET',
                    url: '/route/getUsersList'
                }).then(function(response) {
                	console.log("response : ",response)
                    callback(response);
                }, function(response) {
                    callback(response);
                });
            }
        };
    }]);