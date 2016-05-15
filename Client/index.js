//index.js is all about angular, with the aim of making a single page function. Express is used in server.js to make multiple pages work.

var myApp = angular.module('myApp', [])

myApp.controller('sceneEditController', function($scope, sceneUpdate) {

    // These $scope guys will be available in the HTML
   $scope.scenes = [{
        'id': '0',
        'URL': 'first image source',
        'question': 'first question',
        'answer': 'first answer',
        'nextscene': 'scene after first'
    }];
    
    $scope.newScene.number = 'type number here';
    $scope.newScene.URL = 'type URL here';
    $scope.newScene.question = 'type question here';
    $scope.newScene.answer = 'type answer here'
    $scope.newScene.nextscene = 'type nextscene number here';


    $scope.saveThisScene = function() {
        sceneUpdate.saveScene($scope.newScene)
            .then(saveSuccess, error)
        $scope.newScene = {};
    }
    
    $scope.editThisScene = function()
    {
        sceneUpdate.editScene($scope.newScene)
            .then(saveSuccess, error)
    }
    
    $scope

    $scope.getSavedScenes = function() {
        sceneUpdate.getSaved()
            .then(loadSuccess, error)
    }

    function saveSuccess(json) {
        console.log(json)
    }

    function loadSuccess(json) {
        $scope.scenes = json.data
    }

    function error(err) {
        console.log(err)
    }
})

myApp.service('sceneUpdate', function($http) {

    var baseUrl = "http://localhost:8080/"

    this.saveScene = function(newScene) {
        var url = baseUrl + "saveScene"
        return $http.post(url, {
            "scene": newScene
        })
    }

    this.getSaved = function() {
        var url = baseUrl + "getSaved"
        return $http.get(url)
    }

})

//myApp.directive('ngBackground', function())