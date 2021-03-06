﻿(function () {
    //this is a JSON store to simulate going to a server for my widget data, due to time constraints I am loading the data for the widgets from here

    "use strict";
    angular.module('app').factory('dataService',
    ['$timeout',
    function ($timeout) {

        var excercises = [
           {
               excerciseId: "1",
               excerciseName: "Straight Leg Lift",
               description: "Lying on back lift leg in locked position.",
               repetitions: " 40"
           },
           {
               excerciseId: "2",
               excerciseName: "Side Leg Lift",
               description: "Lying on side lift leg in locked position.",
               repetitions: " 40"
           },
           {
               excerciseId: "3",
               excerciseName: "Quad Fire",
               description: "Seated with leg straight, tighten your quad and hold.",
               epetitions: " 40"
           },
           {
               excerciseId: "4",
               excerciseName: "Pateller mobilization",
               description: "Seated with leg straight, move patella.",
               repetitions: " 40"
           },
           {
               excerciseId: "5",
               excerciseName: "Standing Leg Lift",
               description: "From standing position lift leg leg.",
               repetitions: " 40"
           }
        ];
       
        var programs = [
            {
                id: 1000,
                name: 'ACL rehab',
                duration: '12 weeks',
                excercises: 20,
                therapist: 1,
                image: 'ACL.jpg'
            },
            {
                id: 1001,
                name: 'meniscus Repair',
                duration: '8 weeks',
                excercises: 20,
                therapist: 1,
                image: 'knee.jpg'
            },
            {
                id: 1002,
                name: 'Roator Cuff Rehab',
                duration: '22 weeks',
                excercises: 20,
                therapist: 1,
                image: 'rotator.jpg'
            },
            {
                id: 1003,
                name: 'Hip replacement rehab',
                duration: '32 weeks',
                excercises: 20,
                therapist: 1,
                image: 'hip.jpg'
            },
            {
                id: 1004,
                name: 'Bursitis rehab',
                duration: '12 weeks',
                excercises: 20,
                therapist: 1,
                image: 'knee.jpg'
            },
            {
                id: 1005,
                name: 'Carpal Tunnel rehab',
                duration: '24 weeks',
                excercises: 20,
                therapist: 1,
                image: 'carp.jpg'
            },
            {
                id: 1006,
                name: 'radial Ulnar rehab',
                duration: '18 weeks',
                excercises: 20,
                therapist: 1,
                image: 'RURehab.jpg'
            },
            {
                id: 1007,
                name: 'lower back rehab',
                duration: '22 weeks',
                excercises: 20,
                therapist: 1,
                image: 'back.png'
            }
        ];

        var providers = [
            {
                id: 5000,
                name: 'Andy Chatterton',
                location: 'Clinic A',
                image: 'doctor-1.jpg'
            },
            {
                id: 5001,
                name: 'April Donaldson',
                location: 'Clinic A',
                image: 'doctor-7.jpg'
            },
            {
                id: 5002,
                name: 'Don Morgan',
                location: 'Clinic B',
                image: 'doctor-2.jpg'
            },
            {
                id: 5003,
                name: 'Tom Sullivan',
                location: 'Clinic C',
                image: 'doctor-4.jpg'
            },
            {
                id: 5004,
                name: 'Kathy Fletcher',
                location: 'Clinic C',
                image: 'doctor-3.jpg'
            }
        ];

        var patients = [
            {
                id: 2000,
                name: 'Joe Smith',
                injury: 'ACL tear',
                excercises: 20,
                therapist: 1,
                image: 'ACL.jpg'
            },
            {
                id: 2001,
                name: 'Ali Longe',
                injury: 'meniscus tear',
                excercises: 20,
                therapist: 1,
                image: 'knee.jpg'
            },
            {
                id: 2002,
                name: 'Darwin mazur',
                injury: 'Roator Cuff',
                excercises: 20,
                therapist: 1,
                image: 'rotator.jpg'
            },
            {
                id: 2003,
                name: 'Chazz Collette',
                injury: 'Hip replacement',
                excercises: 20,
                therapist: 1,
                image: 'hip.jpg'
            },
            {
                id: 2004,
                name: 'John Doe',
                injury: 'Trocanteric Bursitis',
                excercises: 20,
                therapist: 1,
                image: 'knee.jpg'
            },
            {
                id: 2005,
                name: 'Jessica Smith',
                injury: 'Carpal Tunnel',
                excercises: 20,
                therapist: 1,
                image: 'carp.jpg'
            },
            {
                id: 2006,
                name: 'Benny Boxman',
                injury: 'radial Ulnar Fracture',
                excercises: 20,
                therapist: 1,
                image: 'RURehab.jpb'
            },
            {
                id: 2007,
                name: 'Barry Blue',
                injury: 'lower back sprain',
                excercises: 20,
                therapist: 1,
                image: 'back.png'
            }
        ];

        var getPrograms = function () {
            return $timeout(function () {
                return programs;
            }, 500);
        };

        var getProgram = function (id) {
            var timeout = $timeout(function () {
                for (var i = 0; i < programs.length; i++)
                    if (programs[i].id == id)
                        return programs[i];
                return undefined;
            }, 300);

            return timeout;
        };

        var getProviders = function () {
            return $timeout(function () {
                return providers;
            }, 500);
        };

        var getProvider = function (id) {
            return $timeout(function () {
                for (var i = 0; i < providers.length; i++)
                    if (providers[i].id == id)
                        return providers[i];
                return undefined;
            }, 300);
        };

        var getPatients = function() {
            return $timeout(function() {
                return patients;
            },500);
        }

        var getPatient = function (id) {
            return $timeout(function() {
                for (var i = 0; i < patients.length; i++)
                    if (patients[i].id == id)
                        return patients[i];
                return undefined;
            }, 300);
        }

        return {
            getPrograms: getPrograms,
            getProgram: getProgram,
            getProviders: getProviders,
            getProvider: getProvider,
            getPatients: getPatients,
            getPatient: getPatient
        };
    }]);
})();