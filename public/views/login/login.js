app.controller("LoginCtrl", function($scope, $http, $location, $rootScope){
    $scope.login = function(user){
        console.log(user);
        $http.post("/login", user)
        .success(function(response){
            console.log("loginctrl: " + response);
            $rootScope.currentUser = response;
            $location.url("/profile");
        });
    };

    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("LOGINCTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };

});
