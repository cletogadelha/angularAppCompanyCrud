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
      .when('/company', {
        templateUrl: 'views/companyView.html',
        controller: 'CompanyCtrl'
      })
      .when('/editCompany/:idCompany', {
        templateUrl: 'views/companyView.html',
        controller: 'CompanyCtrl'
      })
      .when('/company/:idCompany', {
        templateUrl: 'views/infoCompanyView.html',
        controller: 'InfoCompanyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
