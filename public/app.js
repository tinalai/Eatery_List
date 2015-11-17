var myApp = angular.module('app', []);
myApp.controller('MainController', ['$scope', '$http', function($scope, $http){
  $scope.formData = {};

  // when landing on the page, get all toeats and show toeat
  $http.get('api/toeats')
      .success(function(data){
        $scope.toeats = data;
        console.log(data);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });

  // when submitting the add form, send the next to the node API
  $scope.addToeats = function(){
      $http.post('/api/toeats', $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.toeats = data;
        console.log(data);
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
    }

    $scope.deleteToeat = function(id) {
        $http.delete('/api/toeats' + id)
        .success(function(data) {
          $scope.todos = data;
          console.log(data);
        })
        .error(function(data) {
          console.log("Error: " + data);
        });
      }

}]);
