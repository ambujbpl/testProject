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
		// var id = $routeParams.id;
		//   $http.get("/getUserDetailsById:" + paramValue)
		//   .then(function(response) {
		//   	console.log(response, ' - - -resp');
		//     $scope.user = response.data;
		//   }).catch(function(error){
		//   	console.log(error, ' ----error -- - - ')	;
		//   });    
		//  var uid = 1;
		//  var contacts = [{
		//    'id' : 0,
		//  'name' : 'Steve John',
		//  'email' : 'john@gmail.com',
		//  'password': 'John123',
		//  'phone' : '911-91-199-999'}]; 
		 
		//  // Save Service for sving new contact and saving existing edited contact.
		//  this.save = function(contact)  
		//  {
		//  if(contact.id == null)                       
		//  {
		//  contact.id = uid++;
		//  contacts.push(contact);
		//  }
		//  else
		//  {
		//  for(var i in contacts)
		//  {
		//  if(contacts[i].id == contact.id)
		//  {
		//  contacts[i] = contact;
		//  }
		//  }
		//  }
		//  };
		 
		//  // serach for a contact
		 
		//  this.get = function(id)
		//  {
		//  for(var i in contacts )
		//  {
		//  if( contacts[i].id == id)
		//  {
		//  return contacts[i];
		//  }
		//  }
		//  };
		 
		//  //Delete a contact
		//  this.delete = function(id)
		//  {
		//  for(var i in contacts)
		//  {
		//  if(contacts[i].id == id)
		//  {
		//  contacts.splice(i,1);
		//  }
		//  }
		//  }; 
		//  //Show all contacts
		//  this.list = function()
		//  {
		//  return contacts;
 	// } ; 
}]);