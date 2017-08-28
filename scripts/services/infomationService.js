/*信息分类业务处理*/
define(['services/services','services/commonService'],
    function(services) {
        services.factory('InfomationService', ['$http','$q','CommonService',
            function($http,$q,commonService) {
                return {
                    //获取主页热点资讯信息
                    getMainInformation: function() {
                        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                        $http({url:"http://"+commonService.getServerUrl()+"/api/main/information",method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);   // 声明执行失败，即服务器返回错误
                        });
                        return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
                    },
                    //获取资讯分类列表
                    getClassList :function(){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/classList",method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    //获取资讯信息推广位
                    getClassBannerList :function(id){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/banners/"+id,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    //获取资讯信息
                    getInfoList :function(id,page){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/list/"+id+"/"+page+"/"+commonService.getMessageCount(),method:"get",data:{classId:id,pageNo:page,pageSize:commonService.getMessageCount()}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    //获取资讯信息详情
                    getInfoDetail :function(id){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/detail/"+id,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    //获取是否赞过资讯信息
                    getLoveCheck :function(id){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/loveCheck/"+id,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    //资讯信息赞
                    putLove :function(id,ok){
                        var deferred = $q.defer();
                        id=parseInt(id);
                        //data:{id:id,ok:ok}
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/love",method:"PUT",data:"id="+id+"&ok="+ok}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                      /*  $.ajax({cache: false, type: "PUT", url:"http://"+commonService.getServerUrl()+"/api/information/love", async: false,
                            data:"id="+id+"&ok="+ok,
                            beforeSend: function(XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader("Session-Id","e10adc3949ba59abbe56e057f20f883e");
                            },
                            error: function(request,textStatus, errorThrown) {
                                deferred.reject(data);
                            },
                            success: function(data) {
                                deferred.resolve(data);
                            }
                        });*/
                        return deferred.promise;
                    },
                    //赞
                    love:function(){
                        return 1;
                    },
                    // 取消赞
                    cancelLove:function(){
                    return 0;
                    },
                    // 信息评论
                    putComment:function(id,content){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/comment",method:"PUT",data:"id="+id+"&content="+content}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                       /* $.ajax({cache: false, type: "PUT", url:"http://"+commonService.getServerUrl()+"/api/information/comment", async: false,
                            data:"id="+id+"&content="+content,
                            beforeSend: function(XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader("Session-Id","e10adc3949ba59abbe56e057f20f883e");
                            },
                            error: function(request,textStatus, errorThrown) {
                                deferred.reject(data);
                            },
                            success: function(data) {
                                deferred.resolve(data);
                            }
                        });*/
                        return deferred.promise;
                    },
                    //获取信息评论
                    getInfoComment :function(id,page){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/information/commentList/"+id+"/"+page+"/"+commonService.getMessageCount(),method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    }

                };
            }]);
    });
