angular.module("myApp").controller("transactionsController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    // --- State Variables ---
    $scope.totalAmount = 0;
    $scope.isModalVisible = false;
    $scope.modalTitle = "";
    $scope.categories = [];
    $scope.categoryFilter = "";
    $scope.fromDate = null;
    $scope.toDate = null;
    $scope.isEditing = false; 

    // Punya luis
    const userId = localStorage.getItem("id");
    $scope.transactions = [];
    $scope.transactionsToShow = [];
    $scope.filter = {
      category: "",
      type: "",
      dateRange: {
        from: null,
        to: null,
      },
    };
    $scope.fetchData = function () {
      const userId = localStorage.getItem("id");
      if (!userId) {
        alert("User ID not found. Please log in.");
        return;
      }
      // Fetch Categories
      $http
        .get("http://localhost:3000/api/category/")
        .then((response) => {
          $scope.categories = response.data; 
          return $scope.fetchTransactions(userId); 
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
          alert("Failed to load categories.");
        });
    };

    $scope.getTransactions = function (userId) {
      $http
        .get(`http://localhost:3000/api/transactions/${userId}`)
        .then(function (response) {
          $scope.transactions = response.data.transactions;
          $scope.applyFilters();
        });
    };
    $scope.applyFilters = function () {
      $scope.transactionsToShow = $scope.transactions
        .filter(function (transaction) {
          const matchesCategory =
            !$scope.filter.category ||
            transaction.category_id == $scope.filter.category;
          const matchesType =
            !$scope.filter.type ||
            transaction.transaction_type === $scope.filter.type;
          const matchesDateRange =
            (!$scope.filter.dateRange.from ||
              new Date(transaction.date) >=
                new Date($scope.filter.dateRange.from)) &&
            (!$scope.filter.dateRange.to ||
              new Date(transaction.date) <=
                new Date($scope.filter.dateRange.to));

          return matchesCategory && matchesType && matchesDateRange;
        })
        .map(function (transaction) {
          const category = $scope.categories.find(
            (c) => c.category_id === transaction.category_id
          );
          return {
            ...transaction,
            categoryName: category ? category.category_name : "Unknown",
          };
        });
    };

    $scope.cancelFilters = function () {
      $scope.filter = {
        category: "",
        type: "",
        dateRange: {
          from: null,
          to: null,
        },
      };
    

      $scope.applyFilters();
    };
    


    $scope.getTransactions(userId);


    $scope.fetchTransactions = function (userId) {
      return $http
        .get(`http://localhost:3000/api/transactions/${userId}`)
        .then((response) => {
          $scope.transactionsToShow = response.data.transactions.map(
            (transaction) => {
              const category = $scope.categories.find(
                (c) => c.category_id === transaction.category_id
              );
              return {
                ...transaction,
                categoryName: category ? category.category_name : "Unknown",
              };
            }
          );
          $scope.calculateTotalAmount(); 
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          alert("Failed to load transactions.");
        });
    };

    $scope.calculateTotalAmount = function () {
      $scope.totalAmount = $scope.transactionsToShow.reduce(
        (total, transaction) => {
          return transaction.transaction_type === "income"
            ? total + parseFloat(transaction.amount)
            : total - parseFloat(transaction.amount);
        },
        0
      );
    };

    // --- Modal Management ---
    $scope.openAddIncomeModal = function () {
      $scope.modalTitle = "Add Income";
      $scope.isIncome = true;
      $scope.isEditing = false;
      $scope.isModalVisible = true;
      $scope.modalData = {
        selectedCategory: "",
        transactionAmount: null,
        transactionDate: "",
        transactionNotes: "",
      };
    };

    $scope.openAddOutcomeModal = function () {
      $scope.modalTitle = "Add Outcome";
      $scope.isIncome = false;
      $scope.isEditing = false;
      $scope.isModalVisible = true;
      $scope.modalData = {
        selectedCategory: "",
        transactionAmount: null,
        transactionDate: "",
        transactionNotes: "",
      };
    };

    $scope.openTransactionDetails = function (transaction) {
      $scope.isEditing = true;
      $scope.modalTitle = "Edit Transaction";
      $scope.isModalVisible = true;
      $scope.modalData = {
        transactionId: transaction.transaction_id,
        selectedCategory: transaction.category_id,
        transactionAmount: transaction.amount,
        transactionDate: new Date(transaction.date),
        transactionNotes: transaction.notes,
        transactionType: transaction.transaction_type,
      };
      $scope.$apply(); // Ensure changes are reflected in the view
    };

    $scope.closeModal = function () {
      $scope.isModalVisible = false;
    };

    // --- Transaction Management ---
    $scope.addTransaction = function () {
      if (
        !$scope.modalData.selectedCategory ||
        !$scope.modalData.transactionAmount ||
        !$scope.modalData.transactionDate
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const userId = localStorage.getItem("id");
      const endpoint = $scope.isIncome ? "income" : "outcome";
      const newTransaction = {
        category_id: $scope.modalData.selectedCategory,
        amount: parseFloat($scope.modalData.transactionAmount),
        date: $scope.modalData.transactionDate,
        notes: $scope.modalData.transactionNotes || "",
        transaction_type: endpoint,
      };

      $http
        .post(
          `http://localhost:3000/api/transactions/${endpoint}/${userId}`,
          newTransaction
        )
        .then(() => {
          $scope.fetchData();
          $scope.closeModal();
        })
        .catch((error) => {
          console.error("Error adding transaction:", error);
          alert("Failed to add transaction.");
        });
    };

    $scope.updateTransaction = function () {
      const updatedTransaction = {
        category_id: $scope.modalData.selectedCategory,
        amount: $scope.modalData.transactionAmount,
        date: $scope.modalData.transactionDate,
        notes: $scope.modalData.transactionNotes,
        transaction_type: $scope.modalData.transactionType,
      };

      const userId = localStorage.getItem("id");
      $http
        .put(
          `http://localhost:3000/api/transactions/${userId}/${$scope.modalData.transactionId}`,
          updatedTransaction
        )
        .then(() => {
          $scope.fetchData();
          $scope.closeModal();
        })
        .catch((error) => {
          console.error("Error updating transaction:", error);
          alert("Failed to update transaction.");
        });
    };

    $scope.deleteTransaction = function () {
      const userId = localStorage.getItem("id");
      const transactionId = $scope.modalData.transactionId;

      if (!transactionId) {
        alert("No transaction selected to delete.");
        return;
      }

      $http
        .delete(
          `http://localhost:3000/api/transactions/${userId}/${transactionId}`
        )
        .then(() => {
          $scope.fetchData();
          $scope.closeModal();
        })
        .catch((error) => {
          console.error("Error deleting transaction:", error);
          alert("Failed to delete transaction.");
        });
    };

    $scope.saveTransaction = function () {
      if (
        !$scope.modalData.selectedCategory ||
        !$scope.modalData.transactionAmount ||
        !$scope.modalData.transactionDate
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      const userId = localStorage.getItem("id");
      const transaction = {
        category_id: $scope.modalData.selectedCategory,
        amount: parseFloat($scope.modalData.transactionAmount),
        date: $scope.modalData.transactionDate,
        notes: $scope.modalData.transactionNotes || "",
        transaction_type: $scope.isIncome ? "income" : "outcome",
      };

      if (!$scope.isEditing) {
        $http
          .post(
            `http://localhost:3000/api/transactions/${transaction.transaction_type}/${userId}`,
            transaction
          )
          .then(() => {
            $scope.fetchData();
            $scope.closeModal();
          })
          .catch((error) => {
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction.");
          });
      } else {
        $http
          .put(
            `http://localhost:3000/api/transactions/${userId}/${$scope.modalData.transactionId}`,
            transaction
          )
          .then(() => {
            $scope.fetchData();
            $scope.closeModal();
          })
          .catch((error) => {
            console.error("Error updating transaction:", error);
            alert("Failed to update transaction.");
          });
      }
    };

    // --- Initialization ---
    $scope.fetchData();
  },
]);
