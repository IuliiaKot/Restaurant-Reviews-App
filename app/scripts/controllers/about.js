'use strict';

/**
 * @ngdoc function
 * @name reviewAppApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reviewAppApp
 */
angular.module('reviewAppApp')
  .controller('AboutCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.restaurants = [];
    $scope.rest_id = $routeParams.restId;
    $http.get('../data/restaurant.json').success(function(data){
      var tmp = [];
       tmp = data.restaurants.filter((restaurant) => {
         debugger
          return (restaurant.restaurant.id == $scope.rest_id);
      });
      $scope.restaurants = tmp;
    });
  }]);
