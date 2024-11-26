// AngularJS App Initialization
angular.module("myApp").controller("accountsController", [
    "$scope",
    "$http",

// Wallet Controller
function ($scope) {
  $scope.wallets = [
    { name: "Wallet", amount: 5290.24, isVisible: true },
    { name: "Bank Account", amount: 3537.47, isVisible: true },
  ];

  $scope.isModalOpen = false;
  $scope.newWallet = {};

  // Open Modal
  $scope.openModal = function () {
    $scope.isModalOpen = true;
  };

  // Close Modal
  $scope.closeModal = function () {
    $scope.isModalOpen = false;
    $scope.newWallet = {};
  };

  // Add Wallet
  $scope.addWallet = function () {
    $scope.wallets.push({ ...$scope.newWallet, isVisible: true });
    $scope.closeModal();
  };

  // Delete Wallet
  $scope.deleteWallet = function (index) {
    $scope.wallets.splice(index, 1);
  };

  // Calculate Total Amount
  $scope.getTotal = function () {
    return $scope.wallets.reduce((total, wallet) => total + wallet.amount, 0);
  };
}]);
