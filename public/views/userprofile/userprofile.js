app.controller("UserCtrl", function($scope, $http, $location, $rootScope, $routeParams){
    console.log("USERCTRL $routeparams " + $routeParams.username);

    console.log("$routeParams.username: "  + $routeParams.username);
    //Get other users desired profile
    var pageUser = function(user) {
        console.log("PAGEUSER USER: " + user);
        $http.get('/usermodels/' + user)    
            .success(function (msg) {         
                console.log("pageUser success, msg: " + msg);
                if (msg) {
                    console.log("msg.username: " + msg.username);
                    if (msg.username == $rootScope.currentUser.username) {
                        console.log("msg.username==$rootScope.currentUser.username, redirecting to /profile");
                        $location.url('/profile');
                    }
                    else {
                        // console.log("ELSE MSG: " + msg);
                        $scope.otherUser = msg;
                    }

                } else {
                    $scope.error = "This user does not exist.";
                    alert($scope.error);
                }
                // console.log("$scope.otherUser.username: " + $scope.otherUser.username);

        });
    };


    $scope.addToFavorites = function(uName) {
        // console.log("addToFavorites uName: " + uName);

        // console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);
        $rootScope.currentUser.favorites.push(uName);
        // console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);

        $http.put("/usermodels/" + $rootScope.currentUser.username, $rootScope.currentUser)
        .success(function(response){
            // console.log("PUT ADDTOFAVORITES CALLED");
            // console.log("uName: " + uName);
            // console.log("response: " + response);
            
        });
    };


    pageUser($routeParams.username);



});

