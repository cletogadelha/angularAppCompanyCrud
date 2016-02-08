'use strict';

app.factory('Company', ['$resource',function ($resource) {
  return $resource("//springwscompanycrud.herokuapp.com/rest/company/:id", {id: "@idCompany"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
