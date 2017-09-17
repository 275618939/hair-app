/*课程评测业务处理*/
define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('CourseService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    /*赞*/
                    ok: 1,
                    /*取消赞*/
                    cancelOk: 0,
                    /*收藏*/
                    collection: 1,
                    /*取消赞*/
                    cancelCollection: 0,
                    /*在线观看*/
                    lineLook: 1,
                    /*下载*/
                    download: 2,
                    /*收藏*/
                    collection: 3,
                    /*首页推广课程评测*/
                    geMainCourse: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/main/course",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取心理课堂信息*/
                    getEntryListByPage: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/entryList/" + page + "/" + commonService.getMaxNumber() + "",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取心理课堂信息*/
                    getEntryList: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/entryList/" + commonService.getCurrentPage() + "/" + commonService.getMaxNumber() + "",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂信息*/
                    getClassList: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/classList/" + commonService.getCurrentPage() + "/" + commonService.getMaxNumber() + "",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂Banner信息*/
                    getClassBanner: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/banners/" + id,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂指导语信息*/
                    getClassGuide: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/guide/" + id,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂课程列表信息*/
                    getClassItems: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/list/" + id + "/" + commonService.getCurrentPage() + "/" + commonService.getMaxNumber() + "",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂详细信息*/
                    getCourseDetail: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/detail/" + id,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课程是否收藏*/
                    getCollectionCheck: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/collectionCheck/" + id,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取主题课堂统计信息信息*/
                    getCourseStat: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/stat/" + id,
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*课程操作*/
                    putUserCourse: function (id, type) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/learn",
                            method: "post",
                            data: "id=" + id + "&type=" + type
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*课程是否获得赞*/
                    getLoveCheck: function (id) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/loveCheck/" + id,
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*课程收藏*/
                    putCollection: function (id, ok) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/collection",
                            method: "put",
                            data: "id=" + id + "&ok=" + ok
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*课程赞*/
                    putLove: function (id, ok) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/love",
                            method: "put",
                            data: "id=" + id + "&ok=" + ok
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*课程评价*/
                    putComment: function (id, content) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/comment",
                            method: "put",
                            data: "id=" + id + "&content=" + content
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取评论列表信息*/
                    getCommentList: function (id, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/course/commentList/" + id + "/" + page + "/" + commonService.getMessageCount() + "",
                            method: "get",
                            data: {}
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    getDownName: function (url) {
                        var index = url.lastIndexOf("/");
                        var str = url.substring(index + 1, url.length);
                        return str;
                    }

                };
            }]);
    });
