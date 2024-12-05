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

        $scope.filters = {
            orderBy: 'default',
            name: '',
            transactionType: 'all',
        };

        $scope.modalEditData = {};

        // Get the user ID from localStorage
        var userId = localStorage.getItem("id");

        // Function to fetch data from the API and refresh the debts
        $scope.refreshDebts = function () {
            $http.get('http://localhost:3000/api/debts')
                .then(function (response) {
                    // Filter the debts based on the user ID
                    $scope.budgets = response.data
                        .filter(function (debt) {
                            return debt.user_id == userId;
                        })
                        .map(function (debt) {
                            return {
                                ...debt,
                                icon: 'account_balance',
                                color: debt.debt_type === 'debt' ? 'red-500' : 'green-500',
                                type: debt.debt_type.charAt(0).toUpperCase() + debt.debt_type.slice(1),
                                participants: debt.debt_type === 'debt' ? 'You ➔ ' + debt.name : debt.name + ' ➔ You',
                                name: debt.name,
                                dateRange: new Date(debt.date_start).toLocaleDateString() + ' - ' + new Date(debt.date_end).toLocaleDateString(),
                                progress: ((debt.amount - debt.debt_residual) / debt.amount) * 100,
                                currentAmount: '$' + (debt.amount - debt.debt_residual).toFixed(2),
                                totalAmount: '$' + debt.amount,
                                residual: '$' + debt.debt_residual,
                                amount: debt.amount,
                                residual_amount: debt.debt_residual,
                            };
                        });
                }, function (error) {
                    console.error("Error fetching debts:", error);
                });
        };

        // Call refreshDebts initially to load the data
        $scope.refreshDebts();

        $scope.applyFilters = function () {
            $http.get('http://localhost:3000/api/debts')
                .then(function (response) {
                    let debts = response.data.filter(function (debt) {
                        // Filter berdasarkan tipe transaksi
                        if ($scope.filters.transactionType !== 'all' && debt.debt_type !== $scope.filters.transactionType) {
                            return false;
                        }
                        
                        if ($scope.filters.name && !debt.name.toLowerCase().includes($scope.filters.name.toLowerCase())) {
                            return false;
                        }
                        return true;
                    });

                    // Urutkan data
                    if ($scope.filters.orderBy === 'name') {
                        debts.sort((a, b) => a.name.localeCompare(b.name));
                    } else if ($scope.filters.orderBy === 'amount') {
                        debts.sort((a, b) => b.amount - a.amount);
                    } else if ($scope.filters.orderBy === 'residual') {
                        debts.sort((a, b) => b.debt_residual - a.debt_residual);
                    }

                    // Update data yang difilter
                    $scope.budgets = debts.map(function (debt) {
                        return {
                            ...debt,
                            icon: 'account_balance',
                            color: debt.debt_type === 'debt' ? 'red-500' : 'green-500',
                            type: debt.debt_type.charAt(0).toUpperCase() + debt.debt_type.slice(1),
                            participants: debt.debt_type === 'debt' ? 'You ➔ ' + debt.name : debt.name + ' ➔ You',
                            dateRange: new Date(debt.date_start).toLocaleDateString() + ' - ' + new Date(debt.date_end).toLocaleDateString(),
                            progress: ((debt.amount - debt.debt_residual) / debt.amount) * 100,
                            currentAmount: '$' + (debt.amount - debt.debt_residual).toFixed(2),
                            totalAmount: '$' + debt.amount,
                            residual: '$' + debt.debt_residual,
                            amount: debt.amount,
                            residual_amount: debt.debt_residual,
                        };
                    });
                }, function (error) {
                    console.error("Error fetching debts:", error);
                });
        };


        // Cancel button functionality
        $scope.cancel = function () {
            $scope.filters = {
                orderBy: 'default',
                name: '',
                transactionType: 'all',
            };

            $scope.applyFilters();
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
                    $scope.closeModal();
                    $scope.refreshDebts();
                }, function (error) {
                    console.error("Error adding debt/credit:", error);
                });
        };

        $scope.openEditModal = function (debt) {
            const formatDate = (isoString) => {
                return new Date(isoString);
            };
            $scope.modalEditData.id = debt.debt_id;
            $scope.modalEditData.name = debt.name;
            $scope.modalEditData.debt_type = String(debt.type).toLowerCase();
            $scope.modalEditData.amount = Number(debt.amount);
            $scope.modalEditData.residual = Number(debt.residual_amount);
            $scope.modalEditData.date_start = formatDate(debt.date_start);
            $scope.modalEditData.date_end = formatDate(debt.date_end);
            document.getElementById('editModal').classList.remove('hidden');
        };

        $scope.closeEditModal = function () {
            document.getElementById('editModal').classList.add('hidden');
        };

        $scope.submitEditForm = function () {
            const debtId = $scope.modalEditData.id;

            const requestBody = {
                name: $scope.modalEditData.name,
                debt_type: $scope.modalEditData.debt_type,
                amount: $scope.modalEditData.amount,
                debt_residual: $scope.modalEditData.residual,
                date_start: $scope.modalEditData.date_start,
                date_end: $scope.modalEditData.date_end,
            };

            // Send PUT request to update the debt
            $http.put(`http://localhost:3000/api/debts/${debtId}`, requestBody)
                .then(function (response) {
                    $scope.closeEditModal(); // Close modal after updating
                    $scope.refreshDebts(); // Refresh the list of debts
                })
                .catch(function (error) {
                    console.error("Error updating data:", error);
                    alert("Failed to update data. Please try again.");
                });
        };

        $scope.deleteDebt = function (debtId) {

            $http.delete(`http://localhost:3000/api/debts/${debtId}`)
                .then(function (response) {
                    console.log("Debt deleted successfully:", response.data);
                    // Refresh the debts list after deletion
                    $scope.refreshDebts();
                }, function (error) {
                    console.error("Error deleting debt:", error);
                    alert("Failed to delete debt. Please try again.");
                });

        };
    }
]);
