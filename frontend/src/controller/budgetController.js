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
        $scope.refreshData()
        $scope.closeModal();
      },
      (error) => {
        console.error("Failed to add budget", error);
      }
    );
  };

  $scope.openEditModal = function (budget) {
    $scope.editBudget = angular.copy(budget);
    
    $scope.editBudget.budget_amout = parseFloat($scope.editBudget.budget_amout);
    $scope.editBudget.used_amout = parseFloat($scope.editBudget.used_amout);
    $scope.editBudget.start_date = new Date($scope.editBudget.start_date);

    $scope.showEditModal = true;
};


  // Close edit modal
  $scope.closeEditModal = function () {
    $scope.showEditModal = false;
  };

  // Update budget
  $scope.updateBudget = function () {
    const budgetId = $scope.editBudget.budget_id; // Assuming budget has an ID field
    $http.put(`http://localhost:3000/api/budgets/${budgetId}`, $scope.editBudget).then(
      (response) => {
        console.log("Budget updated successfully", response.data);
        $scope.closeEditModal();
        $scope.refreshData()
      },
      (error) => {
        console.error("Failed to update budget", error);
      }
    );
  };

  $scope.removeBudget = function (budgetId) {
  
    $http.delete(`http://localhost:3000/api/budgets/${budgetId}`).then(
      (response) => {
        console.log("Budget removed successfully", response.data);
        
        $scope.refreshData()
      },
      (error) => {
        console.error("Failed to remove budget", error);
      }
    );
  };

  $scope.refreshData = function () {
    $http.get("http://localhost:3000/api/budgets/").then(
          (response) => {
            const budgets = response.data.map(calculateBudgetData);
            $scope.weeklyBudgets = budgets.filter((b) => b.period === "weekly");
            $scope.monthlyBudgets = budgets.filter((b) => b.period === "monthly");
          },
          (error) => {
            console.error("Failed to refresh budgets", error);
          }
        );
  }
});
