(function() {
    "use strict";

    angular.module('app').controller("userEntryController", ["$http", userEntryController]);

    function userEntryController($http) {
        var vm = this;

        vm.user = {
            userName: "jpb4815",
            userRole: "Patient",
            firstName: "John",
            lastName: "Brown",
            addressLine1: "40 Pinehurst Dr",
            addressLine2: "",
            city: "Jericho",
            county: "Chittenden",
            state: "VT",
            zipCode: "05465",
            country: "USA",
            telephone: "802-867-5309",
            telephone2: "",
            ssn: "000-87-1234",
            injuryType: "Acl tear",
            location: "",
            deaNumber: ""
        }

        vm.user.Roles = [
            {id:1, name:"Admin"},
            {id:2, name:"Doctor"},
            {id: 3, name: "Therapist"},
            {id:4, name: "Patient"}  
        ];
    }
})();