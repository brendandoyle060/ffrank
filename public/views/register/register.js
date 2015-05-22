app.controller("RegisterCtrl", function($scope, $http, $location, $rootScope){
    $scope.register = function(user){
        console.log(user);
        if(user.password != user.password2 || !user.password || !user.password2)
        {
            console.log("Your passwords don't match");
            $rootScope.message = "Your passwords don't match";
        }
        else
        {
            console.log("register.js else");
            $http.post("/register", user)
            .success(function(response){
                console.log(response);
                if(response != null)
                {
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                }
            });
        }
    }
});

