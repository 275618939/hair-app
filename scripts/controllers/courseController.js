define(['controllers/controllers', 'services/courseService', 'services/paramService'],
    function(controllers) {
        /*加载首页课堂信息*/
        controllers.controller('MainCourseCtrl', ['$scope', 'CourseService',
            function($scope, courseService) {
                /* $scope.courseItems =[
                 {id:1,name:"心理健康指数",interval:3000,icon:"images/healthy.png",pv:23},
                 {id:2,name:"心理健康指数",interval:6000,icon:"images/healthy.png",pv:43},
                 {id:3,name:"心理健康指数",interval:9000,icon:"images/healthy.png",pv:63}
                 ];*/
                var promise = courseService.geMainCourse();
                promise.then(function(data) {
                    $scope.courseItems =data.value;
                });
            }]);
        /*加载课程信息*/
        controllers.controller('CourseEntryListCtrl', ['$scope', 'CourseService',
            function($scope, courseService) {
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = courseService.getEntryListByPage($scope.currentPage);
                    promise.then(function(data) {
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var id,name,icon,interval,pv;
                        for(var item in data.value){
                            id=data.value[item].id;
                            name=data.value[item].name;
                            icon=data.value[item].icon;
                            interval=data.value[item].interval;
                            pv=data.value[item].pv;
                            interval=Math.round(interval/60);
                            //window.console.log("------------->>>"+interval);

                            var v=$("<div class='zhw-item-course-list' ng-repeat='item in entryItems' ><a href='courseShow.html?id="+id+"&name="+name+"'> <div class='img'><img  src='"+icon+"'/></div><div class='des'><div  class='classTop'><h3>"+name+"</h3></div><div  class='laLeft'><label>时长：<label>"+interval+"</label>分钟</label></div><div  class='laRight'><label>点击量：<label>"+pv+"</label></label></div></div></a></div>");

                            v.appendTo($("#infoContent"));
                        }



                    });
                };
                $scope.load();
                $(window).scroll(function () {
                    var bot = 50; //bot是底部距离的高度
                    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                        $scope.currentPage+=1;
                        if($scope.dataLen<=0){
                            $scope.currentPage-=1;
                            return;
                        }
                        $scope.load();
                    }
                });

                /* var promise = courseService.getEntryList();
                 promise.then(function(data) {
                     if(data.state==1) {
                         $scope.entryItems = data.value;
                     }else{
                         alert(data.desc);
                     }
                 });*/
            }]);
        /*加载主题课程信息*/
        controllers.controller('CourseClassListCtrl', ['$scope', 'CourseService',
            function($scope, courseService) {
                var promise = courseService.getClassList();
                promise.then(function(data) {
                    if(data.state==1) {
                        $scope.classItems = data.value;
                    }else{
                        alert(data.desc);
                    }
                });
            }]);
        /*加载主题课程详细列表信息*/
        controllers.controller('CourseClassDetailListCtrl', ['$scope', 'CourseService','ParamService',
            function($scope, courseService,paramService) {
                $scope.classId=paramService.getValue("id");
                $scope.className=paramService.getValue("name");
                /* var promise = courseService.getClassBanner($scope.classId);
                 promise.then(function(data) {
                 if(data.state==1) {
                 $scope.classBanner = data.value[0].image;
                 }else{
                 $scope.classBanner="images/courseDetail.png";
                 }
                 });
                 promise = courseService.getClassGuide($scope.classId);
                 promise.then(function(data) {
                 if(data.state==1) {
                 $scope.classGuide = data.value;
                 }else{
                 $scope.classGuide = data.desc;
                 }
                 });*/
                var promise = courseService.getClassItems($scope.classId);
                promise.then(function(data) {
                    if(data.state==1) {
                        $scope.classItems = data.value;
                    }
                });


            }]);

        /*加载主题课程详情信息*/
        controllers.controller('CourseClassDetailCtrl', ['$scope', 'CourseService','ParamService',
            function($scope, courseService,paramService) {
                $scope.detailId=paramService.getValue("id");
                $scope.coureName=paramService.getValue("name");


                $scope.toggleMenuCollection = function() {
                    var promise = courseService.putCollection($scope.detailId,courseService.collection);
                    promise.then(function(data) {
                        if(data.state==1) {
                            $("#addCollection").hide();
                            $("#cancelCollection").show();
                        }else{
                            alert(data.desc);
                        }
                    });
                };
                $scope.toggleMenuCollectionCancel = function() {
                    var promise = courseService.putCollection($scope.detailId,courseService.cancelCollection);
                    promise.then(function(data) {
                        if(data.state==1) {
                            $("#cancelCollection").hide();
                            $("#addCollection").show();
                        }else{
                            alert(data.desc);
                        }
                    });
                };

                $scope.loadCollectionCheck=function(){
                    var promise = courseService.getCollectionCheck( $scope.detailId);
                    promise.then(function(data) {
                        if(data.state==1) {
                            if (data.value == 1) {
                                $("#addCollection").hide();
                                $("#cancelCollection").show();
                            }else{
                                $("#addCollection").show();
                                $("#cancelCollection").hide();
                            }
                        }
                    });
                }
                $scope.loadCollectionCheck();

                $scope.loadCourse=function(){
                    var promise = courseService.getCourseDetail( $scope.detailId);
                    promise.then(function(data) {
                        if(data.state==1) {
                            $scope.id= data.value.id;
                            $scope.name= data.value.name;
                            $scope.brief= data.value.brief;
                            $scope.icon= data.value.icon;
                            $scope.interval= data.value.interval;
                            $scope.download= data.value.download;
                            $scope.collection= data.value.collection;
                            $scope.pv= data.value.pv;
                            $scope.price= data.value.price;
                            $scope.url= data.value.url;
                            //$scope.url="http://101.200.176.217/app/videos/cars.mp4";
                            $scope.downname= courseService.getDownName( $scope.url);
                        }
                    });
                };
                //加载课程信息
                $scope.loadCourse();
                $scope.onLineLook=function(){
                    courseService.putUserCourse( $scope.detailId,courseService.lineLook);
                    window.location.href="play.html?id="+ $scope.id+"&name="+$scope.name+"&url="+ $scope.url+"&icon="+$scope.icon+"&interval="+$scope.interval;
                };
                $scope.onCollection=function(){

                    var promise= courseService.putUserCourse( $scope.detailId,courseService.collection);
                    promise.then(function(data) {
                        iosOverlay({
                            text: "收藏:"+data.desc,
                            duration: 2e3,
                            icon: "images/check.png"
                        });
                        //alert("收藏:"+data.desc);
                        $scope.loadCourse();

                    });
                };
                $scope.onDownload=function(){
                    courseService.putUserCourse( $scope.detailId,courseService.download);
                    //window.location.href=$scope.url;
                    if(/\((iPhone|iPad|iPod)/i.test(navigator.userAgent)){
                        window.location.href="erro1.html?info=对不起暂不支持IOS系统下载!";
                    }else{
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

        /*课程在线播放信息*/
        controllers.controller('CoursePlayCtrl', ['$scope', 'CourseService','ParamService',
            function($scope, courseService,paramService) {
                $scope.id=paramService.getValue("id");
                $scope.name=paramService.getValue("name");
                $scope.url=paramService.getValue("url");
                $scope.icon=paramService.getValue("icon");
                $scope.interval=paramService.getValue("interval");
                //设置播放源
                $("#player").attr("src", $scope.url);
                var allTimer = $('#allTimer');
                allTimer.text(convertTime2($scope.interval));
                initPlay();
                $scope.loadStat=function(){
                    var promise = courseService.getCourseStat($scope.id);
                    promise.then(function(data) {
                        $scope.love=data.value.love;
                        $scope.comment=data.value.comment;
                        /*alert($scope.comment);*/
                    });
                };
                $scope.loadStat();
                $scope.onLove=function(){
                    var promise = courseService.putLove($scope.id,courseService.ok);
                    promise.then(function(data) {
                        if(data.state==1){
                            $scope.love=data.value;
                        }else{
                            alert("您已经点过赞了!");
                        }
                    });
                };

            }]);

        //评论信息
        controllers.controller('CourseCommetCtrl', ['$scope','$routeParams', 'CourseService','ParamService',
            function($scope,$routeParams,courseService,paramService) {
                $scope.id=paramService.getValue("id");
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.haveDate=0;
                $scope.load = function () {
                    var promise = courseService.getCommentList($scope.id,$scope.currentPage);
                    promise.then(function(data) {
                        if(data.state==1){
                            $scope.dataLen=data.value.length;
                            if($scope.dataLen>0) {
                                $("#noneComment").hide();
                                var id,informationId,userId,content,createdTime=null;
                                for (var item in data.value) {
                                    id = data.value[item].id;
                                    informationId = data.value[item].informationId;
                                    userId = data.value[item].userId;
                                    content = data.value[item].content;
                                    createdTime =data.value[item].createdTime;
                                    var index=createdTime.lastIndexOf('.');
                                    createdTime=createdTime.substring(0,index);
                                    var v=$("<article><p  class='content'>"+content+"</p><p class='timeTag'>"+createdTime+"</p></article>");
                                    //var v=$("<div class='zhw-item-info-list'><a href='#'><div  class='comment-name'> <b></b></div><div  class='comment-content'> <label>"+content+"</label></div><div  class='comment-time'>"+createdTime+"</div></a></div>");
                                    //var v = $("<div class='zhw-item-info-list'><a href='#'><div class='img'><img src='" + portrait + "' /></div><div class='des'><div  class='bTop'> <b>" + username + "</b></div><div  class='laLeft'> <label>" + content + "</label></div></div></a></div>");
                                    v.appendTo($("#infoContent"));
                                }
                            }else{
                                if( $scope.currentPage==1){
                                    $("#noneComment").show();
                                }
                            }

                        }

                    });
                };
                $scope.load();
                $(window).scroll(function () {
                    var bot = 50; //bot是底部距离的高度
                    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {
                        $scope.currentPage+=1;
                        if($scope.dataLen<=0){
                            $scope.currentPage-=1;
                            return;
                        }
                        $scope.load();
                    }
                });
                //发布评论
                $scope.commentClick=function(){
                    var commentContent=$("#commentContent").val();
                    var len=commentContent.length;
                    if(len<=0){
                        alert("请输入评论内容!");
                        return;
                    }
                    if(len>100){
                        alert("评论内容最多100个字符!");
                        return;
                    }
                    var promise = courseService.putComment( $scope.id,commentContent);
                    promise.then(function(data) {
                        if(data.state==1){
                            $("#infoContent").empty();
                            $scope.currentPage = 1;
                            $scope.load();
                        }else{
                            alert(data.desc);
                        }
                    });


                }

            }]);

    });

