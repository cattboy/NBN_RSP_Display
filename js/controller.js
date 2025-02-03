var app = angular.module('contactApp', []);

app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];
    
    // Using a relative path to the data file
    $http.get('./OUTPUT/nbn_providers_20250203_175414.json')
        .success(function(data) {
            console.log('Data loaded successfully:', data); // Debug log
            data.forEach(function(item) {
                $scope.contacts.push({
                    name: item[0],
                    phone: item[1],
                    website: item[2]
                });
            });
        })
        .error(function(error, status) {
            console.error('Error loading contacts - Status:', status);
            console.error('Error details:', error);
            

        });
});