angular.module("myApp").controller("DashboardController", [
  "$scope",
  "$http",
  "$location",
  "$rootScope",
  function ($scope, $http, $location, $rootScope) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert(`Session has ended! Please login again.`);
      $location.path("/login");
      return;
    }
    const id = localStorage.getItem("id");
    $http
      .get(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        $scope.profile = {
          name: response.data.username,
          email: response.data.email,
          image: response.data.image,
        };

        $scope.menus = [
          {
            name: "Overview",
            icon: "overview",
            link: "dashboard/overview",
            data: {
              title: "Overview",
            },
          },
          {
            name: "Transaction",
            icon: "list",
            link: "/dashboard/transactions",
            data: {
              title: "Transaction",
            },
          },
          {
            name: "Accounts",
            icon: "account_balance",
            link: "/dashboard/accounts",
            data: {
              title: "Accounts",
            },
          },
          {
            name: "Credit Cards",
            icon: "credit_card",
            link: "/dashboard/creditcards",
            data: {
              title: "Credit Cards",
            },
          },
          {
            name: "Budgets",
            icon: "timelapse",
            link: "/dashboard/budgets",
            data: {
              title: "Budgets",
            },
          },
          {
            name: "Debts",
            icon: "timer",
            link: "/dashboard/debts",
            data: {
              title: "Debts",
            },
          },
        ];

        $scope.accountMenus = [
          { name: "Settings", icon: "settings", link: "/dashboard/settings" },
        ];

        // Update pageTitle based on the current route
        const currentPath = $location.path();
        const currentMenu = $scope.menus.find((menu) =>
          currentPath.includes(menu.link)
        );
        if (currentMenu) {
          $scope.pageTitle = currentMenu.data.title;
        } else {
          $scope.pageTitle = "Dashboard";
        }
      })
      .catch(function (error) {
        alert(`Get id error! ${error}`);
      });

    $scope.logout = function () {
      localStorage.removeItem("authToken");
      localStorage.removeItem("id");
      $location.path("/login");
    };

    // Watch for location change and update pageTitle accordingly
    $scope.$on("$locationChangeSuccess", function () {
      const currentPath = $location.path();
      const currentMenu = $scope.menus.find((menu) =>
        currentPath.includes(menu.link)
      );
      if (currentMenu) {
        $scope.pageTitle = currentMenu.data.title;
      }
    });
  },
]);
