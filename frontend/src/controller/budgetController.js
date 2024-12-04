angular.module("myApp").controller("BudgetController", function ($scope, $http) {
    $scope.weeklyBudgets = [];
    $scope.monthlyBudgets = [];
    $scope.categories = [];
    var userId = localStorage.getItem("id");
  
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
        category: category ? category.category_name : "Unknown",  // Use category name or fallback to 'Unknown'
        icon: category ? category.category_icon : "shopping_cart",  // Use category icon or fallback
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

    // Open modal
  $scope.openAddModal = function () {
    $scope.showModal = true;
  };

  // Close modal
  $scope.closeModal = function () {
    $scope.showModal = false;
  };

  // Submit new budget
  $scope.submitBudget = function () {
    $scope.newBudget.user_id = userId;
    $http.post("http://localhost:3000/api/budgets/", $scope.newBudget).then(
      (response) => {
        console.log("Budget added successfully", response.data);
        $scope.closeModal();
        // Optionally reload budgets or perform other actions
      },
      (error) => {
        console.error("Failed to add budget", error);
      }
    );
  };
  });
  