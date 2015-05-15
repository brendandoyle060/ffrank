var app = angular.module("PassportApp", ["ngRoute"]);

app.config(function($routeProvider, $httpProvider) {
    console.log("app.js config");
    $routeProvider
      .when('/home', {
          templateUrl: 'views/home/home.html'
      })
      .when('/profile', {
          templateUrl: 'views/profile/profile.html',
          controller: 'ProfileCtrl',
          //UNCOMMENT THIS CODE LATER - THIS IS DESIRED FUNCTIONALITY IN
          //  FINAL VERSION.

          // resolve: {
          //     loggedin: checkLoggedin
          // }
      })
      .when('/search', {
          templateUrl: 'views/search/search.html',
          // controller: 'SearchCtrl' //DOES NOT NEED CONTROLLER YET
      })
      .when('/about', {
          templateUrl: 'views/about/about.html',
          // controller: 'AboutCtrl' //MAY NOT NEED CONTROLLER
      })
      .when('/login', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
      })
      .when('/register', {
          templateUrl: 'views/register/register.html',
          controller: 'RegisterCtrl'
      })
      .otherwise({
          redirectTo: '/home'
      });
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
{
    console.log("app.js checkLoggedin");
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};

app.controller("NavCtrl", function($scope, $http, $location, $rootScope){
    console.log("app.js app.controller");
    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };
});