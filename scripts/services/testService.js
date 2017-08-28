/*课程评测业务处理*/
define(['services/services','services/commonService'],
    function(services) {
        services.factory('TestService', ['$http','$q','CommonService',
            function($http,$q,commonService) {
                return {
                    /*学生评测*/
                    student:9,
                    /*成人评测*/
                    adult:1,
                    /*免费*/
                    free:0,
                    /*收费*/
                    pay:1,
                    /*首页推广评测信息*/
                    geMainTest: function() {
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/main/test",method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取评测信息*/
                    getTest:function(type,fee,page){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/test/list/"+type+"/"+page+"/"+commonService.getMessageCount()+"",method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*量表信息*/
                    geIntroductInfo: function(id) {
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/test/introduct/"+id,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*量表测试题目信息*/
                    getQuestions: function(id) {
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/test/question/"+id,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*量表测试题目信息*/
                    getQuestionsByUrl: function(url) {
                        var deferred = $q.defer();
                        $http({url:url,method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*提交评测答案*/
                    testSubmit: function(id,answers,fileId) {
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/test/submit",method:"put",data:"id="+id+"&fileId="+fileId+"&answers="+answers}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*查看测试报告*/
                    getReport: function(id) {
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/api/test/report/"+id,method:"get"}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*量表测试题目分组*/
                    groupQuestions: function(item) {
                        var group=commonService.getGroup();
                        var quests=[];
                        var children=[];
                        var amount=item.length;
                        for(var i=0;i<amount;i++) {
                            children.push(item[i]);
                            if((i+1)%group==0){
                                quests.push(children);
                                children=[];
                            }

                        }
                        return quests;
                    }



                };
            }]);
    });
