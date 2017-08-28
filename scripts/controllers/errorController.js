define(['controllers/controllers', 'services/paramService'],
  function(controllers) {
    controllers.controller('ErrorCtrl', ['$scope', 'ParamService',
      function($scope, paramService) {
          $scope.desc=paramService.getValue("info");
    }]);
});

