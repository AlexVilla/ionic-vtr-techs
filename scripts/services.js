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
            };

            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };

            return promise;
        }
    })

    .service('TaskService', function(){
        var tasks = [{
            _id: 0,
            estado: "Pendiente",
            ubicacion: [{
                nodo: 3,
                cuadrante: 23,
                lat: "-33.429100",
                long: "-70.645288",
                comuna:  'Renca'
            }],
            descripcion: "Cables rotos",
            responsable_terreno: "Papelucho",
            tecnico: "JARRO",
            hora_creacion: "1488993389",
            hora_cierre: "",
            img: [{

            }]

        },{
            _id: 1,
            estado: "Pendiente",
            ubicacion: [{
                nodo: 1,
                cuadrante: 97,
                lat: "-33.429100",
                long: "-70.645288",
                comuna:  'Providencia'
            }],
            descripcion: "Cables rotos",
            responsable_terreno: "Papelucho",
            tecnico: "JARRO",
            hora_creacion: "1488993389",
            hora_cierre: "",
            img: [{

            }]

        },{
            _id: 2,
            estado: "Incompleto",
            ubicacion: [{
                nodo: 2,
                cuadrante: 43,
                lat: "-33.429100",
                long: "-70.645288",
                comuna:  'Las Condes'
            }],
            descripcion: "Cables rotos",
            responsable_terreno: "Papelucho",
            tecnico: "JARRO",
            hora_creacion: "1483419600",
            hora_cierre: "",
            img: [{

            }]

        },{
            _id: 3,
            estado: "Terminado",
            ubicacion: [{
                nodo: 3,
                cuadrante: 43,
                lat: "-33.429100",
                long: "-70.645288",
                comuna:  'Renca'
            }],
            descripcion: "Cables rotos",
            responsable_terreno: "Papelucho",
            tecnico: "JARRO",
            hora_creacion: "1488993389",
            hora_cierre: "1488993466",
            img: [{

            }]

        }];
        //Math.round((new Date()).getTime() / 1000);
        this.getTask = function(){
            return tasks;
        };

        this.getNodes = function(){
            var nodos = [];
            for(var i = 0; i < tasks.length; i++){
                nodos[i] = tasks[i].ubicacion[0].nodo;
            }

            return nodos.sort();
        };

        this.getComunas = function(){
            var comunas =  [];
            for(var i = 0; i < tasks.length; i++){
                comunas[i] = tasks[i].ubicacion[0].comuna;
            }

            return comunas.sort();
        };

        this.getCuadrantes = function(){
            var cuadrantes = [];
            for(var i = 0; i < tasks.length; i++){
                cuadrantes[i] = tasks[i].ubicacion[0].cuadrante;
            }

            return cuadrantes.sort();
        };

        this.getStatus = function(){
            var status = [];
            for(var i = 0; i < tasks.length; i++){
                status[i] = tasks[i].estado;
            }

            return status.sort();
        };

        this.finishedTask = function(){
            var task = [];
            for(var i = 0; i < tasks.length; i++){
                if (tasks[i].estado == "Terminado"){
                    task[i] = tasks[i];
                }
            }
            return task;
        };

        this.pendingTask = function(){
            var task = [];
            for(var i = 0; i < tasks.length; i++){
                if (tasks[i].estado == "Pendiente"){
                    task[i] = tasks[i];
                }
            }
            return task;
        };

        this.uncompleteTask = function(){
            var task = [];
            for(var i = 0; i < tasks.length; i++){
                if (tasks[i].estado == "Incompleto"){
                    task[i] = tasks[i];
                }
            }
            return task;
        };
    })

    .service('DetailService', function(){

    });