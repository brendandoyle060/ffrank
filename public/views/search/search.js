app.controller("SearchCtrl", function($scope, $http, $location, $rootScope){
	console.log("searchctrl");
    $scope.search = function(uname){
        console.log(uname);
        $http.get("/usermodels/" + uname)
        .success(function(response){
            console.log("searchctrl: " + response);
            $scope.targetUser = uname;
            // $rootScope.currentUser = response;
            $location.url("/profile");
        });
    }
});

