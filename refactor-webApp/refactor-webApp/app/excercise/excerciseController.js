(function () {
    "use strict";

    angular.module('app').controller("excerciseController", excerciseController);

    excerciseController.$inject = ["modalDialogsService","initialData", "ptaAPI"];
    
    function excerciseController(modalDialogsService,initialData, ptaAPI) {
        /* jshint validthis: true */
        var vm = this;
        vm.excercises = initialData;
        vm.addItem = addItem;
        vm.cancelEdit = cancelEdit;
        vm.currentEdit = {};
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.hideAlert = hideAlert;
        vm.itemToEdit = {};
        vm.saveItem = saveItem;
        vm.showHelpAlert = true;

        activate();

        ////////////////

        function activate() {
        }

        function addItem() {
            var newExcercise = {
        
            };
            ptaAPI.addExcercise(newExcercise).then(function(data) {
                vm.newExcerciseName = "";
                vm.excercises.push(data);
            });
        }

        function deleteItem(id) {
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function () {
                    eliteApi.deleteLeague(id).then(function (data) {
                        _.remove(vm.leagues, { 'id': id });
                    });
                });
        }

        function editItem(item) {
            vm.currentEdit[item.id] = true;
            vm.itemToEdit = angular.copy(item);
        }

        function hideAlert() {
            vm.showHelpAlert = false;
        }

        function saveItem(item) {
            ptaAPIApi.saveExcercise(vm.itemToEdit).then(function (data) {
                vm.currentEdit[item.id] = false;
                item.name = vm.itemToEdit.name;
            });
        }

    }

})();