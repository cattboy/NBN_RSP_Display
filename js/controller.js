var app = angular.module('contactApp', []);

app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];
    
    // Use a wildcard pattern to match any nbn_providers json file
    fetch('./OUTPUT/nbn_providers*.json')
        .then(response => response.json())
        .then(data => {
            $scope.contacts = data;
            $scope.$apply();
        })
        .catch(error => {
            console.error('Error loading data:', error);
            // Show error message instead of sample data
            $scope.contacts = [
                {name: "Cannot load data file", phone: "-", website: "#"}
            ];
            $scope.$apply();
        });
});