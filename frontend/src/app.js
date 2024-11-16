var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        });
});

app.controller('HomeController', function ($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

app.controller('AboutController', function ($scope) {
    $scope.message = 'This is the About Page!';
});
