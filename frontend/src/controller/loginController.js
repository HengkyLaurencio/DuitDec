
angular.module("myApp").controller("LoginController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.email = "";
    $scope.password = "";

    $scope.login = function () {
      if ($scope.email && $scope.password) {
        const loginData = {
          email: $scope.email,
          password: $scope.password,
        };

        $http
          .post("http://localhost:3000/api/auth/login/", loginData)
          .then(function (response) {
            alert(
              `Login Successful! Welcome, ${response.data.loginSuccess.username}`
            );
            window.location.href = "/dashboard";
          }),
          function (error) {
            alert(error.data?.message || "Login failed. Please try again.");
          };
      } else {
        alert("Please fill in both fields!");
      }
    };
  },
]);
