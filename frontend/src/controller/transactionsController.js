// Transaction Controller
angular.module("myApp").controller("transactionsController", [
    "$scope",
    function ($scope) {
      let transactions = [];
      let totalAmount = 0;
  
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
  
      // Default category options
      $scope.categoryOptions = [...incomeCategories, ...expenseCategories];
      $scope.selectedCategory = "";
      $scope.transactionAmount = 0;
      $scope.transactionDate = "";
      $scope.transactionNotes = "";
  
      // Modal visibility
      $scope.isModalVisible = false;
      $scope.modalTitle = "";
  
      // Open Add Income Modal
      $scope.openAddIncomeModal = function() {
        $scope.modalTitle = "Add Income";
        $scope.categoryOptions = incomeCategories;
        $scope.isModalVisible = true;
        $scope.setupTransactionForm(true);
      };
  
      // Open Add Expense Modal
      $scope.openAddExpenseModal = function() {
        $scope.modalTitle = "Add Expense";
        $scope.categoryOptions = expenseCategories;
        $scope.isModalVisible = true;
        $scope.setupTransactionForm(false);
      };
  
      // Close Modal
      $scope.closeModal = function() {
        $scope.isModalVisible = false;
      };
  
      // Setup transaction form (income or expense)
      $scope.setupTransactionForm = function(isIncome) {
        $scope.isIncome = isIncome;
      };
  
      // Add Transaction
      $scope.addTransaction = function() {
        const category = $scope.selectedCategory;
        const amount = parseFloat($scope.transactionAmount);
        const date = $scope.transactionDate;
        const notes = $scope.transactionNotes;
  
        if (!category || isNaN(amount) || !date) {
          alert("Please fill all required fields.");
          return;
        }
  
        const standardizedCategory = categoryMap[category] || category;
  
        const newTransaction = {
          category: standardizedCategory,
          amount,
          date,
          notes,
          type: $scope.isIncome ? "income" : "expense"
        };
  
        transactions.push(newTransaction);
        totalAmount += $scope.isIncome ? amount : -amount;
  
        $scope.updateTransactionList();
        $scope.resetForm();
        $scope.closeModal();
      };
  
      // Update Transaction List
      $scope.updateTransactionList = function() {
        $scope.transactionsToShow = transactions;
  
        const totalAmountToShow = $scope.transactionsToShow.reduce((acc, transaction) => {
          return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
  
        $scope.totalAmount = totalAmountToShow;
      };
  
      // Apply Filters
      $scope.applyFilters = function() {
        const categoryFilter = $scope.categoryFilter;
        const fromDate = $scope.fromDate;
        const toDate = $scope.toDate;
  
        $scope.transactionsToShow = transactions.filter(transaction => {
          const categoryMatch = !categoryFilter || categoryMap[categoryFilter] === transaction.category;
          const dateMatch = (!fromDate || new Date(transaction.date) >= new Date(fromDate)) &&
                           (!toDate || new Date(transaction.date) <= new Date(toDate));
  
          return categoryMatch && dateMatch;
        });
      };
  
      // Reset the form
      $scope.resetForm = function() {
        $scope.selectedCategory = "";
        $scope.transactionAmount = 0;
        $scope.transactionDate = "";
        $scope.transactionNotes = "";
      };
  
      // Initialize
      $scope.updateTransactionList();
    }
  ]);
  