angular.module("myApp").controller("transactionsController", [
  "$scope", "$http",
  function ($scope, $http) {
    // Initialize transactions and totals
    $scope.transactionsToShow = [];
    $scope.totalAmount = 0;
    $scope.isModalVisible = false;
    $scope.modalTitle = "";
    
    // Initialize filter models
    $scope.categoryFilter = "";
    $scope.fromDate = null;
    $scope.toDate = null;

    const categoryMap = {
      "💼 Salary": "Salary",
      "🎁 Bonus": "Bonus",
      "💰 Interest": "Interest",
      "🎉 Gifts": "Gifts",
      "📈 Investments": "Investments",
      "🍽️ Food": "Food",
      "🎬 Entertainment": "Entertainment",
      "🛍️ Shopping": "Shopping",
      "⛽ Fuel": "Fuel",
      "🔧 Others": "Others"
    };

    const incomeCategories = Object.keys(categoryMap).filter(key =>
      ["Salary", "Bonus", "Interest", "Gifts", "Investments"].includes(categoryMap[key])
    );
    const expenseCategories = Object.keys(categoryMap).filter(key =>
      ["Food", "Entertainment", "Shopping", "Fuel", "Others"].includes(categoryMap[key])
    );

    // Initialize modal data with current date
    function initializeModalData() {
      return {
        selectedCategory: "",
        transactionAmount: null,
        transactionDate: "",
        transactionNotes: ""
      };
    }

    $scope.modalData = initializeModalData();

    // Fetch transactions from backend
    $scope.fetchTransactions = function () {
      const userId = localStorage.getItem("id");
      if (!userId) {
        console.error("No user ID found");
        return;
      }

      $http.get(`http://localhost:3000/api/transactions/${userId}`)
        .then(response => {
          if (response.data && Array.isArray(response.data.transactions)) {
            $scope.transactionsToShow = response.data.transactions;
            $scope.calculateTotalAmount();
          }
        })
        .catch(error => {
          console.error("Error fetching transactions:", error);
          alert("Error loading transactions. Please try again.");
        });
    };

    // Calculate total amount
    $scope.calculateTotalAmount = function () {
      $scope.totalAmount = $scope.transactionsToShow.reduce((total, transaction) => {
        return transaction.type === "income"
          ? total + parseFloat(transaction.amount)
          : total - parseFloat(transaction.amount);
      }, 0);
    };

    // Open income modal
    $scope.openAddIncomeModal = function () {
      $scope.modalTitle = "Add Income";
      $scope.categoryOptions = incomeCategories;
      $scope.isIncome = true;
      $scope.isModalVisible = true;
      $scope.modalData = initializeModalData();
    };

    // Open expense modal
    $scope.openAddExpenseModal = function () {
      $scope.modalTitle = "Add Expense";
      $scope.categoryOptions = expenseCategories;
      $scope.isIncome = false;
      $scope.isModalVisible = true;
      $scope.modalData = initializeModalData();
    };

    // Close modal
    $scope.closeModal = function () {
      $scope.isModalVisible = false;
    };

    // Add transaction
    $scope.addTransaction = function () {
      if (!$scope.modalData.selectedCategory || !$scope.modalData.transactionAmount || !$scope.modalData.transactionDate) {
        alert("Please fill in all required fields");
        return;
      }

      const userId = localStorage.getItem("id");
      const endpoint = $scope.isIncome ? "income" : "outcome";

      const newTransaction = {
        // category: categoryMap[$scope.modalData.selectedCategory] || $scope.modalData.selectedCategory,
        category_id: "1",
        amount: parseFloat($scope.modalData.transactionAmount),
        date: $scope.modalData.transactionDate || "2030-11-01",  
        notes: $scope.modalData.transactionNotes || "",
        transaction_type: endpoint,
      };
      



      $http.post(`http://localhost:3000/api/transactions/${endpoint}/${userId}`, newTransaction)
        .then(response => {
            $scope.transactionsToShow.push(response.data.transactions);
            $scope.calculateTotalAmount();
        })
      $scope.closeModal();
    };

    // Apply filters
    $scope.applyFilters = function () {
      const userId = localStorage.getItem("id");
      if (!userId) return;

      const params = {
        userId: userId
      };

      if ($scope.categoryFilter) params.category = categoryMap[$scope.categoryFilter] || $scope.categoryFilter;
      if ($scope.fromDate) params.from = new Date($scope.fromDate).toISOString();
      if ($scope.toDate) params.to = new Date($scope.toDate).toISOString();

      $http.get(`http://localhost:3000/api/transactions/${userId}`, { params })
        .then(response => {
          if (response.data && Array.isArray(response.data.transactions)) {
            $scope.transactionsToShow = response.data.transactions;
            $scope.calculateTotalAmount();
          }
        })
        .catch(error => {
          console.error("Error applying filters:", error);
          alert("Error filtering transactions. Please try again.");
        });
    };

    $scope.fetchTransactions();
  }
]);