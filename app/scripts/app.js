'use strict';

/**
 * @ngdoc overview
 * @name reviewAppApp
 * @description
 * # reviewAppApp
 *
 * Main module of the application.
 */
angular
  .module('reviewAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/:restId/reviews', {
        templateUrl: 'views/review.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
