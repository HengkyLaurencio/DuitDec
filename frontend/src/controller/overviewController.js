angular.module("myApp").controller("OverviewController", [
  "$scope",
  function ($scope) {
    // Summary data
    $scope.summary = {
      balance: 999999.12,
      creditCards: -11111.11,
      total: 123123.12 - 11111.11,
    };

    // This month's data
    $scope.thisMonth = {
      income: 1500.0,
      outcome: 396.76,
      total: 1500.0 - 396.76,
    };

    // Last month's data
    $scope.lastMonth = {
      income: 1500.0,
      outcome: 396.76,
      total: 1500.0 - 396.76,
    };

    // Donut chart for this month
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
            backgroundColor: ["#10b981", "#ef4444"], // Green and red
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false, // Hides the legend
          },
        },
      },
    });

    // Donut chart for last month
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
            display: false, // Hides the legend
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
