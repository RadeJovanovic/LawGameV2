//index.js is all about angular, with the aim of making a single page function. Express is used in server.js to make multiple pages work.
var myApp = angular.module('myApp', ['angularVideoBg'])

myApp.controller('sceneEditController', function($scope, sceneUpdate) {

    // These $scope guys will be available in the HTML
    // Initialising the object elements because apparently this is good practice
    $scope.scenes = [{
        'number': '0',
        'URL': 'first image source',
        'question': 'first question',
        'answer': 'first answer',
        'nextscene': 'scene after first'
    }];

    // Maybe write in shortened form?
    $scope.newScene.number = 'type number here';
    $scope.newScene.URL = 'type URL here';
    $scope.newScene.question = 'type question here';
    $scope.newScene.answer = 'type answer here'
    $scope.newScene.nextscene = 'type nextscene number here';


    $scope.saveThisScene = function() {
        // Check here for number>0, 
        sceneUpdate.saveScene($scope.newScene)
            .then(saveSuccess, error)
        $scope.newScene = {};
    }

    // Do not want to include too much error chcecking here 
    $scope.editThisScene = function(id) {
        sceneToEdit = id;
        sceneUpdate.editScene(sceneToEdit)
            .then(editSuccess, error)
    }

    $scope.deleteThisScene = function(id) {
        sceneToDelete = id;
        sceneUpdate.deleteScene(SceneToDelete)
            .then(deleteSuccess, error)
    }
    $scope.getSavedScenes = function() {
        sceneUpdate.retrieveScenes()
            .then(loadSuccess, error)
    }

    function saveSuccess(json) {
        console.log(json)
    }

    function editSuccess(json) {
        console.log(json)
    }

    function deleteSuccess(json) {
        console.log('Successfully deleted')
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

    this.retrieveScenes = function() {
        var url = baseUrl + "retrieveScenes"
        return $http.get(url)
    }

//    this.editScene = function(sceneToEdit) {
//        var url = baseUrl + "editScene"
//        return $http.put(url, {
//            "scene": newScene,
//            "toEdit": sceneToEdit
//        })
//    }
//
//    this.deleteScene = function(sceneToDelete) {
//        var url = baseUrl + "deleteScene"
//        return $http.delete(url, {
//            "toDelete": sceneToDelete
//        })
//    }
})

//myApp.directive('ngBackground', function())