app.controller('FFApiCtrl', function($scope, $http){
    console.log("FFApiCtrl entered");

    // var url = "http://draft.gnmerritt.net/api/v1/nfl/position/";
    // var callback = "?callback=JSON_CALLBACK";

    // $http.jsonp(url + "QB" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl qb + " + response);
    //     $scope.quarterbacks = response;
    // });

    // $http.jsonp(url + "RB" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl rb + " + response);
    //     $scope.runningbacks = response;
    // });

    // $http.jsonp(url + "WR" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl wr + " + response);
    //     $scope.widereceivers = response;
    // });

    // $http.jsonp(url + "TE" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl te + " + response);
    //     $scope.tightends = response;
    // });

    // $http.jsonp(url + "DST" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl def + " + response);
    //     $scope.defenses = response;
    // });

    // $http.jsonp(url + "K" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl k + " + response);
    //     $scope.kickers = response;
    // });

    // $http.jsonp(url + "K" + callback)
    // .success(function (response) {
    //     console.log("FFApiCtrl k + " + response);
    //     $scope.kickers = response;
    // });

    

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

app.controller('QbCtrl', function($scope, $http){
    console.log("QbCtrl entered");

    var xmlhttp = new XMLHttpRequest();

    // var filename = "../xml/" + position + ".xml";
    var filename = "xml/qb.xml";

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
        console.log("player: " + name);
        allPlayerNames.push(name);
    }

    // $scope.qbList = allPlayerNames;


    $scope.allQBs = write_letters(allPlayerNames);


});


function write_letters(listOfNames){
    var items = document.getElementById("qbUl");

    for (var i = 0; i < listOfNames.length; i++) {
        var item = document.createElement("li");
        item.innerHTML = listOfNames[i];
        items.appendChild(item);
    }

}

