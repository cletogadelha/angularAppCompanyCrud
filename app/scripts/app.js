'use strict';

/**
 * @ngdoc overview
 * @name angularSpringApp
 * @description
 * # angularSpringApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angularSpringApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/list', {
        templateUrl: 'views/companyList.html',
        controller: 'ListCtrl'
      })
      .when('/colaborador', {
        templateUrl: 'views/companyView.html',
        controller: 'CompanyCtrl'
      })
      .when('/editarColab/:idColab', {
        templateUrl: 'views/companyView.html',
        controller: 'CompanyCtrl'
      })
      .when('/colaborador/:idColab', {
        templateUrl: 'views/infoColaboradorView.html',
        controller: 'InfoColabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
