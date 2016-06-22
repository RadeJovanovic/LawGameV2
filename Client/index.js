//index.js is all about angular, with the aim of making a single page function. Express is used in server.js to make multiple pages work.

var myApp = angular.module('myApp', [])

myApp.controller('sceneController', function($scope, sceneService) {

   $scope.scenes = [{ //initialising dummy scene
        'number': '0',
        'URL': 'first image source',
        'question': 'first question',
        'answer': 'first answer',
        'nextscene': 'scene after first'
    }];
    
    
    $scope.newScene = {};
    $scope.newScene.number = 'type number here';
    $scope.newScene.URL = 'type URL here';
    $scope.newScene.question = 'type question here';
    $scope.newScene.answer = 'type answer here'
    $scope.newScene.nextscene = 'type nextscene number here';


    $scope.saveThisScene = function() { 
        sceneService.saveScene($scope.newScene) //need to pass only the details of the new scene
            .then(saveSuccess, error);
        $scope.newScene = {};
    }
    
    $scope.copyThisScene = function(sceneToEdit) {
         for (i in $scope.scenes){
            if ($scope.scenes[i].number == sceneToEdit){
                $scope.newScene = angular.copy($scope.scene[i]) //This copies the values into the input fields for easier manipulation
            }
         }
    }
        
    $scope.editThisScene = function(sceneToEdit) {
        toEdit = sceneToEdit; //maybe do not need this step
        sceneService.editScene($scope.newScene, toEdit) //need to pass both the details of the new scene and the scene number
            .then(editSuccess, error);
        $scope.newScene = {};
    }
    
    $scope.deleteThisScene = function(sceneToDelete) {
        toDelete = sceneToDelete; //maybe do not need this step
        sceneService.deleteScene(toDelete) //only need to pass the details of the scene that is to be deleted
        .then(deleteSuccess, error);
    }

    $scope.loadSavedScenes = function() {
        sceneService.loadSaved()
            .then(loadSuccess, error)
    }

    function saveSuccess(json) {
        console.log(json);
    }
    
    function editSuccess(json) {
        console.log(json);
    }
    
    function deleteSuccess() {
        console.log('Indexjs says Successfully deleted scene'); //Maybe add 'successfully deleted scene number x'
    }

    function loadSuccess(json) {
        $scope.scenes = json.data;
    }

    function error(err) {
        console.log(err);
    }
})

myApp.service('sceneService', function($http) {

    var baseUrl = "http://localhost:8080/"

    this.saveScene = function(newScene) {
        var url = baseUrl + "saveScene";
        return $http.post(url, {
            "scene": newScene
        })
    }

    this.editScene = function(toEdit, newScene) {
        var url = baseUrl + "editScene";
        return $http.put(url, toEdit, { //Maybe shouldn't use put??
            //Also not sure whether I need to declare 'toEdit' as I declared 'scene'
            "scene": newScene
        })
    }
    
    this.deleteScene = function(toDelete) {
        var url = baseUrl + "deleteScene";
        return $http.delete(url, toDelete);
    }

    this.loadSaved = function() {
        var url = baseUrl + "loadScenes";
        return $http.get(url);
    }

})