angular.module("myApp").controller("OverviewController", [
  "$scope",
  function ($scope) {
    $scope.summary = {
      balance: 999999.12,
      creditCards: -11111.11,
      total: 123123.12 - 11111.11,
    };
    $scope.thisMonth = {
      income: 1500.0,
      outcome: 396.76,
      total: 1500.0 - 396.76,
    };
    $scope.lastMonth = {
      income: 1500.0,
      outcome: 396.76,
      total: 1500.0 - 396.76,
    };

   
    const thisMonthCtx = document
      .getElementById("chart-this-month")
      .getContext("2d");
    new Chart(thisMonthCtx, {
      type: "pie",
      data: {
        labels: ["Income", "Outcome"],
        datasets: [
          {
            label: "This Month",
            data: [$scope.thisMonth.income, $scope.thisMonth.outcome],
            backgroundColor: ["#10b981", "#ef4444"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, 
          },
        },
      },
    });

    const lastMonthCtx = document
      .getElementById("chart-last-month")
      .getContext("2d");
    new Chart(lastMonthCtx, {
      type: "pie",
      data: {
        labels: ["Income", "Outcome"],
        datasets: [
          {
            label: "Last Month",
            data: [$scope.lastMonth.income, $scope.lastMonth.outcome],
            backgroundColor: ["#10b981", "#ef4444"], // Green and red
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, 
          },
        },
      },
    });

    $scope.accounts = [
      { name: "Wallet", balance: 90.24, currency: "USD" },
      { name: "Bank Account", balance: 13534.24, currency: "USD" },
    ];

    $scope.creditCards = [
      { name: "Credit Card", balance: -189.76, currency: "USD" },
    ];

  },
]);
