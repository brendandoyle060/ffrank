app.controller("SearchCtrl", function($scope, $http, $location, $rootScope){
	console.log("searchctrl called");
    $scope.search = function(user){
        // console.log("user.username: " + user.username);
        $http.get("/search/" + user.username)
        .success(function(response){
            // console.log("searchctrl get response: " + response.username);
            $scope.searchResults = response;
            // console.log("$scope.searchResults: " + $scope.searchResults);
        });


    }
});
