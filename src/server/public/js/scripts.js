var app = angular.module("myShoppingList", []);
$( document ).ready(function() {
    alert( "ready!" );
});

if (app){
  console.log("fun");
}

app.controller("myCtrl", function($scope) {
    $scope.products = ["Milk", "Bread", "Cheese"];
});
