// registerController.js
app.controller("RegisterController", function ($scope, $http, $window) {
  $scope.user = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //conf password validate
  $scope.register = function () {
    if ($scope.user.password !== $scope.user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const requestBody = {
      username: $scope.user.username,
      email: $scope.user.email,
      password: $scope.user.password,
    };

    //http api request
    $http
      .post("http://localhost:3000/api/users/", requestBody)
      .then(
        function (response) {
          alert("Registration Successful!");
          $window.location.href = "login";
        },
        function (error) {
          const errCode = error.data.error.code;
          if (errCode == 23505){
            // console.log(error.config.data.email);
            const email = error.config.data.email;
            alert(`Email: ${email} already exist!`); 
          }else{
            alert("Registration Failed, please try again!")
          }
        }
      );
  };
});
