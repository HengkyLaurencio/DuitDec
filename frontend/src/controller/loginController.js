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
            const token = response.data.loginSuccess.token;
            localStorage.setItem("authToken", token);
            localStorage.setItem("name", response.data.loginSuccess.username);
            localStorage.setItem("id", response.data.loginSuccess.user_id);
            alert(
              `Login Successful! Welcome, ${response.data.loginSuccess.username}`
            );
            window.location.href = "dashboard/overview";
          })
          .catch(function (error) {
            alert(`${error.data.message}`);
          });
      } else {
        alert("Please fill in both fields!");
      }
    };
  },
]);
