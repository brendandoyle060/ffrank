app.controller('FFApiCtrl', function($scope, $http){
    console.log("FFApiCtrl entered");

    var url = "http://www.fantasyfootballnerd.com/service/players/json/x8xwrrhb9et3/";

    $http.get(url + "QB/")
    .success(function (response) {
        console.log("FFApiCtrl qb + " + response);
        $scope.quarterbacks = response;
    });

    $http.get(url + "RB/")
    .success(function (response) {
        console.log("FFApiCtrl rb + " + response);
        $scope.runningbacks = response;
    });

    $http.get(url + "WR/")
    .success(function (response) {
        console.log("FFApiCtrl wr + " + response);
        $scope.widereceivers = response;
    });

    $http.get(url + "TE/")
    .success(function (response) {
        console.log("FFApiCtrl te + " + response);
        $scope.tightends = response;
    });

    $http.get(url + "DEF/")
    .success(function (response) {
        console.log("FFApiCtrl def + " + response);
        $scope.defenses = response;
    });

    $http.get(url + "K/")
    .success(function (response) {
        console.log("FFApiCtrl k + " + response);
        $scope.kickers = response;
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