// AngularJS App Initialization
angular.module("myApp").controller("accountsController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    const userId = localStorage.getItem("id");
    $scope.wallets = [];
    $scope.isModalOpen = false;
    $scope.newWallet = {};

    // Fetch Wallets from API
    $scope.fetchWallets = function () {
      $http
        .get(`http://localhost:3000/api/accounts/${userId}`)
        .then((response) => {
          $scope.wallets = response.data.accounts.map((account) => ({
            name: account.account_name,
            amount: account.balance,
            isVisible: true,
            account_id: account.account_id, // Asumsikan API memberikan ID akun
          }));
        })
        .catch((error) => {
          console.error("Error fetching wallets:", error);
        });
    };

    // Open Modal
    $scope.openModal = function () {
      $scope.isModalOpen = true;
    };

    // Close Modal
    $scope.closeModal = function () {
      $scope.isModalOpen = false;
      $scope.newWallet = {};
    };

    // Add Wallet using API
    $scope.addWallet = function () {
      const payload = {
        user_id: userId,
        account_name: $scope.newWallet.name,
        balance: $scope.newWallet.amount,
      };

      $http
        .post("http://localhost:3000/api/accounts/", payload)
        .then((response) => {
          $scope.wallets.push({
            name: response.data.account_name,
            amount: response.data.balance,
            isVisible: true,
            account_id: response.data.account_id, // Asumsikan API memberikan ID akun baru
          });
          $scope.closeModal();
        })
        .catch((error) => {
          console.error("Error adding wallet:", error);
        });
    };

    // Delete Wallet using API
    $scope.deleteWallet = function (index) {
      const wallet = $scope.wallets[index];
      $http
        .delete(`http://localhost:3000/api/accounts/${wallet.account_id}`)
        .then(() => {
          $scope.wallets.splice(index, 1);
        })
        .catch((error) => {
          console.log($scope.wallets);
          // console.error("Error deleting wallet:", error);
        });
    };

    // Calculate Total Amount
    $scope.getTotal = function () {
      return $scope.wallets.reduce((total, wallet) => total + wallet.amount, 0);
    };

    // Initialize Wallets
    $scope.fetchWallets();
  },
]);
