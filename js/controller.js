var app = angular.module('contactApp', []);

app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];
    
    // Using a relative path to the data file
    $http.get('./OUTPUT/nbn_providers_20250203_175414.json')
        .success(function(data) {
            console.log('Data loaded successfully:', data); // Debug log
            // The data is already in the correct format, just assign it directly
            $scope.contacts = data;
        })
        .error(function(error, status) {
            console.error('Error loading contacts - Status:', status);
            console.error('Error details:', error);
            
            // Add some sample data in case of error
            $scope.contacts = [
                {name: "Sample Company", phone: "555-0101", website: "http://www.sample.com"}
            ];
        });
});