'use strict';


app.controller('ListCtrl', ['$scope', '$resource', 'Company',
  function($scope, $resource, Company) {

    Company.query(function(companies) {
      $scope.companies = companies;
    });

  }
]);
