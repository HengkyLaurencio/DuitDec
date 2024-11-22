angular.module("myApp").controller("DashboardController", [
  "$scope",
  "$http",
  "$location",
  function ($scope, $http, $location) {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert(`Session has ended! Please login again.`);
      $location.path("/login");
      return;
    }
    const id = localStorage.getItem("id");
    $http.get(`http://localhost:3000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(function (response) {
        $scope.profile = {
          name: response.data.username,
          email: response.data.email,
        };

        $scope.menus = [
          { name: "Overview", icon: "overview", link: "dashboard/overview" },

          {
            name: "Transaction",
            icon: "list",
            link: "/dashboard/transactions",
          },
          {
            name: "Accounts",
            icon: "account_balance",
            link: "/dashboard/accounts",
          },
          {
            name: "Credit Cards",
            icon: "credit_card",
            link: "/dashboard/creditcards",
          },
          { name: "Budgets", icon: "timelapse", link: "/dashboard/budgets" },
          { name: "Debts", icon: "timer", link: "/dashboard/debts" },
          ];

        $scope.accountMenus = [
          { name: "Settings", icon: "settings", link: "/dashboard/settings" },
        ];
      })
      .catch(function (error) {
        alert(`Get id error! ${error}`);
        // $location.path("/login"); 
      });

      $scope.logout = function () {
         localStorage.removeItem("authToken");
         localStorage.removeItem("id");
         $location.path("/login");
      };
  },
]);
