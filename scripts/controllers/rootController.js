define(['controllers/controllers', 'services/messageService'],
  function(controllers) {
    controllers.controller('RootCtrl', ['$scope', 'MessageService',
      function($scope, MessageService) {
          var promise = MessageService.getMessager(); // 同步调用，获得承诺接口
          promise.then(function(data) {  // 调用承诺API获取数据 .resolve
              $scope.items = data.dataList;
          }, function(data) {
                // 处理错误 .reject
              //$scope.user = {error: '用户不存在！'};
          });

          //$scope.items = MessageService.getMessager();
    }]);
});
//根据数据的变化，显示和隐藏
/*ng-show='menuState.show'
$scope.menuState={'show':false};
showState = function() {
 $scope.menuState.show = !$scope.menuState.show;
 };
 $scope.$watch('funding.items', showState);*/
