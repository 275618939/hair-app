define(['controllers/controllers', 'services/messageService'],
  function(controllers) {
    controllers.controller('RootCtrl', ['$scope', 'MessageService',
      function($scope, MessageService) {
          var promise = MessageService.getMessager(); // ͬ�����ã���ó�ŵ�ӿ�
          promise.then(function(data) {  // ���ó�ŵAPI��ȡ���� .resolve
              $scope.items = data.dataList;
          }, function(data) {
                // ������� .reject
              //$scope.user = {error: '�û������ڣ�'};
          });

          //$scope.items = MessageService.getMessager();
    }]);
});
//�������ݵı仯����ʾ������
/*ng-show='menuState.show'
$scope.menuState={'show':false};
showState = function() {
 $scope.menuState.show = !$scope.menuState.show;
 };
 $scope.$watch('funding.items', showState);*/
