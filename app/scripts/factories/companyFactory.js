'use strict';

app.factory('Company', ['$resource',function ($resource) {
  return $resource("http://localhost:8080/rest/company/:id", {id: "@idCompany"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
