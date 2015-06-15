app.controller("AboutCtrl", function($scope, $http, $location, $rootScope){

    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("ABOUTCTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };

});
