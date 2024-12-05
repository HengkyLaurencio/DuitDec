angular.module("myApp").controller("OverviewController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.summary = { accounts: [], total: 0 };
    const userId = localStorage.getItem("id");

    $scope.thisMonth = { income: 0, outcome: 0, total: 0 };
    $scope.lastMonth = { income: 0, outcome: 0, total: 0 };

    let thisMonthChart, lastMonthChart;

    function initializeCharts() {
      const thisMonthCtx = document
        .getElementById("chart-this-month")
        .getContext("2d");
      thisMonthChart = new Chart(thisMonthCtx, {
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
      lastMonthChart = new Chart(lastMonthCtx, {
        type: "pie",
        data: {
          labels: ["Income", "Outcome"],
          datasets: [
            {
              label: "Last Month",
              data: [$scope.lastMonth.income, $scope.lastMonth.outcome],
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
    }

    function updateCharts() {
      thisMonthChart.data.datasets[0].data = [
        $scope.thisMonth.income,
        $scope.thisMonth.outcome,
      ];
      thisMonthChart.update();

      lastMonthChart.data.datasets[0].data = [
        $scope.lastMonth.income,
        $scope.lastMonth.outcome,
      ];
      lastMonthChart.update();
    }

    initializeCharts();

    $scope.$watch(
      "thisMonth",
      function (newVal, oldVal) {
        if (newVal !== oldVal) {
          updateCharts();
        }
      },
      true
    );

    $scope.$watch(
      "lastMonth",
      function (newVal, oldVal) {
        if (newVal !== oldVal) {
          updateCharts();
        }
      },
      true
    );

    $http
      .get("http://localhost:3000/api/transactions/${userId}")
      .then((response) => {
        const transactions = response.data.transactions;

        const now = new Date();
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(thisMonthStart.getTime() - 1);

        const thisMonthTransactions = transactions.filter((t) => {
          const date = new Date(t.date);
          return date >= thisMonthStart && date <= now;
        });

        const lastMonthTransactions = transactions.filter((t) => {
          const date = new Date(t.date);
          return date >= lastMonthStart && date <= lastMonthEnd;
        });

        const calculateTotals = (filteredTransactions) => {
          const income = filteredTransactions
            .filter((t) => t.transaction_type === "income")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

          const outcome = filteredTransactions
            .filter((t) => t.transaction_type === "outcome")
            .reduce((sum, t) => sum + parseFloat(t.amount), 0);

          return { income, outcome, total: income - outcome };
        };

        $scope.thisMonth = calculateTotals(thisMonthTransactions);
        $scope.lastMonth = calculateTotals(lastMonthTransactions);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });


    $scope.accounts = [];
    $http
      .get("http://localhost:3000/api/accounts/${userId}")
      .then((response) => {
        if (response.data && response.data.accounts) {
          $scope.accounts = response.data.accounts.map((account) => ({
            name: account.account_name,
            balance: parseFloat(account.balance),
          }));

          $scope.summary.total = parseFloat(response.data.total);
        }
      })
      .catch((error) => {
        console.error("Error fetching accounts:", error);
      });

    $scope.creditCards = [
      { name: "Credit Card", balance: -189.76, currency: "USD" },
    ];

  },
]);