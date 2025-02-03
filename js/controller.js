var app = angular.module('myApp', []);

var navLang = navigator.language ? navigator.language : 'en'; //Some browser have null language ?!!


app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];
    
    // Use a wildcard pattern to match any nbn_providers json file
    fetch('./OUTPUT/nbn_providers.json')
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
         //Serve as a filter on the main list
    $scope.criteriaMatch = function () {
        return function (item) {
            return (
                (!document.criteria.service_nbn.checked || item.name.toLowerCase().indexOf('nbn') !== -1 || item.name.toLowerCase().indexOf('câble') !== -1) &&
                (!document.criteria.service_vision.checked || item.name.toLowerCase().indexOf('vision') !== -1 || item.name.toLowerCase().indexOf('fibre') !== -1 || item.name.toLowerCase().indexOf('fibe') !== -1 || 
                item.name.toLowerCase().indexOf('fttn') !== -1) &&
                (!document.criteria.service_dsl.checked || item.name.toLowerCase().indexOf('dsl') !== -1) &&
                (!document.criteria.service_other.checked || (item.name.toLowerCase().indexOf('fiber') === -1 && item.name.toLowerCase().indexOf('fibre') === -1 && item.name.toLowerCase().indexOf('fibe') === -1 
                && item.name.toLowerCase().indexOf('fttn') === -1 && item.name.toLowerCase().indexOf('câble') === -1 && item.name.toLowerCase().indexOf('cable') === -1 && item.name.toLowerCase().indexOf('dsl') === -1)) &&
                item.down_speed >= document.criteria.min_down_speed.value
                    && (item.limit >= document.criteria.min_download_limit.value || item.limit === null)
                    && (item.price <= document.criteria.montly_fee.value || document.criteria.montly_fee.value == '')
                );
        };
    };
});