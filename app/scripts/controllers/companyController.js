'use strict';

app.controller('CompanyCtrl', ['$scope', '$resource', 'Company', '$routeParams', '$window','$filter',
  function($scope, $resource, Company, $routeParams, $window, $filter) {

    $scope.successMsg = '';
    $scope.errorMsg = '';

    $scope.countries = [
        { name : 'Brazil',
          cities: ['Sao Paulo','Brasilia']
        },
        { name : 'Denmark',
          cities : ['Copenhage', 'Aarhus']
        }
    ];

    $scope.initCompany = function() {
      $scope.company = {
        id: '',
        name: '',
        address: '',
        city: '',
        country: '',
        email: '',
        employeeList: [],
        benefOwnerList: [],
        phoneNumber: ''
      }
    }

    $scope.setCities = function(country, resetCity){
        if(resetCity)
          $scope.company.city = '';
        if(country){
          $scope.cities = $filter('filter')($scope.countries, {name : country})[0].cities;
        }else {
          $scope.cities = '';
        }
    };

    if ($routeParams.idCompany) {
      Company.get({
          id: $routeParams.idCompany
        })
        .$promise.then(function(company) {
          $scope.company = company;
          $scope.setCities(company.country, false);
        });
    } else {
      $scope.initCompany();
    }

    $scope.removeCompany = function(id) {
      Company.delete({
        id: $scope.company.id
      }, function() {
        $scope.successMsg = "Company removed!!";
        $window.location.href = '#/list';
      }, function() {
        $scope.errorMsg = "Error removing Company!"
      });
    }

    $scope.contato = '';

    $scope.insertEmployee = function() {
      var newEmployee = {
        name: 'Teste',
        positionTitle: 'Posicao',
        department : 'departamento',
        salary : 'R$ 5000,00'
      }

      $scope.company.employeeList.push(newEmployee);
    }

    $scope.removeEmployee = function(employee) {
      var index = $scope.company.employeeList.indexOf(employee);
      $scope.company.employeeList.splice(index, 1);
    }

    $scope.saveCompany = function() {

      $scope.successMsg = '';
      $scope.errorMsg = '';

      var company = new Company($scope.company);

      company.$save()
        .then(function(res) {
          $scope.successMsg = "Company saved!";
          $scope.initCompany();
        })
        .catch(function(req) {
          $scope.errorMsg = "Error saving company;"
        });

      var element = $window.document.getElementById('header').scrollIntoView();

    }

  }

]);
