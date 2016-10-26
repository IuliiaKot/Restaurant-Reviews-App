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
    $scope.reviews = [];
    $scope.rest_id = $routeParams.restId;
    $http.get('../data/restaurant.json').success(function(data){
       $scope.restaurants = data.restaurants.filter((restaurant) => {
          return (restaurant.restaurant.id == $scope.rest_id);
      });
    });

    $http.get('../data/reviews.json').success(function(data){
      var tmp = [];
       tmp = data.reviews.filter((review) => {
          return (review.rest_id == $scope.rest_id);
      });
      $scope.reviews = tmp[0].user_reviews;
    });

    var my_rating_color = {'4': '5BA829', '5': '305D02', '3': 'CDD614', '2': 'FFBA00', '1': "CB202D"};
    $scope.submit = function(){
      var revierName = $scope.revierName;
      var rating = $scope.reviewStar;
      var review = $scope.review;
      $http.get('../data/reviews.json').success(function(data){
        var tmp = [];
         tmp = data.reviews.filter((review) => {
            return (review.rest_id == $scope.rest_id);
        });
        $scope.reviews = tmp[0].user_reviews;
        $scope.reviews.push({'review': {'rating': rating,
          'rating_color': my_rating_color[rating],
          'review_text':review,
          'timestamp': Date.now(),
          "user": {
            "name": revierName
          }}});
        debugger;
      });
    };

  }]);
