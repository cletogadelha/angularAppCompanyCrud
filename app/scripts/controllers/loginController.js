'use strict';

app.controller('LoginCtrl', ['$scope', '$resource', '$window',
  function($scope, $resource, $window) {

    $scope.errorMsg = '';

    $scope.login = function() {
      if (this.user != "admin" || this.password != "admin") {
        $scope.errorMsg = 'Bad Credentials!';
      } else {
        $window.location.href = '#/list';
      }
    }

    hello.init({
      facebook: '592719450881848',
      google: '303009781610-93cpn0ek7onq33b3r1cj5oi4e3o58quf.apps.googleusercontent.com'
    })

    $scope.loginFacebook = function() {
      hello('facebook').login().then(function() {
        $window.location.href = '#/list';
      }, function(e) {
          $scope.errorMsg = e.error.message;
      });
    }

    $scope.loginGoogle = function() {
      hello('google').login().then(function() {
        $window.location.href = '#/list';
      }, function(e) {
        $scope.errorMsg = e.error.message;
      });
    }

  }
]);
