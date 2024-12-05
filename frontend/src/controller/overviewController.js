angular.module("myApp").controller("OverviewController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    // Inisialisasi summary, thisMonth, dan lastMonth
    $scope.summary = { accounts: [], total: 0 };
    $scope.total =
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

    // Fetch data dari API untuk accounts
    const userId = localStorage.getItem("id"); // Ganti dengan ID pengguna yang sesuai
    $scope.accounts = [];
    $http
      .get(`http://localhost:3000/api/accounts/${userId}`)
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

    // Data untuk creditCards (statis untuk saat ini)
    $scope.creditCards = [
      { name: "Credit Card", balance: -189.76, currency: "USD" },
    ];

    // Chart: This Month
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

    // Chart: Last Month
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

    const calculateBudgetData = (budget) => {
      const budgetAmount = parseFloat(budget.budget_amout);
      const usedAmount = parseFloat(budget.used_amout);
      const percent = ((usedAmount / budgetAmount) * 100).toFixed(2);
      const residual = (budgetAmount - usedAmount).toFixed(2);

      // Find the category by category_id
      const category = $scope.categories.find(c => c.category_id === budget.category_id);

      return {
        ...budget,
        percent: percent > 100 ? 100 : percent,
        residual: residual,
        category: category ? category.category_name : "Unknown", // Use category name or fallback to 'Unknown'
        icon: category ? category.category_icon : "shopping_cart", // Use category icon or fallback
      };
    };

    // Fetch categories
    $http.get("http://localhost:3000/api/category/").then(
      (response) => {
        $scope.categories = response.data; // Save the categories
        // After fetching categories, get the budgets
        $http.get("http://localhost:3000/api/budgets/").then(
          (response) => {
            const budgets = response.data.map(calculateBudgetData);
            $scope.weeklyBudgets = budgets.filter((b) => b.period === "weekly");
            $scope.monthlyBudgets = budgets.filter((b) => b.period === "monthly");
            $scope.allBudgets = budgets; // Combine all budgets
          },
          (error) => {
            console.error("Failed to fetch budgets", error);
          }
        );
      },
      (error) => {
        console.error("Failed to fetch categories", error);
      }
    );

  },
]);
