var googleApp = angular.module('googleBooks', []);

googleApp.controller('GoogleSearchCtrl',['$scope', '$http',function ($scope, $http) {
    $scope.searchText = 'Hello World';
    $scope.pageNumber = 1;

    $scope. maxResults = 10;

    $scope.search = function () {

        $scope.results = [];

        $http({
            method: 'GET',
            url: "https://www.googleapis.com/books/v1/volumes",
            params: {
                q: $scope.searchText,
                maxResults: $scope.maxResults,
                startIndex: ($scope.pageNumber - 1) * $scope.maxResults
            }
        }).success(function (data) {

                for( var i = 0; i < data.items.length; i++){
                     books = data.items[i].volumeInfo;

                    $scope.results.push(data.items[i].volumeInfo);
                }
            })
    };

    $scope.changePage = function (increment) {
        $scope.pageNumber += increment;

    };


}]);

