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

    function helper(cuisine, star){
      $http.get('../data/restaurant.json').success(function(data){
        var tmp = [];
         tmp = data.restaurants.filter((restaurant) => {
          if (star === 5){
            return (restaurant.restaurant.cuisines.includes(cuisine) && (restaurant.restaurant.user_rating.aggregate_rating == star));
          } else {
            return (restaurant.restaurant.cuisines.includes(cuisine) && (restaurant.restaurant.user_rating.aggregate_rating >= star && restaurant.restaurant.user_rating.aggregate_rating < (star + 1)));
          }
        });
        $scope.restaurants = tmp;
      });
    }

    $scope.findPlace = function(){
      var inputValueCuisine = ($scope.selectedItem ? $scope.selectedItem.name : "");
      var selectedStar = parseInt($scope.selectedStar ? $scope.selectedStar : 0);
      var inputStar = $scope.selectedStar;
      if (inputValueCuisine !== 'All'){
        if (selectedStar >=1 && selectedStar <= 5) {
          helper(inputValueCuisine, selectedStar);
        }
        else {
          $http.get('../data/restaurant.json').success(function(data){
            $scope.restaurants = data.restaurants.filter((restaurant) => {
              return restaurant.restaurant.cuisines.includes(inputValueCuisine);
            });
          });
        }

      }

      else {
        $http.get('../data/restaurant.json').success(function(data){
          $scope.restaurants = data.restaurants;
          $scope.cuisines = (data.restaurants.map(function(restaurant){
            return {id: restaurant.restaurant.id, name: restaurant.restaurant.cuisines};
          }));
          $scope.cuisines.push({id: 1, name: 'All'});
        });
      }
      // return $scope.restaurants;
    };

  }]);
