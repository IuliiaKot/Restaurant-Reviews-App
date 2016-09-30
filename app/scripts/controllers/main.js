'use strict';

/**
 * @ngdoc function
 * @name reviewAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reviewAppApp
 */
angular.module('reviewAppApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.restaurants = [];
    $scope.cuisines = [];
    $scope.restaurantsByFilter = [];

    function fetchData(){
      $http.get('../data/restaurant.json').success(function(data){
        $scope.restaurants = data.restaurants;
        console.log(data.restaurants);
        $scope.cuisines = (data.restaurants.map(function(restaurant){
          return {id: restaurant.restaurant.id, name: restaurant.restaurant.cuisines};
        }));
        $scope.cuisines.push({id: 1, name: 'All'});
      });
    }
    fetchData();
    $scope.title = 'reviewApp';

    $scope.findPlace = function(name){
      var inputValueCuisine = ($scope.selectedItem ? $scope.selectedItem.name : "");
      var inputStar = $scope.selectedStar;
      if (inputValueCuisine !== 'All' ){
        $http.get('../data/restaurant.json').success(function(data){
          $scope.restaurants = data.restaurants.filter((restaurant) => {
            return restaurant.restaurant.cuisines.includes(inputValueCuisine);
          });
        });
      } else {
        $http.get('../data/restaurant.json').success(function(data){
          $scope.restaurants = data.restaurants;
          $scope.cuisines = (data.restaurants.map(function(restaurant){
            return {id: restaurant.restaurant.id, name: restaurant.restaurant.cuisines}
          }))
          $scope.cuisines.push({id: 1, name: 'All'});
        });
      }
      // return $scope.restaurants;
    };
  }]);
