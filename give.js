var app = angular.module("Bookmark", ['firebase']);  
app.controller("Ctrl", function ($scope, $firebaseArray, $http) {
  $scope.url;  
    $scope.urlArr = [];
    var firebaseURL = "https://zooomg.firebaseio.com/";
    $scope.getList = function() {
      var echoRef = new Firebase(firebaseURL);
//      var query = echoRef.orderByChild("url");
      var query = echoRef.child('users').child($scope.$authData.uid).orderByChild('url');
        $scope.urlArr = $firebaseArray(query);
    };
    $scope.add = function() { 
      $scope.urlArr.$add({
        url: $scope.url,
        title: "TBA"
      });   
    };
    $scope.remove = function (url) {
      $scope.urlArr.$remove(url);
    };
    $scope.FBLogin = function () {
      var ref = new Firebase(firebaseURL);
      ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        $scope.$apply(function() {
        $scope.$authData = authData;
      });
      console.log("Authenticated successfully with payload:", authData);
      // do something with the login info
        $scope.getList();
    
      }
     });
   };
    $scope.FBLogout = function () {
      var ref = new Firebase(firebaseURL);
      ref.unauth();
      delete $scope.$authData;
      // do something after logout
    };
    $scope.getWeather = function(city) {
      //http://api.openweathermap.org/data/2.5/weather?q=seoul,uk&appid=2de143494c0b295cca9337e1e96b00e0
      $http.get('http://api.openweathermap.org/data/2.5/weather', 
        {params: {q: city, appid:'2de143494c0b295cca9337e1e96b00e0'}}).
        success(function(data, status, headers, config) {
          $scope.weatherData = data;
        }).
        error(function(data, status, headers, config) {});
    }
    // load the list!
    // get weather
    $scope.getWeather('seoul');
});