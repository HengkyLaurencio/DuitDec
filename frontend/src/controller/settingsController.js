// Define the ProfileController
angular.module("myApp").controller("settingsController", function ($scope) {
  // Current profile data
  $scope.currentProfilePic = "https://via.placeholder.com/150";
  $scope.name = "John Doe";
  $scope.email = "johndoe@example.com";

  // Available profile pictures
  $scope.profilePics = [
    { id: "pic1", url: "https://via.placeholder.com/150" },
    { id: "pic2", url: "https://via.placeholder.com/150/0000FF" },
    { id: "pic3", url: "https://via.placeholder.com/150/FF0000" },
    { id: "pic4", url: "https://via.placeholder.com/150/00FF00" },
    { id: "pic5", url: "https://via.placeholder.com/150/FFFF00" },
  ];

  // Selected profile picture
  $scope.selectedProfilePic = null;

  // Save changes
  $scope.saveChanges = function () {
    if ($scope.selectedProfilePic) {
      $scope.currentProfilePic = $scope.selectedProfilePic.url;
      alert("Profile updated successfully!");
    } else {
      alert("Please select a profile picture.");
    }
  };
});
