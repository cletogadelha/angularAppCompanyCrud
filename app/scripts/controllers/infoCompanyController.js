'use strict';

app.controller('InfoCompanyCtrl', ['$scope', '$resource', 'Company', '$routeParams', '$window',
  function($scope, $resource, Company, $routeParams, $window) {

    $scope.objFlow = {};

    $scope.iconeContato = '';

    $scope.successMsg = '';
    $scope.errorMsg = '';

    Company.get({
        id: $routeParams.idCompany
      })
      .$promise.then(function(company) {
        $scope.company = company;
      });

    $scope.removeCompany = function(id) {
      Company.delete({
        id: $scope.company.id
      }, function() {
        $scope.successMsg = "Company Removed!";
        $window.location.href = '#/list';
      }, function(){
        $scope.errorMsg = 'Error removing Company!';
      });
    }

  }
]);
