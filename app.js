/*firebase application
var myApp = angular.module('app', ['firebase']);

myApp.controller("MainController", [ '$scope', '$firebaseArray', function($scope, $firebaseArray){
  var ref = new Firebase('https://blazing-torch-1958.firebaseio.com/toeats');

  //create a synchronized array
  $scope.toeats = $firebaseArray(ref);

  // add new items to the array
  // the text is automatically added to Firebase database
  $scope.addToeats = function(){
    $scope.toeats.$add({
      text: $scope.newToeat,
      user: $scope.username
    });
  };

}]);
*/

var myApp = angular.module('app', []);

myApp.controller("MainController", [ '$scope', '$http', function($scope, $http){
  var ref = new Firebase('https://blazing-torch-1958.firebaseio.com/toeats');

  //create a synchronized array
  $scope.toeats = $firebaseArray(ref);

  // add new items to the array
  // the text is automatically added to Firebase database
  $scope.addToeats = function(){
    $scope.toeats.$add({
      text: $scope.newToeat,
      user: $scope.username
    });
  };

}]);
