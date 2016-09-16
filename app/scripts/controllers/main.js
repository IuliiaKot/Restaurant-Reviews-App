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
    $scope.title = 'reviewApp'
    $scope.findPlace = function(){
      $http.get('')
    }
  });
