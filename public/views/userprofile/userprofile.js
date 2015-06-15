app.controller("UserCtrl", function($scope, $http, $location, $rootScope, $routeParams){
    console.log("USERCTRL $routeparams " + $routeParams.username);

    console.log("$routeParams.username: "  + $routeParams.username);
    console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);
    //Get other users desired profile
    var pageUser = function(user) {
        console.log("PAGEUSER USER: " + user);
        $http.get('/usermodels/' + user)    
            .success(function (msg) {         
                console.log("pageUser success, msg.favorites: " + msg.favorites);
                if (msg) {
                    console.log("msg.username: " + msg.username);
                    if (msg.username == $rootScope.currentUser.username) {
                        console.log("msg.username==$rootScope.currentUser.username, redirecting to /profile");
                        $location.url('/profile');
                    }
                    else {
                        console.log("ELSE MSG: " + msg);
                        $scope.otherUser = msg;
                    }

                } else {
                    $scope.error = "This user does not exist.";
                    alert($scope.error);
                }
                console.log("$scope.otherUser.username: " + $scope.otherUser.username);

        });
    };


    $scope.addToFavorites = function(uName) {
        // console.log("addToFavorites uName: " + uName);

        var existingFavorites = $rootScope.currentUser.favorites;
        console.log("existingFavorites before: " + existingFavorites);
        existingFavorites.push(uName);
        console.log("existingFavorites after: " + existingFavorites);


        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);
        $rootScope.currentUser.favorites = existingFavorites;
        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);

        $http.put("/usermodels/favorites/" + $rootScope.currentUser.username, $rootScope.currentUser)
        .success(function(response){
            console.log("PUT ADDTOFAVORITES CALLED");
            console.log("uName: " + uName);
            console.log("response: " + response);
            
        });
    };

    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("USERPROFILECTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };


    pageUser($routeParams.username);



});

