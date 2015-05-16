app.controller('FFApiCtrl', function($scope, $http){
    console.log("FFApiCtrl entered");
    $http.get("http://www.fantasyfootballnerd.com/service/players/json/x8xwrrhb9et3/QB/")
    .success(function (response) {
        console.log("FFApiCtrl success! + " + response);
        $scope.quarterbacks = response;
    });

    // $http.get("/rest/user")
    // .success(function(users)
    // {
    //     $scope.users = users;
    // });
    
    // $scope.remove = function(user)
    // {
    //     $http.delete('/rest/user/'+user._id)
    //     .success(function(users){
    //        $scope.users = users; 
    //     });
    // }
    
    // $scope.update = function(user)
    // {
    //     $http.put('/rest/user/'+user._id, user)
    //     .success(function(users){
    //         $scope.users = users; 
    //     });
    // }
    
    // $scope.add = function(user)
    // {
    //     $http.post('/rest/user', user)
    //     .success(function(users){
    //         $scope.users = users; 
    //     });
    // }
    
    // $scope.select = function(user)
    // {
    //     $scope.user = user;
    // }
});