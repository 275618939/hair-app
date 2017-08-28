define(['services/services'],
  function(services) {
    services.factory('MessageService', ['$http','$q',
      function($http,$q) {
          return {
          getMessager: function() {
               var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
               /* var value= [
                  {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
                  {title: 'Polka dots', description: 'Dots with polka', price: 2.95},
                  {title: 'Pebbles', description: 'Just little rocks', price: 6.95}];*/

                $http({url:"http://localhost:8081/cms-web/cgi/test_getData.api",method:"post",data:{login:"刘",email:"275618939@qq.com"}}).success(function(data, status, headers, config){
                         deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                   }).error(function(data, status, headers, config){
                        deferred.reject(data);   // 声明执行失败，即服务器返回错误
                   });
                  return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
          }
        };
      }]);
  });
