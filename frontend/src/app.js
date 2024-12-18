var app = angular.module("myApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise("/home");

  $stateProvider
    .state("home", {
      url: "/home",
      templateUrl: "views/home.html",
      controller: "HomeController",
    })
    .state("about", {
      url: "/about",
      templateUrl: "views/about.html",
      controller: "AboutController",
    })
    .state("login", {
      url: "/login",
      templateUrl: "views/login.html",
      controller: "LoginController",
    })
    .state("register", {
      url: "/register",
      templateUrl: "views/register.html",
      controller: "RegisterController",
    })
    .state("transaction", {
      url: "/transaction",
      templateUrl: "views/transaction.html",
      controller: "TransactionController",
    })
    .state("dashboard", {
      url: "/dashboard",
      templateUrl: "views/dashboard.html",
      controller: "DashboardController",
      abstract: true,
    })
    .state("dashboard.overview", {
      url: "/overview",
      views: {
        "content@dashboard": {
          templateUrl: "views/overview.html",
          controller: "OverviewController",
        },
      },
    })
    .state("dashboard.transactions", {
      url: "/transactions",
      views: {
        "content@dashboard": {
          templateUrl: "views/transaction.html",
          controller: "transactionsController",
        },
      },
    })
    .state("dashboard.accounts", {
      url: "/accounts",
      views: {
        "content@dashboard": {
          templateUrl: "views/accounts.html",
          controller: "accountsController",
        },
      },
    })
    .state("dashboard.settings", {
      url: "/settings",
      views: {
        "content@dashboard": {
          templateUrl: "views/settings.html",
          controller: "settingsController",
        },
      },
    })
    .state("dashboard.budgets", {
      url: "/budgets",
      views: {
        "content@dashboard": {
          templateUrl: "views/budget.html",
          controller: "BudgetController",
        },
      },
    })
    .state("dashboard.debts", {
      url: "/debts",
      views: {
        "content@dashboard": {
          templateUrl: "views/debt.html",
          controller: "debtController",
        },
      },
    })
    .state("dashboard.profile", {
      url: "/profile",
      views: {
        "content@dashboard": {
          templateUrl: "views/profile.html",
          controller: "profileController",
        },
      },
    })
});