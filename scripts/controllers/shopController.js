define(['controllers/controllers', 'services/shopService', 'services/paramService'],
    function (controllers) {
        /*加载店信息*/
        controllers.controller('ShopListCtrl', ['$scope', 'ShopService',
            function ($scope, shopService) {
                $scope.currentPage = 0;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = shopService.getShopList($scope.currentPage);
                    promise.then(function (data) {
                        $scope.shopItems = data.value;
                    });
                };
                $scope.load();
                $(window).scroll(function () {
                    var bot = 50; //bot是底部距离的高度
                    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                        $scope.currentPage += 1;
                        if ($scope.dataLen <= 0) {
                            $scope.currentPage -= 1;
                            return;
                        }
                        $scope.load();
                    }
                });

            }]);

        /*加载主题课程详情信息*/
        controllers.controller('CourseClassDetailCtrl', ['$scope', 'CourseService', 'ParamService',
            function ($scope, courseService, paramService) {
                $scope.detailId = paramService.getValue("id");
                $scope.coureName = paramService.getValue("name");


                $scope.toggleMenuCollection = function () {
                    var promise = courseService.putCollection($scope.detailId, courseService.collection);
                    promise.then(function (data) {
                        if (data.state == 1) {
                            $("#addCollection").hide();
                            $("#cancelCollection").show();
                        } else {
                            alert(data.desc);
                        }
                    });
                };
                $scope.toggleMenuCollectionCancel = function () {
                    var promise = courseService.putCollection($scope.detailId, courseService.cancelCollection);
                    promise.then(function (data) {
                        if (data.state == 1) {
                            $("#cancelCollection").hide();
                            $("#addCollection").show();
                        } else {
                            alert(data.desc);
                        }
                    });
                };

                $scope.loadCollectionCheck = function () {
                    var promise = courseService.getCollectionCheck($scope.detailId);
                    promise.then(function (data) {
                        if (data.state == 1) {
                            if (data.value == 1) {
                                $("#addCollection").hide();
                                $("#cancelCollection").show();
                            } else {
                                $("#addCollection").show();
                                $("#cancelCollection").hide();
                            }
                        }
                    });
                }
                $scope.loadCollectionCheck();

                $scope.loadCourse = function () {
                    var promise = courseService.getCourseDetail($scope.detailId);
                    promise.then(function (data) {
                        if (data.state == 1) {
                            $scope.id = data.value.id;
                            $scope.name = data.value.name;
                            $scope.brief = data.value.brief;
                            $scope.icon = data.value.icon;
                            $scope.interval = data.value.interval;
                            $scope.download = data.value.download;
                            $scope.collection = data.value.collection;
                            $scope.pv = data.value.pv;
                            $scope.price = data.value.price;
                            $scope.url = data.value.url;
                            //$scope.url="http://101.200.176.217/app/videos/cars.mp4";
                            $scope.downname = courseService.getDownName($scope.url);
                        }
                    });
                };
                //加载课程信息
                $scope.loadCourse();
                $scope.onLineLook = function () {
                    courseService.putUserCourse($scope.detailId, courseService.lineLook);
                    window.location.href = "play.html?id=" + $scope.id + "&name=" + $scope.name + "&url=" + $scope.url + "&icon=" + $scope.icon + "&interval=" + $scope.interval;
                };
                $scope.onCollection = function () {

                    var promise = courseService.putUserCourse($scope.detailId, courseService.collection);
                    promise.then(function (data) {
                        iosOverlay({
                            text: "收藏:" + data.desc,
                            duration: 2e3,
                            icon: "images/check.png"
                        });
                        //alert("收藏:"+data.desc);
                        $scope.loadCourse();

                    });
                };
                $scope.onDownload = function () {
                    courseService.putUserCourse($scope.detailId, courseService.download);
                    //window.location.href=$scope.url;
                    if (/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
                        window.location.href = "erro1.html?info=对不起暂不支持IOS系统下载!";
                    } else {
                        $("#courseDown").attr("href", $scope.url);
                    }

                    /*     if(window.confirm('您确定要下载吗？')){
                     $("#courseDown").attr("href", $scope.url);
                     return true;
                     }
                     return false;*/
                    //$("#courseDown").attr("href",$scope.url);
                    //var blob = new Blob([$scope.url]);
                    /*        var fileURL=window.open ($scope.url,"_blank","height=0,width=0,toolbar=no,menubar=no,scrollbars=no,resizable=on,location=no,status=no");
                     fileURL.document.execCommand("SaveAs");
                     fileURL.window.close();
                     fileURL.close();*/

                };

            }]);


    });

