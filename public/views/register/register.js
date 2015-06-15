app.controller("RegisterCtrl", function($scope, $http, $location, $rootScope){
    console.log("REGISTERCTRL entered");
    $scope.register = function(user){
        console.log(user);
        if(user.password != user.password2 || !user.password || !user.password2)
        {
            console.log("Your passwords don't match");
            $rootScope.message = "Your passwords don't match";
            alert("Your passwords don't match!");
        }
        else
        {
            console.log("register.js else");
            /////////////////////////////////////////////////////////

            var positions = ["qb", "rb", "wr", "te", "def", "k"];
            var arraysArray = [];

            for (x = 0; x < positions.length; x++) {

                var xmlhttp = new XMLHttpRequest();

                var filename = "../xml/" + positions[x] + ".xml";
                // var filename = "xml/qb.xml";

                xmlhttp.open("GET", filename, false);
                xmlhttp.send();
                // console.log("XMLHTTP");
                // console.log(xmlhttp);
                // console.log(typeof xmlhttp);
                var xmlDoc = xmlhttp.responseXML; 
                // console.log("XMLDOC");
                // console.log(xmlDoc);
                // console.log(typeof xmlDoc);

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

            user.qbs = arraysArray[0];
            user.rbs = arraysArray[1];
            user.wrs = arraysArray[2];
            user.tes = arraysArray[3];
            user.defs = arraysArray[4];
            user.ks = arraysArray[5];

            // console.log("REGISTER user: " + user.username);
            // console.log("qbs: " + user.qbs);


            /////////////////////////////////////////////////////////
            $http.post("/register", user)
            .success(function(response){
                console.log("REGISTERCTRL POST");
                // console.log("user.qbs: " + user.qbs);
                // console.log("response.qbs: " + response.qbs);
                if(response != null) {
                    $rootScope.currentUser = response;
                    $location.url("/profile");
                }
                else {
                    alert("This user already exists!");
                }
            });
        }
    };

    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("REGISTERCTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };

});

