var app = angular.module("myShoppingList", []);
if (app) {
  console.log("fun");
}

app.controller("myCtrl", function($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
});
