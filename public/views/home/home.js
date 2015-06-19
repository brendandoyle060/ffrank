app.controller("HomeCtrl", function($scope, $http, $location, $rootScope){

    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("HOMECTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    }; 

});
