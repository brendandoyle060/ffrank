app.controller('PlayerCtrl', function($scope, $http, $rootScope){
    
    console.log("PLAYERCTRL called");

    var loadLists = function(user) {
        console.log("PLAYERCTRL loadLists called...user.username: " + user.username);
        $http.get("/usermodels/" + user.username)
        .success(function(response)
        {
            // console.log("loadLists get user.qbs: " + user.qbs);
            // console.log("loadLists get response.qbs: " + response.qbs);

            // console.log("$rootScope.currentUser.qbs: " + $rootScope.currentUser.qbs);
            // console.log("user.qbs: " + user.qbs);

            $rootScope.currentUser = response;
            // console.log("$rootScope.currentUser.qbs: " + $rootScope.currentUser.qbs);
            // console.log("user: " + user.qbs);

            // console.log("response: " + response);
        });
    };

    loadLists($rootScope.currentUser);

    $scope.updateLists = function(user) {

        console.log("PROFILECTRL UPDATELISTS CALLED");
        var arraysArray = update_lists();

        user.qbs = arraysArray[0];
        user.rbs = arraysArray[1];
        user.wrs = arraysArray[2];
        user.tes = arraysArray[3];
        user.defs = arraysArray[4];
        user.ks = arraysArray[5];
        
        $http.put("/usermodels/" + user.username, user)
        .success(function(response){
            console.log("GET UPDATELISTS CALLED");
            console.log("user: " + user.username);
            // console.log(response);
            // user.email = "updated@email.com"
            
        });
    };

});

function update_lists(){
    console.log("UPDATE_LISTS called");

    var positions = ["qb", "rb", "wr", "te", "def", "k"];
    var updateArraysArray = [];

    for(var j = 0; j < positions.length; j++) {
        var posol = document.getElementById(positions[j] + "ol");
        var liArray = posol.children;

        var allPlayers = [];

        for (var i = 0; i < liArray.length; i++) {
            var item = liArray[i];
            // console.log(item.textContent);
            allPlayers.push(item.textContent.trim());
        }
        // console.log(allPlayers);

        updateArraysArray.push(allPlayers);
    }

    return updateArraysArray;
}


