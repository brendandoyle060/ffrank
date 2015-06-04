app.controller("SearchCtrl", function($scope, $http, $location, $rootScope){
	console.log("searchctrl called");
    $scope.search = function(user){
        console.log("user.username: " + user.username);
        $http.get("/search/" + user.username)
        .success(function(response){
            console.log("searchctrl get response: " + response.username);
            $scope.searchResults = response;
            console.log("$scope.searchResults: " + $scope.searchResults);
            // $rootScope.currentUser = response;
            console.log("/profile/" + response.username);
            // $location.url("/profile/" + response.username); //CHANGE TO USERPROFILE
        });


    }
});


// app.controller("SearchCtrl", function($scope, $http){


// $scope.getEvents = function(query){
//     var url = "http://api.songkick.com/api/3.0/events.json?";
//     if (query.artist_name){
//         url += "artist_name=" + query.artist_name + "&apikey=T24KfWlGCOn6lJuf&type=Festival&jsoncallback=JSON_CALLBACK";
//     }

//     $http.jsonp(url)
//     .success(function(response){
//         errRes = response.resultsPage.totalEntries;
//         response = response.resultsPage.results.event;
//         $scope.eventList = response;
//         if (errRes == 0){
//             $('.alert').removeClass('hide');
//     }

//     });

//     $('.alert').slideUp(400);
// }

// // get events by user location (ip address)
// $scope.getEventsLoc = function(quer){
//     var url = "http://api.songkick.com/api/3.0/events.json?location=clientip&apikey=T24KfWlGCOn6lJuf&type=Festival&jsoncallback=JSON_CALLBACK";

//     $http.jsonp(url)
//     .success(function(response){
//         response = response.resultsPage.results.event;
//         $scope.eventList = response;
//         console.log(response);
//     });
    
// }

// });