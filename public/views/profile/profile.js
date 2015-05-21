app.controller('FFApiCtrl', function($scope, $http){
    console.log("FFApiCtrl entered");
    

    // $http.get("/rest/user")
    // .success(function(users)
    // {
    //     $scope.users = users;
    // });
    
    // $scope.remove = function(user)
    // {
    //     $http.delete('/rest/user/'+user._id)
    //     .success(function(users){
    //        $scope.users = users; 
    //     });
    // }
    
    // $scope.update = function(user)
    // {
    //     $http.put('/rest/user/'+user._id, user)
    //     .success(function(users){
    //         $scope.users = users; 
    //     });
    // }
    
    // $scope.add = function(user)
    // {
    //     $http.post('/rest/user', user)
    //     .success(function(users){
    //         $scope.users = users; 
    //     });
    // }
    
    // $scope.select = function(user)
    // {
    //     $scope.user = user;
    // }
});

app.controller('PlayerCtrl', function($scope, $http){
    console.log("PlayerCtrl entered");

    var positions = ["qb", "rb", "wr", "te", "def", "k"];
    var arraysArray = [];

    for (x = 0; x < positions.length; x++) {

        var xmlhttp = new XMLHttpRequest();

        var filename = "../xml/" + positions[x] + ".xml";
        // var filename = "xml/qb.xml";

        xmlhttp.open("GET", filename, false);
        xmlhttp.send();
        console.log("XMLHTTP");
        console.log(xmlhttp);
        console.log(typeof xmlhttp);
        var xmlDoc = xmlhttp.responseXML; 
        console.log("XMLDOC");
        console.log(xmlDoc);
        console.log(typeof xmlDoc);

        var allPlayerObjects = xmlDoc.getElementsByTagName("Player");
        var allPlayerNames = [];
        var name = "";

        for (i = 0; i < allPlayerObjects.length; i++) { 
            name = allPlayerObjects[i].getAttribute("displayName");
            // console.log("player: " + name);
            allPlayerNames.push(name);
        }

        arraysArray.push(allPlayerNames);

    }

    $scope.qb = write_letters("qb", arraysArray[0]);
    $scope.rb = write_letters("rb", arraysArray[1]);
    $scope.wr = write_letters("wr", arraysArray[2]);
    $scope.te = write_letters("te", arraysArray[3]);
    $scope.def = write_letters("def", arraysArray[4]);
    $scope.k = write_letters("k", arraysArray[5]);

});


function write_letters(pos, listOfNames){
    var items = document.getElementById(pos);

    for (var i = 0; i < listOfNames.length; i++) {
        var item = document.createElement("li");
        item.setAttribute("class", "ui-state-default");
        item.innerHTML = "<span class=\"ui-icon ui-icon-arrowthick-2-n-s\"></span>" + listOfNames[i];
        items.appendChild(item);
    }

}

