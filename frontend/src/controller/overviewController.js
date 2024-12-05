angular.module("myApp").controller("OverviewController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    // Inisialisasi summary, thisMonth, dan lastMonth
    $scope.summary = { accounts: [], total: 0 };
    const userId = localStorage.getItem("id");
    $scope.thisMonth = { income: 0, outcome: 0, total: 0 };
    $scope.lastMonth = { income: 0, outcome: 0, total: 0 };
    $scope.accounts = [];
    $scope.creditCards = [{ name: "Credit Card", balance: -189.76, currency: "USD" }];
    let thisMonthChart, lastMonthChart;

    // Fungsi untuk menginisialisasi chart
    function initializeChart(ctx, label, data) {
      return new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Income", "Outcome"],
          datasets: [
            {
              label,
              data,
              backgroundColor: ["#10b981", "#ef4444"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    function initializeCharts() {
      const thisMonthCtx = document.getElementById("chart-this-month").getContext("2d");
      const lastMonthCtx = document.getElementById("chart-last-month").getContext("2d");
      thisMonthChart = initializeChart(thisMonthCtx, "This Month", [$scope.thisMonth.income, $scope.thisMonth.outcome]);
      lastMonthChart = initializeChart(lastMonthCtx, "Last Month", [$scope.lastMonth.income, $scope.lastMonth.outcome]);
    }

    // Update data pada chart
    function updateCharts() {
      thisMonthChart.data.datasets[0].data = [$scope.thisMonth.income, $scope.thisMonth.outcome];
      thisMonthChart.update();
      lastMonthChart.data.datasets[0].data = [$scope.lastMonth.income, $scope.lastMonth.outcome];
      lastMonthChart.update();
    }

    // Watch untuk thisMonth dan lastMonth
    $scope.$watch("thisMonth", updateCharts, true);
    $scope.$watch("lastMonth", updateCharts, true);

    // Fetch transaksi dan perbarui thisMonth serta lastMonth
    $http.get(`http://localhost:3000/api/transactions/${userId}`).then((response) => {
      const transactions = response.data.transactions;
      const now = new Date();
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(thisMonthStart.getTime() - 1);

      const calculateTotals = (filteredTransactions) => {
        const income = filteredTransactions
          .filter((t) => t.transaction_type === "income")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        const outcome = filteredTransactions
          .filter((t) => t.transaction_type === "outcome")
          .reduce((sum, t) => sum + parseFloat(t.amount), 0);
        return { income, outcome, total: income - outcome };
      };

      $scope.thisMonth = calculateTotals(
        transactions.filter((t) => {
          const date = new Date(t.date);
          return date >= thisMonthStart && date <= now;
        })
      );

      $scope.lastMonth = calculateTotals(
        transactions.filter((t) => {
          const date = new Date(t.date);
          return date >= lastMonthStart && date <= lastMonthEnd;
        })
      );
    });

    // Fetch data accounts
    $http.get(`http://localhost:3000/api/accounts/${userId}`).then((response) => {
      if (response.data && response.data.accounts) {
        $scope.accounts = response.data.accounts.map((account) => ({
          name: account.account_name,
          balance: parseFloat(account.balance),
        }));
        $scope.summary.total = parseFloat(response.data.total);
      }
    });

    // Fetch categories dan budgets
    function calculateBudgetData(budget) {
      const budgetAmount = parseFloat(budget.budget_amout);
      const usedAmount = parseFloat(budget.used_amout);
      const percent = ((usedAmount / budgetAmount) * 100).toFixed(2);
      const residual = (budgetAmount - usedAmount).toFixed(2);
      const category = $scope.categories.find((c) => c.category_id === budget.category_id);

      return {
        ...budget,
        percent: percent > 100 ? 100 : percent,
        residual,
        category: category ? category.category_name : "Unknown",
        icon: category ? category.category_icon : "shopping_cart",
      };
    }

    $http.get("http://localhost:3000/api/category/").then((response) => {
      $scope.categories = response.data;
      $http.get("http://localhost:3000/api/budgets/").then((response) => {
        const budgets = response.data.map(calculateBudgetData);
        $scope.weeklyBudgets = budgets.filter((b) => b.period === "weekly");
        $scope.monthlyBudgets = budgets.filter((b) => b.period === "monthly");
        $scope.allBudgets = budgets;
      });
    });

    // Inisialisasi chart setelah data di-load
    initializeCharts();
  },
]);
