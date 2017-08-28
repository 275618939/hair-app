define(['services/services','services/commonService'],
    function(services) {
      services.factory('ConsultService', ['$http','$q','CommonService',
        function($http,$q,commonService) {
          return {
            appKey:'zhangyun#zytest',// qihunag#zhuwang zhangyun#zytest
            pass:'zhangyun6603',//
            open:1,
            close:0,
            /*获取用户咨询分类信息*/
            getClassList :function(){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/classList/"+commonService.getCurrentPage()+"/"+commonService.getMaxNumber(),method:"get"}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*提交用户咨询信息*/
            putConsultInfo :function(data){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/create",method:"put",data:"classId="+data.classId+"&content="+data.content+"&fileId="+data.fileId}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*检查咨询是否关闭*/
            getIsOpen :function(id){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/isOpen/"+id,method:"get"}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*获取咨询详细信息*/
            getConsultDetail :function(id){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/detail/"+id,method:"get"}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*获取咨询师信息*/
            getConsultInfo :function(id){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/consult/"+id,method:"get"}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*获取个人信息*/
            getMyselfInfo :function(id){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/myself/"+id,method:"get"}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*追加个人咨询信息*/
            appendConsult :function(data){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/append",method:"post",data:"id="+data.id+"&type="+data.type+"&times="+data.times+"&record="+data.record}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            },
            /*关闭咨询信息*/
            closeConsult :function(id){
              var deferred = $q.defer();
              $http({url:"http://"+commonService.getServerUrl()+"/api/counseling/close",method:"post",data:"id="+id}).success(function(data, status, headers, config){
                deferred.resolve(data);
              }).error(function(data, status, headers, config){
                deferred.reject(data);
              });
              return deferred.promise;
            }
            /*获取历史消息记录*/
           /*   getHistoryConsult:function(e){
                var data=e.target.result;
                return data;
              }*/

          };
        }]);
    });
