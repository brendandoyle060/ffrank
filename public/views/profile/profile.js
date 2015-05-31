app.controller('PlayerCtrl', function($scope, $http, $rootScope){
    
    console.log("PLAYERCTRL called");

    $scope.loadLists = function(currentUser) {
        console.log("PLAYERCTRL loadLists called");
        $http.get("/usermodels/" + $rootScope.currentUser)
        .success(function(response)
        {
            console.log("loadLists get: " + response);
            $rootScope.currentUser = response;
        });
    };


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

// function write_letters(pos, listOfNames){
//     var items = document.getElementById(pos + "ol");

//     for (var i = 0; i < listOfNames.length; i++) {
//         var item = document.createElement("li");
//         item.setAttribute("class", "ui-state-default");
//         item.innerHTML = /*"<span class=\"ui-icon ui-icon-arrowthick-2-n-s\"></span>" +*/ listOfNames[i].trim();
//         items.appendChild(item);
//     }

// }

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


