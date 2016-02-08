'use strict';

app.factory('Company', ['$resource',function ($resource) {
  return $resource("https://springwscompanycrud.herokuapp.com/rest/company/:id", {id: "@idCompany"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
