var app = angular.module('myApp', []);

var navLang = navigator.language ? navigator.language : 'en'; //Some browser have null language ?!!


app.controller('ContactController', function($scope, $http) {
    $scope.contacts = [];

    $scope.TITLE = 'NBN RSP Speed & Price Comparison';

    //Selection criterion bloc
    $scope.SELECTION_CRITERION = 'Selection criterion';
    $scope.MINIMUM_REQUIREMENTS = 'Minimum requirements';
    $scope.DOWNLOAD_SPEED = 'Download speed';
    $scope.BANDWIDTH = 'Bandwidth';
    $scope.BUDGET = 'Budget';
    $scope.MAXIMUM_MONTHLY_FEE = 'Maximum monthly fee';
    $scope.ORDER_BY = 'Order by';
    $scope.LOWEST_PRICE = 'Lowest price';
    $scope.FASTEST_SPEED = 'Fastest speed';
    $scope.SERVICE_TYPE = 'Service type';
    $scope.NBN = 'NBN Plans (via NBN Co)';
    $scope.VISION = 'VISION (via TPG FTTB)';
    
    //Titles column
    $scope.PLAN_NAME = 'Plan Name';
    $scope.DOWNLOAD = 'Download';
    $scope.UPLOAD = 'Upload';
    $scope.BANDWIDTH_LIMIT = 'Bandwidth Limit';
    $scope.MONTHLY_FEE = 'Monthly Fee';

    $scope.MORE_DETAILS = 'More details';
    $scope.NO_PLAN_FOUND = 'No import data or plans found.';
    $scope.NO_PLAN_FOUND_TIP = 'Not all filters need to be filled';

    $scope.DOLLAR_MONTH = '$/month';
    $scope.GB_MONTH = 'GB/month';

    $scope.SHARE_MSG = 'Share this tool';
    $scope.FOOTNOTES = 'This application was developed by Jared Vosters using <a href="http://angularjs.org/">AngularJS</a>. ' +
        'It is release under <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons</a>.';



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
            if ($scope.service_type === 'nbn') {
                return item.name.toLowerCase().indexOf('nbn') !== -1;
            } else if ($scope.service_type === 'vision') {
                return item.name.toLowerCase().indexOf('vision') !== -1;
            }
            return true; // fallback if no service type is selected
        };
    };
} );