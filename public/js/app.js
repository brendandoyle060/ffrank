var app = angular.module("PassportApp", ["ngRoute"]);

app.config(function($routeProvider, $httpProvider) {
    console.log("app.js config");
    $routeProvider
      .when('/home', {
          templateUrl: 'views/home/home.html',
          // controller: 'HomeCtrl'
      })
      .when('/profile', {
          templateUrl: 'views/profile/profile.html',
          controller: 'PlayerCtrl',
          resolve: {
              loggedin: checkLoggedin
          }
      })
      .when('/profile/:username', {
          templateUrl: 'views/userprofile/userprofile.html',
          controller: 'UserCtrl',
          resolve: {
              loggedin: checkLoggedInUserProfile
          }
      })
      .when('/search', {
          templateUrl: 'views/search/search.html',
          controller: 'SearchCtrl',
          resolve: {
              loggedin: checkLoggedin
          } 
      })
      .when('/about', {
          templateUrl: 'views/about/about.html',
          controller: 'AboutCtrl'
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
            // console.log("CHECKLOGGEDIN user.qbs: " + user.qbs);
            $rootScope.currentUser = user; 
            // console.log("CHECKLOGGEDIN currentUser.qbs: " + $rootScope.currentUser.qbs);
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

var checkLoggedInUserProfile = function($q, $timeout, $http, $location, $rootScope, $routeParams)
{
    console.log("app.js checkLoggedInUserProfile");
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        console.log("first get");
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

    $http.get('/username').success(function(user)
    {
        console.log("APP second get: " + $routeParams.username);
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            // $rootScope.otherUser = $routeParams.username;
            deferred.resolve();
            // console.log($rootScope.otherUser);
        }
        // User is Not Authenticated
        else
        {
            console.log("not Authenticated");
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });
    
    return deferred.promise;
};


app.controller("NavCtrl", function($scope, $http, $location, $rootScope){
    console.log("NAVCTRL");
    $scope.logout = function(){
        $http.post("/logout")
        .success(function(){
            console.log("NAVCTRL POST LOGOUT");
            $scope.otherUser = null;
            $rootScope.currentUser = null;
            $location.url("/home");
        });
    };
});