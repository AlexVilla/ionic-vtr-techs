'use strict';
angular.module('techs', ['ionic','ui.router','angular.filter','angular-momentjs','angular-datepicker'])

.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
    .state('app',{
        url:'/tasks',
        views:{
            'sidenav':{
                templateUrl: 'views/sidenav.html'
            },
            'content':{
                templateUrl: 'views/tasks.html',
                controller: 'TaskCtrl'
            }
        }
    })

    .state('app.task',{
        url:'/tasks/:id',
        views:{
            'sidenav':{
                templateUrl: 'views/sidenav.html'
            },
            'content':{
                templateUrl: 'views/taskDetail.html',
                controller: 'TaskDetailCtrl'
            }
        }
    })

    .state('login', {
        url: '/login',
        views:{
            'content@':{
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/login');
})

.run(function($ionicSideMenuDelegate, $ionicPlatform, $state){
    $ionicPlatform.registerBackButtonAction(function (event) {
        if($ionicSideMenuDelegate.isOpen){
            $ionicSideMenuDelegate.toggleLeft(false);
            if($state.current.name=="app" || $state.current.name=="login"){
                navigator.app.exitApp();
            }
            else {
                navigator.app.backHistory();
            }
        }
    }, 100);
});