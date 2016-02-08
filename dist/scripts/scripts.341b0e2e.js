"use strict";var app=angular.module("angularSpringApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/list",{templateUrl:"views/companyList.html",controller:"ListCtrl"}).when("/company",{templateUrl:"views/companyView.html",controller:"CompanyCtrl"}).when("/editCompany/:idCompany",{templateUrl:"views/companyView.html",controller:"CompanyCtrl"}).when("/company/:idCompany",{templateUrl:"views/infoColaboradorView.html",controller:"InfoCompanyCtrl"}).otherwise({redirectTo:"/"})}]);app.controller("ListCtrl",["$scope","$resource","Company",function(a,b,c){c.query(function(b){a.companies=b})}]),app.controller("CompanyCtrl",["$scope","$resource","Company","$routeParams","$window","$filter",function(a,b,c,d,e,f){a.successMsg="",a.errorMsg="",a.countries=[{name:"Brazil",cities:["Sao Paulo","Brasilia"]},{name:"Denmark",cities:["Copenhage","Aarhus"]}],a.initCompany=function(){a.company={id:"",name:"",address:"",city:"",country:"",email:"",employeeList:[],benefOwnerList:[],phoneNumber:""}},a.setCities=function(b,c){c&&(a.company.city=""),b?a.cities=f("filter")(a.countries,{name:b})[0].cities:a.cities=""},d.idCompany?c.get({id:d.idCompany}).$promise.then(function(b){a.company=b,a.setCities(b.country,!1)}):a.initCompany(),a.removeCompany=function(b){c["delete"]({id:a.company.id},function(){a.successMsg="Company removed!!",e.location.href="#/list"},function(){a.errorMsg="Error removing Company!"})},a.contato="",a.insertEmployee=function(){var b={name:"Teste",positionTitle:"Posicao",department:"departamento",salary:"R$ 5000,00"};a.company.employeeList.push(b)},a.removeEmployee=function(b){var c=a.company.employeeList.indexOf(b);a.company.employeeList.splice(c,1)},a.saveCompany=function(){a.successMsg="",a.errorMsg="";var b=new c(a.company);b.$save().then(function(b){a.successMsg="Company saved!",a.initCompany()})["catch"](function(b){a.errorMsg="Error saving company;"});e.document.getElementById("header").scrollIntoView()}}]),app.controller("InfoCompanyCtrl",["$scope","$resource","Company","$routeParams","$window",function(a,b,c,d,e){a.objFlow={},a.iconeContato="",a.successMsg="",a.errorMsg="",c.get({id:d.idCompany}).$promise.then(function(b){a.company=b}),a.removeCompany=function(b){c["delete"]({id:a.company.id},function(){a.successMsg="Company Removed!",e.location.href="#/list"},function(){a.errorMsg="Error removing Company!"})}}]),app.controller("LoginCtrl",["$scope","$resource","$window",function(a,b,c){a.errorMsg="",a.login=function(){"admin"!=this.user||"admin"!=this.password?a.errorMsg="Bad Credentials!":c.location.href="#/list"},hello.init({facebook:"592719450881848",google:"303009781610-93cpn0ek7onq33b3r1cj5oi4e3o58quf.apps.googleusercontent.com"}),a.loginFacebook=function(){hello("facebook").login().then(function(){c.location.href="#/list"},function(b){a.errorMsg=b.error.message})},a.loginGoogle=function(){hello("google").login().then(function(){c.location.href="#/list"},function(b){a.errorMsg=b.error.message})}}]),app.factory("Company",["$resource",function(a){return a("http://localhost:8080/rest/company/:id",{id:"@idCompany"},{update:{method:"PUT"}})}]),angular.module("angularSpringApp").run(["$templateCache",function(a){a.put("views/companyList.html",'<!DOCTYPE html> <body class="skin-blue" ng-controller="ListCtrl"> <section class="content"> <div id="divMsg"> <div class="alert alert-success" ng-show="successMsg"> {{successMsg}} </div> <div class="alert alert-danger" ng-show="errorMsg"> {{errorMsg}} </div> </div> <div class="row form-group"> <p align="right"> <h1 style="float: left">Companies</h1> <a style="float: right; position: relative; top: 30px" class="pull-rigth glyphicon glyphicon-plus btn btn-primary" ng-href="#/company"> New </a> </p> <input class="form-control" ng-model="filterCompany" type="search" placeholder="Search by Company\'s Name"> </div> <br> <div ng-init="limit = 10"> <div class="col-lg-6 col-xs-6" ng-repeat="company in companies\r\n                                                      | filter: {name : filterCompany}\r\n                                                      | limitTo: limit as results\r\n                                                  "> <!-- small box --> <div class="small-box bg-aqua"> <div class="icon"> <i class="fa fa-tasks"></i> </div> <div class="inner"> <h2>{{company.name}}</h2> <p>Employees: {{company.employeeList.length}}</p> </div> <a class="small-box-footer" ng-href="#/company/{{company.id}}"> More Information <i class="fa fa-arrow-circle-right"></i> </a> </div> </div> <!-- ./col --> </div> <div class="row" ng-hide="results.length === companies.length || filterCompany.length > 0"> <center> <a class="btn btn-circle btn-primary" ng-click="limit = limit+10">More</a> </center> </div> </section> </body>'),a.put("views/companyView.html",'<!DOCTYPE html> <body ng-controller="CompanyCtrl"> <h1 class="text-center">Company</h1> <form name="formCompany" ng-submit="saveCompany()"> <div id="divMsg"> <div class="alert alert-success" ng-show="successMsg"> {{successMsg}} </div> <div class="alert alert-danger" ng-show="errorMsg"> {{errorMsg}} </div> </div> <button class="fa fa-check btn btn-primary pull-right" type="submit"> Save </button> <a style="cursor: pointer; text-decoration: none !important" class="fa fa-arrow-left fa-2x pull-left" ng-href="#/list" title="Back" type="button"></a>   <!-- COMPANY NAME --> <div class="form-group"> <input class="form-control" id="name" placeholder="Name" required name="name" ng-model="company.name" type="text"> </div> <!-- /COMPANY NAME --> <!-- COMPANY ADDRESS --> <div class="form-group"> <input class="form-control" id="address" placeholder="Address" required name="address" ng-model="company.address" type="text"> </div> <!-- /COMPANY ADDRESS --> <!-- COMPANY COUNTRY--> <div class="form-group"> <select class="form-control" name="country" id="countrySelect" ng-model="company.country" ng-change="setCities(company.country, true)" required> <option value="">Select the Country</option> <option ng-repeat="country in countries" value="{{country.name}}">{{country.name}}</option> </select> </div> <!-- /COMPANY COUNTRY --> <!-- COMPANY CITY--> <div class="form-group"> <select class="form-control" name="city" id="citySelect" ng-model="company.city" required> <option value>Select the City</option> <option ng-repeat="city in cities" value="{{city}}">{{city}}</option> </select> </div> <!-- /COMPANY CITY --> <!-- COMPANY EMAIL--> <div class="form-group"> <input class="form-control" type="email" id="email" placeholder="E-mail" name="email" ng-model="company.email"> <div ng-show="formCompany.email.$error.email"> <span style="color:red">Error: Enter a valid email address </span> </div> </div> <!-- /COMPANY EMAIL --> <!-- COMPANY PHONENUMBER --> <div class="form-group"> <input class="form-control" id="phoneNumber" placeholder="Phone Number" required name="phoneNumber" ng-model="company.phoneNumber" type="text"> </div> <!-- /COMPANY PHONENUMBER --> <!-- COMPANY EMPLOYEES --> <div class="form-group"> <div class="form-inline"> <label style="font-size: 200%" for="employees">Employees</label> <input value="New Employee" type="button" class="pull-right btn btn-warning" ng-click="insertEmployee()"> </div> <br><br> <div ng-show="company.employeeList.length"> <table class="table table-striped"> <thead> <tr> <td> <b>Name</b> </td> <td> <b>Position Title</b> </td> <td> <b>Department</b> </td> <td> <b>Salary</b> </td> </tr> </thead> <tbody> <tr ng-repeat="employee in company.employeeList"> <td>{{ employee.name }}</td> <td>{{ employee.positionTitle }}</td> <td>{{ employee.department }}</td> <td>{{ employee.salary }}</td> <td> <button class="pull-right fa fa-times" ng-click="removeEmployee(employee)"></button> </td> </tr> </tbody> </table> </div> </div> <!-- /COMPANY EMPLOYEES --> </form> </body>'),a.put("views/infoColaboradorView.html",'<!DOCTYPE html> <body ng-controller="InfoCompanyCtrl"> <h1 class="text-center">Company</h1> <form name="formInfoCompany"> <div id="divMsg"> <div class="alert alert-success" ng-show="successMsg"> {{successMsg}} </div> <div class="alert alert-danger" ng-show="errorMsg"> {{errorMsg}} </div> </div> <a style="cursor: pointer; text-decoration: none !important" class="fa fa-pencil fa-2x pull-right" title="Edit Company" ng-href="#/editCompany/{{company.id}}" type="button"></a> <a style="cursor: pointer; text-decoration: none !important" class="fa fa-trash-o fa-2x pull-right" ng-click="removeCompany(company.id)" title="Remove Company" type="button"></a> <a style="cursor: pointer; text-decoration: none !important" class="fa fa-arrow-left fa-2x pull-right" ng-href="#/list" title="Back" type="button"></a>   <!-- COMPANY NAME --> <div class="form-group"> <input class="form-control" disabled id="name" name="name" ng-model="company.name" type="text"> </div> <!-- /COMPANY NAME --> <!-- COMPANY ADDRESS--> <div class="form-group"> <input class="form-control" disabled id="address" name="address" ng-model="company.address" type="text"> </div> <!-- /COMPANY ADDRESS --> <!-- COMPANY COUNTRY --> <div class="form-group"> <input class="form-control" disabled id="country" name="country" ng-model="company.country" type="text"> </div> <!-- /COMPANY COUNTRY --> <!-- COMPANY CITY --> <div class="form-group"> <input class="form-control" disabled id="city" name="city" ng-model="company.city" type="text"> </div> <!-- /COMPANY CITY --> <!-- COMPANY EMAIL --> <div class="form-group"> <input class="form-control" disabled id="email" name="email" ng-model="company.email" type="text"> </div> <!-- /COMPANY EMAIL --> <!-- COMPANY PHONENUMBER --> <div class="form-group"> <input class="form-control" disabled id="phoneNumber" name="phoneNumber" ng-model="company.phoneNumber" type="text"> </div> <!-- /COMPANY PHONENUMBER --> <!-- contatos COLABORADOR --> <div class="row"> <div class="form-group"> <label for="employess">Employees</label> <br> <br> <span class="col-lg-6" ng-repeat="employee in company.employeeList"> <span style="padding: 10px">{{ employee.name }}</span> </span> </div> </div> <!-- /contatos COLABORADOR --> </form> </body>'),a.put("views/login.html",'<!DOCTYPE html> <body class="bg-black" ng-controller="LoginCtrl"> <div id="divMsg"> <div class="alert alert-danger" ng-show="errorMsg"> {{errorMsg}} </div> </div> <div class="form-box" id="login-box"> <div class="header">Login</div> <form> <div class="body bg-gray"> <div class="form-group"> <input type="text" name="userid" ng-model="user" class="form-control" placeholder="User" required> </div> <div class="form-group"> <input type="password" name="password" ng-model="password" class="form-control" placeholder="Password" required> </div> </div> <div class="footer"> <button ng-click="login()" class="btn bg-olive btn-block">Connect</button> </div> </form> <div class="margin text-center"> <span>Login using your social network</span> <br> <button class="btn bg-light-blue btn-circle" ng-click="loginFacebook()"> <i class="fa fa-facebook"></i> </button> <button class="btn bg-red btn-circle" ng-click="loginGoogle()"> <i class="fa fa-google-plus"></i> </button> </div> </div> </body>')}]);