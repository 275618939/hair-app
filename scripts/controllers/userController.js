define(['controllers/controllers',  'services/userService','services/commonService','services/consultService', 'services/paramService', 'services/courseService', 'services/consultDaoService'],
    function(controllers) {
        /*用户的评测历史*/
        controllers.controller('UserTestCtrl', ['$scope','UserService','CommonService','$rootScope',
            function($scope,userService,commonService,$rootScope) {

                $scope.fieldId=commonService.getCookie("fieldId");
                $scope.onSwitch=function(){
                    $('.mwui-switch-btn').each(function() {
                        $(this).bind("click", function() {
                            var btn = $(this).find("span");
                            var change = btn.attr("change");
                            btn.toggleClass('off');
                            if(btn.attr("class") == 'on off') {
                                $(this).find("input").val("0");
                                btn.attr("change", btn.html());
                                btn.html(change);
                                $(this).css("background","#eb6137");

                                //关闭评测
                                userService.putSecrecy(userService.secrecyOpen,parseInt($scope.fieldId));
                            } else {
                                $(this).find("input").val("1");
                                btn.attr("change", btn.html());
                                btn.html(change);
                                $(this).css("background","#eaeaea");
                                //开放评测
                                userService.putSecrecy(userService.secrecyClose,parseInt($scope.fieldId));
                            }
                            return false;
                        });
                    });
                };
                $scope.onSwitch();

                //获取个人评测开发状态
                $scope.secrecy=0;
                var tem_secrecy = userService.getSecrecy();
                tem_secrecy.then(function(data) {
                    if(data.state!=1){
                        return;
                    }
                    $scope.secrecy=data.value.secrecy;
                    if($scope.secrecy==0){
                        $('.mwui-switch-btn').each(function() {
                            $(this).trigger("click");
                        });
                    }
                    commonService.addCookie("userId",data.value.userId,commonService.OneDayValidity);
                    commonService.addCookie("fileId",data.value.fieldId,commonService.OneDayValidity);
                });

                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = userService.getUserTestList($scope.currentPage);
                    promise.then(function(data) {
                        if(data.state!=1){
                            return;
                        }
                        $scope.dataLen=data.value.length;
                        var id,name,open=null;
                        for(var item in data.value){
                            id=data.value[item].id;
                            name=data.value[item].name;
                            open=data.value[item].open;
                            //var url=commonService.reportUrl.replace("*",id);
                            var url="testReport.html?id="+id;
                            var v=$("<div class='items-show-line'><a href="+url+"><div class='des'><div  class='laLeft'>"+name+"</div><div  class='laRight'><img src='images/more.png'/></div></div></a></div>");
                            v.appendTo($("#userTestInfo "));
                        }
                    });
                }
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




            }]);
        /*用户注册*/
        controllers.controller('RegisterCtrl', ['$scope','UserService','CommonService','$rootScope',
            function($scope,userService,commonService,$rootScope) {

                $scope.showPass={'show':true};
                $scope.hidePass={'show':false};
                $scope.InterValObj; // timer变量，控制时间
                $scope.curCount=0;	  // 当前剩余秒数
                $scope.count=30;     // 倒计时长度
                $scope.codeLength = 6;// 验证码长度
                //注册
                $scope.onRegister=function(){
                    var phone=$("#phone").val();
                    var identifying=$("#identifying").val();
                    var password=$("#password").val();
                    /*  var password=null;
                     if($scope.showPass.show){
                     password=$("#password").val();
                     }
                     else if($scope.hidePass.show){
                     password=$("#showPassword").val();
                     }*/
                    if(isNaN(phone)||(phone.length!=11)){
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    if(identifying.trim()==""||identifying==null){
                        alert("请输入验证码！");
                        return;
                    }
                    /*       if(password.trim()==""||password==null){
                     alert("请输入密码！");
                     return;
                     }
                     alert(password);
                     return;*/
                    var data={cmeUserId:userId,mobile:phone,cmeUserName:userName,verify:identifying};
                    var promise = userService.userCreate(data);
                    promise.then(function(data) {
                        if(data.state!=1){
                            alert(data.desc)
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
                        window.location.href="http://"+commonService.getServerUrl()+"/app/entry?uid="+userId+"&name="+userName;
                    });
                    //记录userid，username 写入cookie
                    commonService.addCookie("userId",userId,commonService.OneDayValidity);
                    commonService.addCookie("userName",userName,commonService.OneDayValidity);
                }

                // timer处理函数
                $scope.sendCaptcha=function() {
                    var phone=$("#phone").val();
                    if(isNaN(phone)||(phone.length!=11)){
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    userService.sendVerify(phone);
                    $scope.curCount = $scope.count;
                    $("#captcha").css("background","#b2b2b2");
                    $("#captcha").attr("disabled", "true");
                    $("#captcha").text("剩余:"+$scope.count);
                    $scope.InterValObj = window.setInterval($scope.setRemainTime, 1000); // 启动计时器，1秒执行一次
                };
                // timer处理函数
                $scope.setRemainTime=function() {
                    if ($scope.curCount == 0) {
                        window.clearInterval($scope.InterValObj);// 停止计时器
                        $("#captcha").removeAttr("disabled");// 启用按钮
                        $("#captcha").text("重新发送");
                        $("#captcha").css("background","#61beec");
                    } else {
                        $scope.curCount--;
                        $("#captcha").text("剩余:"+$scope.curCount);
                    }
                };

                $scope.onShowPass=function(){
                    var n = $("input:checked").length;
                    if (n==1) {
                        $scope.showPass={'show':false};
                        $scope.hidePass={'show':true};
                        $("#showPassword").val($("#password").val());
                    }else{
                        $scope.showPass={'show':true};
                        $scope.hidePass={'show':false};
                        $("#password").val($("#showPassword").val());
                    }
                };
            }]);
        controllers.controller('InitUserCourseCtrl', ['$scope',
            function($scope) {
                $scope.load=function(){
                    $("#page-wrap div.button").click(function(){
                        $clicked = $(this);
                        if ($clicked.css("opacity") != "1" && $clicked.is(":not(animated)")) {
                            $clicked.animate({
                                opacity: 1,
                                borderWidth: 5
                            }, 600 );
                            var id=$(this).attr('id');
                            if(id=="student-button"){
                                $("#student").show();
                                $("#adult").hide();
                                $("#student-button-label").css("color","#169ada");
                                $("#adult-button-label").css("color","");

                            }else if(id=="adult-button"){
                                $("#adult").show();
                                $("#student").hide();
                                $("#student-button-label").css("color","");
                                $("#adult-button-label").css("color","#169ada");
                            }
                        }
                        $clicked.siblings(".button").animate({
                            opacity: 0.5,
                            borderWidth: 1
                        }, 600 );

                    });
                }
                $scope.load();

            }]);
        /*用户咨询信息*/
        controllers.controller('UserConsultCtrl', ['$scope','UserService','$rootScope','ConsultService','$q','CommonService',
            function($scope,userService,$rootScope,consultService,$q,commonService) {

                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = userService.getUserConsultList($scope.currentPage);
                    promise.then(function(data) {
                        if(data.state!=1){
                            return;
                        }
                        $scope.dataLen=data.value.length;
                        var id,content,classId,consultId,userId,record,createdTime,status,count='';
                        for(var item in data.value){
                            count='';
                            content=data.value[item].content;
                            id=data.value[item].id;
                            classId=data.value[item].classId;
                            userId=data.value[item].userId;
                            consultId=data.value[item].consultId;
                            record=data.value[item].records;
                            status=data.value[item].status;
                            createdTime=data.value[item].createdTime;
                            createdTime=commonService.strToShort(createdTime);

                            if(status!=null&&"undefined"!= typeof status) {
                                if (status == 0) {
                                    count = '问题已结束';
                                }
                            }
                            if(record!=null&&"undefined" != typeof record&&record.length>=1){
                                var userTimes=0,repley="";
                                for(var index in record){
                                    if(record[index].type==2){
                                        //咨询师回复
                                        repley=record[index].record;
                                    }else if(record[index].type==1){
                                        userTimes++;
                                    }
                                }
                                var v=$("<div class='usr-consult-items'><a href='consuMent.html?id="+id+"&consultId="+consultId+"&content="+content+"&repley=1&classId="+classId+"'><!--<div class='show-consult-Tag'><img src='images/new.png'/></div>--><div class='showContent'><div class='consult'><b>咨询内容</b>："+content+"</div><div class='repley'>"+repley+"</div><div class='tag'><div class='time'>"+createdTime+"</div><div class='count'>"+count+"</div></div></div></a></div>");
                                v.appendTo($("#userConsultInfo"));
                            }else{
                                var v=$("<div class='usr-consult-items'><a href='consuMent.html?id="+id+"&consultId="+consultId+"&content="+content+"&repley=0&classId="+classId+"'><!--<div class='show-consult-Tag'><img src='images/new.png'/></div>--><div class='showContent'><div class='consult'><b>咨询内容</b>："+content+"</div><div class='repley'></div><div class='tag'><div class='time'>"+createdTime+"</div><div class='count'>"+count+"</div></div></div></a></div>");
                                v.appendTo($("#userConsultInfo"));

                            }
                        }
                        //consultDaoService.closeDb();
                    });
                }

                $scope.load();
                $(window).scroll(function () {
                    var bot = 200; //bot是底部距离的高度
                    //alert(bot + $(window).scrollTop());
                    //alert($(document).height() - $(window).height());
                    if ((bot + $(window).scrollTop()) >= ($(document).height() - $(window).height())) {

                        $scope.currentPage+=1;
                        if($scope.dataLen<=0){
                            $scope.currentPage-=1;
                            return;
                        }
                        $scope.load();
                    }
                });


            }]);
        /*加载用户下载课程信息*/
        controllers.controller('UserDownCtrl', ['$scope', 'UserService', 'CourseService',
            function($scope, userService,courseService) {
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = userService.getUserCourseList(userService.downCourse,$scope.currentPage);
                    promise.then(function(data) {
                        if(data.state!=1){
                            return;
                        }
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var name,image=null;
                        for(var item in data.value){
                            var id=data.value[item];
                            var promise = courseService.getCourseDetail(id);
                            promise.then(function(data2) {
                                if(data2.state==1) {
                                    id=data2.value.id
                                    name= data2.value.name;
                                    image= data2.value.icon;
                                    var v=$("<div class='zhw-item-course-list'><a href='courseShow.html?id="+id+"&name="+name+"'><div class='img'><img  src='"+image+"'/></div><div class='des'><label>"+name+"</label></div></a></div>");
                                    v.appendTo($("#student"));
                                }
                            });
                            /* id=data.value[item].id;
                             name=data.value[item].name;
                             image=data.value[item].image;*/
                            //查询课程详情

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
            }]);
        /*加载用户收藏课程信息*/
        controllers.controller('UserCollectCtrl', ['$scope', 'UserService', 'CourseService',
            function($scope, userService,courseService) {

                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = userService.getUserCourseList(userService.collectCourse,$scope.currentPage);
                    promise.then(function(data) {
                        if(data.state!=1){
                            return;
                        }
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var name,brief,image=null;
                        for(var item in data.value){
                            var id=data.value[item];
                            var promise = courseService.getCourseDetail(id);
                            promise.then(function(data2) {
                                if(data2.state==1) {
                                    id=data2.value.id;
                                    name= data2.value.name;
                                    image= data2.value.icon;
                                    brief= data2.value.brief;
                                    if(brief.length>27){
                                        brief=brief.substring(0,27)+"...";
                                    }
                                    var v=$("<div class='zhw-item-image-list'><a href='courseShow.html?id="+id+"&name="+name+"'><img src='"+image+"' /><div  class='title'> "+name+"</div><div  class='content'> "+brief+"</div></a></div>");
                                    //var v=$("<div class='zhw-item-review-list'><a href='courseShow.html?id="+id+"&name="+name+"'><div class='img'><img src='"+image+"'  /></div><div class='des'><div class='title'>"+name+"</div><div class='content'>"+brief+"</div></div></a></div>");
                                    v.appendTo($("#adult"));
                                }
                            });
                            /* id=data.value[item].id;
                             name=data.value[item].name;
                             image=data.value[item].image;
                             var v=$("<div class='zhw-item-review-list'><a href='courseShow.html?id="+id+"&name="+name+"'><div class='img'><img src='"+image+"'  /></div><div class='des'><div class='title'>"+name+"</div><div class='content'>抑郁症是躁狂抑郁症的一种发作形式，以情感低落、思维迟缓、以及......</div></div></a></div>");
                             v.appendTo($("#adult"));*/
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


            }]);

        //个人档案信息
        controllers.controller('MyselfCtrl', ['$scope', 'ConsultService','ParamService','UserService','CommonService',
            function($scope,consultService,paramService,userService,commonService) {
                $scope.myselfnone = true;
                $scope.myselfinfo = false;
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
                        $scope.myselfnone = false;
                        $scope.myselfinfo = true;
                    });
                }else{
                    $scope.myselfnone = false;
                    $scope.myselfinfo = true;
                }

            }
        ]);


    });

