var app = angular.module('contactApp', []);

app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];
    
    $http.get('OUTPUT/nbn_providers_20250203_175414.json')
        .success(function(data) {
            data.forEach(function(item) {
                $scope.contacts.push({
                    name: item[0],
                    phone: item[1],
                    website: item[2]
                });
            });
        })
        .error(function(error) {
            console.error('Error loading contacts:', error);
        });
});