angular.module("myApp").controller("settingsController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.profilePics = [
      { id: "pic1", url: "../images/001.png" },
      { id: "pic2", url: "../images/002.png" },
      { id: "pic3", url: "../images/003.png" },
      { id: "pic4", url: "../images/004.png" },
      { id: "pic5", url: "../images/005.png" },
      { id: "pic6", url: "../images/006.png" },
      { id: "pic7", url: "../images/007.png" },
      { id: "pic8", url: "../images/008.png" },
      { id: "pic9", url: "../images/009.png" },
    ];
    $scope.selectedProfilePic = null;
    const id = localStorage.getItem("id");
    $http
      .get(`http://localhost:3000/api/users/${id}`)
      .then((response) => {
        const userData = response.data;
        console.log(userData);
        $scope.name = userData.username;
        $scope.email = userData.email;
        $scope.currentProfilePic = `../images/${userData.image}`;
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        alert("Failed to load user data.");
      });

    $scope.saveChanges = function () {

      if (!$scope.selectedProfilePic){
        $scope.selectedProfilePic = $scope.currentProfilePic;
        var updatedData = {
          username: $scope.name,
          email: $scope.email,
          image: $scope.selectedProfilePic,
        };
      }else{
        var updatedData = {
          username: $scope.name,
          email: $scope.email,
          image: $scope.selectedProfilePic.url.split("/").pop(),
        };
      }
        
      console.log($scope.selectedProfilePic);
      $http
        .put(`http://localhost:3000/api/users/${id}`, updatedData)
        .then(() => {
          $scope.currentProfilePic = $scope.selectedProfilePic.url;
          alert("Profile updated successfully!");
        })
        .catch((error) => {
          console.log(error);
          alert("Failed to update profile.");
        });
    };
  },
]);
