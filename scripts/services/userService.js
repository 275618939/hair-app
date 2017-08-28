define(['services/services', 'services/commonService'],
    function (services) {
        services.factory('UserService', ['$http', '$q', 'CommonService',
            function ($http, $q, commonService) {
                return {
                    downCourse: 2,
                    collectCourse: 3,
                    secrecyOpen: 0,
                    secrecyClose: 1,
                    getUser: function () {
                        return 'testUser';
                    },
                    /*获取用户咨询信息*/
                    getUserConsultList: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/myself/counseling/" + page + "/" + 10,
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取用户评测信息*/
                    getUserTestList: function (page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/myself/test/" + page + "/" + commonService.getMessageCount(),
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取用户课程信息*/
                    getUserCourseList: function (type, page) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/myself/course/" + type + "/" + page + "/" + commonService.getMessageCount(),
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*提交用户个人档案信息*/
                    postCounseling: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/user/myself",
                            method: "post",
                            data: "birthday=" + data.birthday + "&sex=" + data.sex + "&marry=" + data.marry
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户注册*/
                    userCreate: function (data) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/account/register",
                            method: "post",
                            data: "worker=" + data.account + "&verify=" + data.verify + "&password=" + data.password
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取图片验证码*/
                    getImageVerify: function (account) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/image/verify/" + account,
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*用户发送验证码*/
                    sendVerify: function (mobile) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/business/sms/verify",
                            method: "post",
                            data: "account=" + mobile
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取用户信息*/
                    getUserInfo: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/user/find",
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取用户档案信息*/
                    getMyselfInfo: function (userId) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/user/myself",
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*获取评测状态信息*/
                    getSecrecy: function () {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/user/secrecy",
                            method: "get"
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    /*设置评测状态信息*/
                    putSecrecy: function (secrecy, fileId) {
                        var deferred = $q.defer();
                        $http({
                            url: "http://" + commonService.getServerUrl() + "/api/user/secrecy",
                            method: "post",
                            data: "secrecy=" + secrecy + "&fileId=" + fileId
                        }).success(function (data, status, headers, config) {
                            deferred.resolve(data);
                        }).error(function (data, status, headers, config) {
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    }

                };
            }]);
    });
