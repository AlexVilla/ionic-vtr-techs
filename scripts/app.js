'use strict';
angular.module('techs', ['ionic','ui.router','angular.filter','angular-momentjs','ngCordova'])
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

        .state('app.status',{
            url:'/:status',
            views:{
                'content@':{
                    templateUrl: 'views/taskByStatus.html',
                    controller: 'TaskCtrl'
                }
            }
        })

        .state('app.task',{
            url:'/t/:id',
            views:{
                'content@':{
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

    $ionicPlatform.ready(function() {
        if (window.cordova) {
            //FCMPlugin.getToken( successCallback(token), errorCallback(err) );
            //Keep in mind the function will return null if the token has not been established yet.
            FCMPlugin.getToken(
                function (token) {
                    alert(token);
                    console.log(token);
                },
                function (err) {
                    console.log('error retrieving token: ' + err);
                }
            );
            //FCMPlugin.onNotification( onNotificationCallback(data), successCallback(msg), errorCallback(err) )
            //Here you define your application behaviour based on the notification data.
            FCMPlugin.onNotification(
                function (data) {
                    if (data.wasTapped) {
                        //Notification was received on device tray and tapped by the user.
                        alert(JSON.stringify(data));
                    } else {
                        //Notification was received in foreground. Maybe the user needs to be notified.
                        alert(JSON.stringify(data));
                    }
                },
                function (msg) {
                    console.log('onNotification callback successfully registered: ' + msg);
                },
                function (err) {
                    console.log('Error registering onNotification callback: ' + err);
                }
            );
        }
    })
    });
