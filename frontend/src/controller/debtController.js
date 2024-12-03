angular.module('myApp').controller('debtController', [
    "$scope",
    "$http",
    "$location",
    "$rootScope",
    function ($scope, $http, $location, $rootScope) {
        // Initialize empty budgets array
        $scope.budgets = [];
        $scope.modalData = {
            name: '',
            debt_type: 'debt',
            amount: 0,
            debt_residual: 0,
            date_start: '',
            date_end: ''
        };

        // Get the user ID from localStorage
        var userId = localStorage.getItem("id");

        // Function to fetch data from the API
        $http.get('http://localhost:3000/api/debts')
            .then(function (response) {
                // Filter the debts based on the user ID
                $scope.budgets = response.data
                    .filter(function(debt) {
                        return debt.user_id == userId;
                    })
                    .map(function(debt) {
                        return {
                            icon: 'account_balance',
                            color: debt.debt_type === 'debt' ? 'red-500' : 'green-500',
                            type: debt.debt_type.charAt(0).toUpperCase() + debt.debt_type.slice(1),
                            participants: debt.debt_type === 'debt' ? 'You ➔ ' + debt.name : debt.name + ' ➔ You',
                            dateRange: new Date(debt.date_start).toLocaleDateString() + ' - ' + new Date(debt.date_end).toLocaleDateString(),
                            progress: ((debt.amount - debt.debt_residual) / debt.amount) * 100,
                            currentAmount: '$' + (debt.amount - debt.debt_residual).toFixed(2),
                            totalAmount: '$' + debt.amount,
                            residual: '$' + debt.debt_residual,
                        };
                    });
            }, function (error) {
                console.error("Error fetching debts:", error);
            });

        // Cancel button functionality
        $scope.cancel = function () {
            alert("Cancel action triggered");
        };


        // Open modal with specific type
        $scope.openModal = function (type) {
            $scope.modalData.debt_type = type; // 'debt' or 'credit'
            $scope.modalData.name = '';
            $scope.modalData.amount = 0;
            $scope.modalData.date_start = '';
            $scope.modalData.date_end = '';
            document.getElementById('modal').classList.remove('hidden');
        };

        // Close modal
        $scope.closeModal = function () {
            document.getElementById('modal').classList.add('hidden');
        };

        // Submit modal form
        $scope.submitForm = function () {
            $scope.modalData.debt_residual = $scope.modalData.amount; // Default residual
            $scope.modalData.user_id = userId; // Attach user ID

            $http.post('http://localhost:3000/api/debts', $scope.modalData)
                .then(function (response) {
                    alert("Debt/Credit added successfully!");
                    $scope.budgets.push(response.data); // Update UI
                    $scope.closeModal();
                }, function (error) {
                    console.error("Error adding debt/credit:", error);
                });
        };
    }
]);
