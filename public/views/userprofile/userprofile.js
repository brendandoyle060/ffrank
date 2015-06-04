app.controller("UserCtrl", function($scope, $http, $location, $rootScope, $routeParams){
    console.log("USERCTRL $routeparams " + $routeParams.username);
    // // $rootScope.otherUser = $routeParams.username; //THIS SORT OF WORKS WITH NOTHING ELSE IN USERCTRL

    // $rootScope.otherUser = $http.get('/usermodels/' + $routeParams.username)
    // .success(function (user) {
    //     console.log(user);
    // });

    // console.log("$rootScope.otherUser.password: " + $rootScope.otherUser.password);



    // $scope.user = {};
    // $scope.comments = [];

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
                        $location.url('/profile/');
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
        // loadLists($scope.otherUser);
    };





    // console.log("pageUser.email: " + pageUser.email);

    // console.log("USERCTRL done");




    // var loadLists = function(user) {
    //     console.log("USERCTRL loadLists called...user.username: " + user.username);
    //     $http.get("/usermodels/" + user.username)
    //     .success(function(response)
    //     {
    //         console.log("loadLists get user.username: " + user.username);
    //         console.log("loadLists get user.qbs: " + user.qbs);
    //         console.log("loadLists get response.qbs: " + response.qbs);

    //         // console.log("$rootScope.currentUser.qbs: " + $rootScope.currentUser.qbs);
    //         // console.log("user.qbs: " + user.qbs);

    //         $scope.otherUser = response;
    //         // console.log("$rootScope.currentUser.qbs: " + $rootScope.currentUser.qbs);
    //         // console.log("user: " + user.qbs);

    //         // console.log("response: " + response);
    //     });
    // };

    pageUser($routeParams.username);



});


// app.controller('UserCtrl', function($scope, $http){
//     console.log("UserCtrl entered");

    // var positions = ["qb", "rb", "wr", "te", "def", "k"];
    // var arraysArray = [];



    // var allPlayerObjects = xmlDoc.getElementsByTagName("Player");
    // var allPlayerNames = [];
    // var name = "";

    // for (i = 0; i < allPlayerObjects.length; i++) { 
    //     name = allPlayerObjects[i].getAttribute("displayName");
    //     // console.log("player: " + name);
    //     allPlayerNames.push(name);
    // }

    // arraysArray.push(allPlayerNames);

    

    // $scope.qb = write_letters("qb", arraysArray[0]);
    // $scope.rb = write_letters("rb", arraysArray[1]);
    // $scope.wr = write_letters("wr", arraysArray[2]);
    // $scope.te = write_letters("te", arraysArray[3]);
    // $scope.def = write_letters("def", arraysArray[4]);
    // $scope.k = write_letters("k", arraysArray[5]);

// });


// function write_letters(pos, listOfNames){
//     var items = document.getElementById(pos);

//     for (var i = 0; i < listOfNames.length; i++) {
//         var item = document.createElement("li");
//         item.setAttribute("class", "ui-state-default");
//         item.innerHTML = "<span class=\"ui-icon ui-icon-arrowthick-2-n-s\"></span>" + listOfNames[i];
//         items.appendChild(item);
//     }

// }

// function open_currentuser_profile() {
//     location.href = "ffrank-bdoyle.rhcloud.com/profile/" + $rootscope.currentUser.username;
// }