define(['controllers/controllers', 'services/bannerService', 'services/infomationService', 'services/testService', 'services/courseService','services/commonService','services/userService','services/paramService',],
    function(controllers) {
        controllers.controller('MainInitCtrl', ['$scope', 'CommonService','UserService','ParamService','$rootScope',
            function($scope, commonService,userService,paramService,$rootScope) {


                // data.start();
                /*              var unslider04 = $('#b04').unslider({
                 dots: true}),
                 data04 = unslider04.data('unslider');*/
                /* window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                 if(!window.indexedDB) {
                 alert("很遗憾,不支持IndexDb");
                 }else{
                 alert("恭喜您,支持IndexDb");
                 }*/
                var userId= paramService.getValue("uid");
                var userName=paramService.getValue("name");
                //记录userid，username 写入cookie
                if(sessionId!=null&&"undefined"!= typeof sessionId){
                    $rootScope.sessionId=sessionId;
                    commonService.addCookie("zhw-sessionId",sessionId,commonService.OneDayValidity);
                }
                commonService.addCookie("sys_userId",userId,commonService.OneDayValidity);
                commonService.addCookie("sys_userName",userName,commonService.OneDayValidity);
                var temp= commonService.getCookie("hxId");
                //设置用户可咨询次数。
                /* var user_times= commonService.getCookie("user_times");
                 if(user_times==null||"undefined"== typeof user_times){
                 commonService.addCookie("user_times",0,commonService.ThirtyDayValidity);
                 }*/
                //获取用户信息
                if(temp==null||"undefined"== typeof temp){
                    var promise = userService.getUserInfo();
                    promise.then(function(data) {
                        if(data.state!=1){
                            return;
                        }
                        var hxId=data.value.hxId;
                        var mobile=data.value.mobile;
                        var hxLogin=data.value.hxLogin;
                        var hxPassword=data.value.hxPassword;
                        var hxNickname=data.value.hxNickname;
                        commonService.addCookie("hxId",hxId,commonService.OneDayValidity);
                        commonService.addCookie("mobile",mobile,commonService.OneDayValidity);
                        commonService.addCookie("hxLogin",hxLogin,commonService.OneDayValidity);
                        commonService.addCookie("hxPassword",hxPassword,commonService.OneDayValidity);
                        commonService.addCookie("hxNickname",hxNickname,commonService.OneDayValidity);
                    });
                }
                //获取用户档案信息
                $scope.fieldId=commonService.getCookie("fieldId");
                if($scope.fieldId==null||"undefined"== typeof $scope.fieldId) {
                    var promise = userService.getMyselfInfo();
                    promise.then(function (data) {
                        if (data.state != 1) {
                            return;
                        }
                        commonService.addCookie("userId",data.value.userId,commonService.OneDayValidity);
                        commonService.addCookie("fieldId",data.value.fieldId,commonService.OneDayValidity);
                        commonService.addCookie("birthday",data.value.birthday,commonService.OneDayValidity);
                        commonService.addCookie("sex",data.value.sex,commonService.OneDayValidity);
                        commonService.addCookie("marry",data.value.marry,commonService.OneDayValidity);
                        commonService.addCookie("age",commonService.getAge(data.value.birthday),commonService.OneDayValidity);
                    });
                }

            }]);
        controllers.controller('BannerCtrl', ['$scope', 'BannerService',
            function($scope, bannerService) {
                var promise = bannerService.getBanners();
                promise.then(function(data) {
                    var state=data.state;
                    var des=data.desc;

                    for(var index in data.value){
                        var item=data.value[index];
                        var url=$scope.detail(item.link);
                        var v=$("<li ><a href='"+url+"'><img src='"+item.image+"'></a></li>");
                        v.appendTo($("#infoBanner"));
                    }
                    var unslider  =  $('.touchslider').unslider({
                        speed: 1000,
                        delay: 3000,
                        init: false,
                        fluid: false
                    });
                    var slides = jQuery('.touchslider');
                    slides.on('swipeleft', function(e) {
                        unslider .prev();
                    }).on('swiperight', function(e) {
                        unslider .next();

                    });



                    /*var slidey =  $('.touchslider').unslider();*/
                    //var unslider = slidey.data('unslider');

                    //unslider.start();
                    //slidey.delay(5000);
                    /*   $scope.bannerItems =data.value;
                     $scope.$watch('bannerItems', bannerService.showBanner, true);*/
                });
                $scope.detail=function(url){
                    var index=url.indexOf("=");
                    var data=url.substring(index+1,url.length);
                    data=data.replace(/\'/g,"\"");//替换半角单引号为全角单引号
                    index=url.indexOf("couId");
                    var type= 0,id;
                    if(index>0){
                        type=1;
                    }
                    data=jQuery.parseJSON(data);
                    if(type==1){
                        //跳转到心理课堂页
                        id=data.couId;
                        return "courseShow.html?id="+id;
                        //window.location.href="courseShow.html?id="+id;
                    }else{
                        id=data.infoId;
                        return "detailInfo.html?id="+id;
                        //跳转到咨询详情页
                        //window.location.href="detailInfo.html?id="+id;
                    }
                };
            }]);
        //加载首页咨询信息
        controllers.controller('InfoCtrl', ['$scope', 'InfomationService',
            function($scope, infoService) {
                var promise = infoService.getMainInformation();
                promise.then(function(data) {
                    $scope.infoItems =data.value;
                });
            }]);
        /*加载首页评测信息*/
        controllers.controller('MainTestCtrl', ['$scope', 'TestService',
            function($scope, testService) {
                //$scope.testItems =[{id:1,name:'考试焦虑测评'},{id:2,name:'学业成就责任测评'},{id:3,name:'青少年个性测评'},{id:4,name:'同学关系测评'}];
                var promise = testService.geMainTest();
                promise.then(function(data) {
                    if(data.state!=1)
                        return;
                    var len=data.value.length;
                    var id,name,dtype,ltype,v,hr=0;
                    //data.value=[{id:1,name:'考试焦虑测评'},{id:2,name:'学业成就责任测评'},{id:3,name:'青少年个性测评'},{id:4,name:'同学关系测评'}];
                    var model=[0,1,2,3];
                    for (var item in data.value) {
                        if(hr==4){
                            hr=0;
                        }
                        var temp=model[hr];
                        if(temp==0){
                            dtype = "quarter-area-left";
                            ltype = "blue";
                        }else if(temp==1){
                            dtype = "quarter-area-right";
                            ltype = "original";
                        }else if(temp==2){
                            dtype = "quarter-area-left";
                            ltype = "original";
                        }else if(temp==3){
                            dtype = "quarter-area-right";
                            ltype = "blue";
                        }
                        id = data.value[item].id;
                        name = data.value[item].name;
                        if(name.length>6){
                            name=name.substring(0,6);
                        }
                        v=$("<div class='"+dtype+"'> <a href='evaluation.html?id="+id+"' class='"+ltype+"'>"+name+"</a></div>");
                        v.appendTo($("#main-test-info"));
                        hr++;


                    }
                    //$scope.testItems =data.value;


                });
            }]);
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


    });

