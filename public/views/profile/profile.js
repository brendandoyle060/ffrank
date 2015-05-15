app.controller('ProfileCtrl', function($scope, $http){
    
    $http.get("/rest/user")
    .success(function(users)
    {
        $scope.users = users;
    });
    
    $scope.remove = function(user)
    {
        console.log("profile.js remove");
        $http.delete('/rest/user/'+user._id)
        .success(function(users){
           $scope.users = users; 
        });
    }
    
    $scope.update = function(user)
    {
        console.log("profile.js update");
        $http.put('/rest/user/'+user._id, user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.add = function(user)
    {
        console.log("profile.js add");
        $http.post('/rest/user', user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
    $scope.select = function(user)
    {
        console.log("profile.js select");
        $scope.user = user;
    }
});