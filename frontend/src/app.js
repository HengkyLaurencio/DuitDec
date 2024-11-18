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
        })
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController',
            abstract: true 
        })
        .state('dashboard.overview', {
            url: '/overview',
            views: {
                'content@dashboard': {  
                    templateUrl: 'views/overview.html',
                    controller: 'OverviewController'
                }
            }
        });
});

app.controller('HomeController', function ($scope) {
    $scope.message = 'Welcome to the Home Page!';
});

app.controller('AboutController', function ($scope) {
    $scope.message = 'This is the About Page!';
});

app.controller('DashboardController', function ($scope) {
    $scope.message = 'Welcome to the Dashboard!';
});

app.controller('OverviewController', function ($scope) {
    $scope.message = 'Here is the Overview of your financial data!';
});
