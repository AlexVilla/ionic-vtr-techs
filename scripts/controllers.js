'use strict';
angular.module('techs')

.controller('SideNavCtrl', ['$scope', '$ionicSideMenuDelegate', '$state', function ($scope, $ionicSideMenuDelegate, $state) {
    $scope.toggleMenu = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.close = function(){
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    $scope.endSesion = function(){
        $ionicSideMenuDelegate.toggleLeft(false);
        $state.go('login')
    };
}])


.controller('LoginCtrl', ['$scope', 'LoginService', '$state', '$ionicPopup', function($scope, LoginService, $state, $ionicPopup){
    $scope.data = {};

    $scope.login = function() {
        //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
        LoginService.loginUser($scope.data.username, $scope.data.password)
            .success(function ($data) {
                $state.go('app');
            })
            .error(function ($data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Ups!',
                    template: 'Revisa tus credenciales de acceso, al parecer algo no concuerda'
                });
            })
    }
}])

.controller('TaskCtrl',['$scope', 'TaskService', '$moment', '$ionicModal', '$cordovaDatePicker', '$ionicPlatform', '$stateParams', function($scope, TaskService, $moment, $ionicModal, $cordovaDatePicker, $ionicPlatform, $stateParams){
    if(angular.equals($stateParams, {})){
        $scope.tasks = TaskService.getTask();
    }else{
        switch ($stateParams.status){
            case "Terminado":
                $scope.endTasks = TaskService.finishedTask();
                break;
            case "Pendiente":
                $scope.endTasks = TaskService.pendingTask();
                break;
            case "Incompleto":
                $scope.endTasks = TaskService.uncompleteTask();
                break;
        }
    }

    $scope.checkStatus = function(estado){
        if (estado == "Incompleto"){
            return 3;
        }else{
            return (estado == "Terminado");
        }
    };
    $scope.convertDate = function(timestamp){
        return $moment.unix(timestamp).format('DD/MM/YYYY H:mm');
    };

    $ionicModal.fromTemplateUrl('views/filtermodal.html',{
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal){
        $scope.modal = modal;
    });
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    $scope.allComunas = TaskService.getComunas();
    $scope.allNodes = TaskService.getNodes();
    $scope.allCuadrantes = TaskService.getCuadrantes();
    $scope.allStatus =  TaskService.getStatus();
    $scope.filterOptions={
        nodo: "",
        cuadrante: "",
        estado: "",
        comuna: "",
        fecha: "",
        tipo_actividad: ""
    };

    $scope.search = function(row) {
        return (
            angular.lowercase(row.ubicacion[0].comuna).toString().indexOf(angular.lowercase($scope.filterOptions.comuna) || "") !== -1 &&
            angular.lowercase(row.ubicacion[0].nodo).toString().indexOf(angular.lowercase($scope.filterOptions.nodo) || "")!== -1 &&
            angular.lowercase(row.ubicacion[0].cuadrante).toString().indexOf(angular.lowercase($scope.filterOptions.cuadrante) || "") !== -1 &&
            angular.lowercase(row.estado).toString().indexOf(angular.lowercase($scope.filterOptions.estado) || "") !== -1 &&
            angular.lowercase($moment.unix(row.hora_creacion).format('DD/MM/YYYY')).toString().indexOf(angular.lowercase($scope.filterOptions.fecha) || "") !== -1
            //angular.lowercase(row.tipo_actividad).toString().indexOf(angular.lowercase($scope.filterOptions.tipo_actividad) || "") !== -1
        );
    };

    var dateOptions = {
        date: new Date(),
        mode: 'date', // or 'time'
        minDate:  moment().subtract(100, 'years').toDate(),
        allowOldDates: true,
        allowFutureDates: false,
        doneButtonLabel: 'DONE',
        doneButtonColor: '#F2F3F4',
        cancelButtonLabel: 'CANCEL',
        cancelButtonColor: '#000000'
    };
    $ionicPlatform.ready(function () {
        $scope.openDate = function (){
            $cordovaDatePicker.show(dateOptions).then(function(date){
                var a = $moment(date, 'DD-MM-YYYY').valueOf()/1000;
                $scope.filterOptions.fecha = $moment.unix(a).format('DD/MM/YYYY');
            });
        };
    });

    $scope.resetFilter = function () {
        $scope.filterOptions={
            nodo: "",
            cuadrante: "",
            estado: "",
            comuna: "",
            fecha: "",
            tipo_actividad: ""
        };
    }
}])

.controller('TaskDetailCtrl', ['$scope', 'DetailService', '$state', '$ionicPopup', '$cordovaCamera', '$ionicPlatform', function($scope, LoginService, $state, $ionicPopup, $cordovaCamera, $ionicPlatform){
    $scope.pictureUrl = 'http://www.placehold.it/300x300';
    $scope.takePicture = function () {
        $cordovaCamera.getPicture(cameraOptions)
            .then(function(imageData) {
                console.log('camera data: ' + angular.toJson(imageData));
                $scope.pictureUrl = "data:image/jpeg;base64," + imageData;
                //var image = document.getElementById('myImage');
                //image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
                console.log('camera error: ' + angular.toJson(err));
        });
    };
    var cameraOptions = {
        //quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        //sourceType: Camera.PictureSourceType.CAMERA,
        //allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
       // targetWidth: 100,
       // targetHeight: 100,
       // popoverOptions: CameraPopoverOptions,
       // saveToPhotoAlbum: false,
       // correctOrientation:true
    };

    /*$ionicPlatform.ready(function () {

    });*/
}])
;

