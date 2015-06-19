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

    $scope.isFavorite = function(uName) {
        return isInFavorites(uName);
    };

    var isInFavorites = function(uName) {
        console.log("isInFavorites uName: " + uName);

        var currentFavorites = $rootScope.currentUser.favorites;
        console.log("currentFavorites in isInFavorites: " + currentFavorites);
        if ($.inArray(uName, currentFavorites) > -1) {
            console.log("isInFavorites returning true");
            return true;
        } else {
            console.log("isInFavorites returning false");
            return false;
        }

    };


    $scope.addToFavorites = function(uName) {
        console.log("addToFavorites uName: " + uName);

        var currentFavorites = $rootScope.currentUser.favorites;
        console.log("currentFavorites before addToFavorites: " + currentFavorites);
        if (!isInFavorites(uName)) {
            currentFavorites.push(uName);
        }
        console.log("currentFavorites after addToFavorites: " + currentFavorites);


        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);
        $rootScope.currentUser.favorites = currentFavorites;
        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);

        $http.put("/usermodels/favorites/" + $rootScope.currentUser.username, $rootScope.currentUser)
        .success(function(response){
            console.log("PUT ADDTOFAVORITES CALLED");
            console.log("uName: " + uName);
            console.log("response: " + response);
            
        });
    };

    $scope.removeFromFavorites = function(uName) {
        console.log("removeFromFavorites uName: " + uName);

        var currentFavorites = $rootScope.currentUser.favorites;
        console.log("currentFavorites before removeFromFavorites: " + currentFavorites);
        var removeIndex = currentFavorites.indexOf(uName);
        if (removeIndex > -1) {
            currentFavorites.splice(removeIndex, 1);
        }
        console.log("currentFavorites after removeFromFavorites: " + currentFavorites);


        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);
        $rootScope.currentUser.favorites = currentFavorites;
        console.log("$rootScope.currentUser.favorites: " + $rootScope.currentUser.favorites);

        $http.put("/usermodels/favorites/" + $rootScope.currentUser.username, $rootScope.currentUser)
        .success(function(response){
            console.log("PUT REMOVEFROMFAVORITES CALLED");
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

