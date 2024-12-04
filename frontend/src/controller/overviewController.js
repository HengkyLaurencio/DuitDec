angular.module("myApp").controller("OverviewController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    // Inisialisasi summary, thisMonth, dan lastMonth
    $scope.summary = {
      balance: 999999.12,
      creditCards: -11111.11,
      total: 123123.12 - 11111.11,
    };
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
            balance: parseFloat(account.balance), // Konversi balance menjadi angka
            currency: "USD", // Default currency, sesuaikan jika perlu
          }));

          // Update summary balance berdasarkan total akun
          const totalBalance = $scope.accounts.reduce(
            (total, account) => total + account.balance,
            0
          );
          $scope.summary.balance = totalBalance;
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
  },
]);
