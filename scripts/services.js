'use strict';
angular.module('techs')

    .service('LoginService', function($q) {
        this.loginUser = function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (name.toLowerCase().trim() == 'test' && pw == 'test') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }

            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }

            return promise;
        }
    })