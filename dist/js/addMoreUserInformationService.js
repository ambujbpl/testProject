angular
	.module("MyApp")
	.service("ContactService" , ['$http',function($http){
		return {
      	GetUserInfo: function(data, callback) {
            $http({
                method: 'GET',
                url: '/getUserDetailsById/'+data.id
            }).then(function(response) {
            	console.log("response : ",response)
                callback(response);
            }, function(response) {
                callback(response);
            });
        },
        saveContact: function(data, callback) {
            $http({
                method: 'POST',
                url: '/updateUserDetailsById',
                data:data
            }).then(function(response) {
                callback(response);
            }, function(response) {
                callback(response);
            });
        }
    };
}]);