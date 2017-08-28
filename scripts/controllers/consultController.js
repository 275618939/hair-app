//var loginId=$.md5(consultService.appKey+'u'+ $scope.mobile);
define(['controllers/controllers', 'services/paramService',  'services/consultService','services/commonService', 'services/userService', 'services/consultDaoService'],
    function(controllers) {
        /*查询咨询师详细信息*/
        controllers.controller('ConsultDetailCtrl', ['$scope','ConsultService','ParamService',
            function($scope,consultService,paramService) {
                $scope.name = paramService.getValue("name");
                $scope.consultId = paramService.getValue("id");
                $scope.repley = paramService.getValue("repley");
                var promise = consultService.getConsultInfo($scope.consultId);
                promise.then(function(data) {
                    if (data.state != 1) {
                        return;
                    }
                    $scope.password="e807f1fcf82d132f9bb018ca6738a19f";
                    $scope.realName="realName";
                    $scope.logo="http://file.yalixinli.com/test/logo/20150112/1.jpg";
                    $scope.sex=1;
                    $scope.company=data.value.company;
                    $scope.degree=3;
                    $scope.mobile="15652499629";
                    $scope.status=1;
                    $scope.descript="国家三级咨询师";
                    $scope.brief=data.value.brief;
                    $scope.createTime="Mar 26, 2015 7:27:02 PM";
                    $scope.huanxin="a1e9ce1d329f8dfd1568327dd778ef23";
                    $scope.workStatus=1;
                    $scope.type=0;
                    $scope.degreeString="国家三级心理咨询师";
                    $scope.adviceCount=4;
                    $scope.attitudeCount=4;
                    $scope.attitude=data.value.attitude;
                    $scope.ability=data.value.ability;
                    $scope.recommend=data.value.recommend;
                    $scope.typeList=data.value.goodat;
                    //读取咨询师信息
                    if($scope.brief.length>48){
                        $('#openShutManager').show();
                        $scope.brief_1=$scope.brief.substring(0,56)+"...";
                        $scope.brief_2=$scope.brief.substring(56,$scope.brief.length);
                    }else{
                        $scope.brief_1=$scope.brief
                        $('#openShutManager').hide();
                    }
                });

            }]);
        /*初始咨询回话信息*/
        controllers.controller('ConsultInitCtrl', ['$scope','ConsultService','ParamService','CommonService',
            function($scope,consultService,paramService,commonService) {
                //咨询ID
                $scope.id = paramService.getValue("id");
                //咨询类型ID
                $scope.classId = paramService.getValue("classId");
                //咨询师ID
                $scope.consultId = paramService.getValue("consultId");
                //初始咨询信息
                $scope.initContent = paramService.getValue("content");

                $scope.repley = paramService.getValue("repley");

                if( $scope.initContent==null|| $scope.initContent.trim()==""|| "undefined"== typeof  $scope.initContent){
                    $("#infoUser").toggle();
                }
                /*咨询是否关闭*/
               /* var promise = consultService.getIsOpen($scope.id);
                promise.then(function(data) {
                    if (data.value==0) {
                        window.location.href="consuMentClose.html";
                        return
                    };
                });*/
                $scope.showConsultInfoById=function(id){
                    var promise = consultService.getConsultDetail(id);
                    promise.then(function(data) {
                        if (data.state != 1) {
                            return;
                        }
                        //记录咨询详情信息
                        $scope.consultDetailInfo=data.value;
                        $scope.initContent=$scope.consultDetailInfo.content;
                        $scope.showHistoryMessages();
                        if(data.value.consultId!=null&& "undefined"!= typeof  data.value.consultId) {
                            $scope.showConsultInfo(data.value.consultId);
                        }
                    });
                }
                $scope.showConsultInfoByIdNoHistory=function(id){
                    var promise = consultService.getConsultDetail(id);
                    promise.then(function(data) {
                        if (data.state != 1) {
                            return;
                        }
                        if(data.value.consultId!=null&& "undefined"!= typeof  data.value.consultId) {
                            $scope.showConsultInfo(data.value.consultId);
                        }
                    });
                }
                $scope.closeTecharTool=function(){
                    $("#zhw-item-techar").hide();
                    $("#sessionInfo").addClass("sessionAdd");

                }
                $scope.showTecharTool=function(){
                    $("#zhw-item-techar").show();
                    $("#sessionInfo").removeClass("sessionAdd");
                }
                $scope.showConsultInfo=function(consultId){
                    var promise = consultService.getConsultInfo(consultId);
                    promise.then(function(data) {
                        if (data.state != 1) {
                            return;
                        }
                        $scope.consultId=data.value.id;
                        $scope.name=data.value.name;
                        $scope.company=data.value.company;
                        $scope.descript=data.value.descreption;
                        $scope.showTecharTool();
                    });
                }
                //查询咨询师信息
                if( $scope.consultId==null|| $scope.consultId=="undefined"){
                    //$scope.showConsultInfoById($scope.id)
                    //隐藏咨询师信息框
                    $scope.closeTecharTool();
                }else{
                    $scope.showConsultInfo($scope.consultId);
                }
                //显示咨询历史信息
                $scope.showConsultInfoById($scope.id);
                //显示历史回话记录
                $scope.historyReplay=false;
                $scope.userTimes=commonService.HxAllTime;
                $scope.showHistoryMessages=function(){
                    if(null!=$scope.consultDetailInfo&&"undefined"!= typeof  $scope.consultDetailInfo) {
                        //console.log(JSON.stringify($scope.consultDetailInfo));
                        var records=$scope.consultDetailInfo.records;
                        var count=0;
                        for(var item in records){
                            if(records[item]!=null){
                                if(records[item].type==2){
                                    var v = $("<ul class='chat-thread-teacher' id='user'><li>" + records[item].record + "</li></ul>");
                                    v.appendTo($("#scroller"));
                                    $("#infomation").hide();
                                    $scope.historyReplay=true;
                                }else if(records[item].type==1){
                                    count++;
                                    var v = $("<ul class='chat-thread-user' id='user'><li>" + records[item].record + "</li></ul>");
                                    v.appendTo($("#scroller"));
                                    $scope.historyReplay=false;
                                }
                            }
                        }


                    }
                };


            }]);
        //初始化环信信息
        controllers.controller('WebImCtrl', ['$scope', 'ConsultService','ParamService','UserService','CommonService','$log',
            function($scope,consultService,paramService,userService,commonService,$log) {
                //获取环信用户信息
                $scope.hxId=commonService.getCookie("hxId");
                $scope.mobile= commonService.getCookie("mobile");
                $scope.hxLogin= commonService.getCookie("hxLogin");
                $scope.hxPassword= commonService.getCookie("hxPassword");
                $scope.hxNickname=commonService.getCookie("hxNickname");
                //$scope.userTimes=commonService.getCookie("user_times");
                //读取用户的档案信息
                $scope.fieldId=commonService.getCookie("fieldId");
                $scope.userId=commonService.getCookie("userId");
                $scope.userSex=commonService.getCookie("sex");
                $scope.userMarry=commonService.getCookie("marry");
                $scope.birthday=commonService.getCookie("birthday");
                $scope.userAge=commonService.getCookie("age");


                var promise_temp = consultService.getIsOpen($scope.id);
                promise_temp.then(function(data_temp) {
                    if (data_temp.value==0) {
                        $scope.userTimes=0;
                        $("#questionClose").show();
                        $("#msg").attr('disabled',true);
                        $("#msgSendBtn").attr('disabled',true);
                        return
                    };
                });

                //打开数据库链接
                //consultDaoService.openDB();
                var conn= new Easemob.im.Connection();
                if(parseInt($scope.repley)==1){
                    $scope.isRepley=true;

                }else{
                    $scope.isRepley=false;
                }

                conn.init({
                    https : false,
                    //当连接成功时的回调方法
                    onOpened : function() {
                        handleOpen(conn);
                    },
                    onTextMessage : function(message) {
                        $scope.isRepley=true;
                        //设置咨询师相关信息
                        try
                        {

                            $scope.consultFrom=message.from;
                            //存入cookie
                            commonService.addCookie("consultFrom",$scope.consultFrom,commonService.ThirtyDayValidity);
                            $scope.questionId=message.ext.question.questionId;
                            if($scope.id!=$scope.questionId){
                                $log.debug('--------------->>>>>conuslt:message:'+JSON.stringify(message));
                                //非当前的咨询信息,记录咨询师回复到数据库中
                                var temp_data={id:$scope.id,type:0,times:0,record:message.data};
                                consultService.appendConsult(temp_data);
                                return;
                            }
                            $scope.closeInfoTool();
                            $scope.showSendTool();
                            $scope.showTecharTool();

                            var temp_consultId=message.ext.consultInfo.consultId;
                            $scope.showConsultInfo(temp_consultId);
                            var promise_temp = consultService.getIsOpen($scope.id);
                            promise_temp.then(function(data_temp) {
                                if (data_temp.value==0) {
                                    $scope.userTimes=0;
                                    $("#questionClose").show();
                                    $("#msg").attr('disabled',true);
                                    $("#msgSendBtn").attr('disabled',true);
                                    return
                                };
                            });


                            //显示咨询师信息
                            $scope.showTecharTool();
                            $scope.showConsultInfoByIdNoHistory($scope.id)
                        }
                        catch (e)
                        {
                            $log.debug('--------------->>>>>conuslt:message:error'+JSON.stringify(e.message));
                        }
                        //alert(JSON.stringify(message));
                        $log.debug('--------------->>>>>conuslt:message:'+JSON.stringify(message));
                        var date=new Date();
                        showMsgAndFrom(2,message.data,date.getTime(), $scope.consultFrom,message.to);
                        //showMsg(2,message.data,date.getTime());
                    },
                    //异常时的回调方法
                    onError : function(message) {
                        handleError(message);
                    }
                });
                var handleOpen = function(conn) {
                    var curUserId = conn.context.userId;
                    //设置用户上线状态，必须调用
                    conn.setPresence();
                    //获取当前登录人的联系人列表
                    conn.getRoster({
                        success : function(roster) {
                            //获取当前登录人的群组列表
                            conn.listRooms({
                                success : function(rooms) {
                                    conn.setPresence();//设置用户上线状态，必须调用
                                },
                                error : function(e) {
                                }
                            });

                        }
                    });
                };
                var handleError = function(e) {
                    var msg = e.msg;
                    if (e.type == EASEMOB_IM_CONNCTION_SERVER_CLOSE_ERROR) {
                        if (msg == "" || msg == 'unknown' ) {
                            alert("服务器器断开连接,可能是因为在别处登录");
                        } else {
                            alert("服务器器断开连接");
                        }
                    } else {
                        alert(msg);
                    }
                };
                var showMsg=function(type,msg,time) {
                    var date=commonService.timeStamp2String(time);
                    if (type == 1) {
                        var v = $("<div class='consult-time-show'><p>"+date+"</P></div><ul class='chat-thread-user' id='user'><li>" + msg + "</li></ul>");
                    } else {
                        var v = $("<div class='consult-time-show'><p>"+date+"</P></div><ul class='chat-thread-teacher' id='user'><li>" + msg + "</li></ul>");
                    }
                    v.appendTo($("#scroller"));
                };
                var showMsgAndFrom=function(type,msg,time,from,to) {
                    var promise_temp = consultService.getIsOpen($scope.id);
                    promise_temp.then(function(data_temp) {
                        if (data_temp.value==0) {
                            $("#questionClose").show();
                            $("#msg").attr('disabled',true);
                            $("#msgSendBtn").attr('disabled',true);
                            if(type==2){
                                var date=commonService.timeStamp2String(time)
                                var v="";
                                v = $("<div class='consult-time-show'><p>"+date+"</P></div><ul class='chat-thread-teacher' id='user'><li>" + msg + "</li></ul>");
                                v.appendTo($("#scroller"));
                                //记录会话信息
                                var temp_times=commonService.HxAllTime- ($scope.userTimes+1);
                                var temp_data={id:$scope.id,type:type,times:temp_times,record:msg};
                                consultService.appendConsult(temp_data);
                            }
                            return
                        };
                        var date=commonService.timeStamp2String(time)
                        var v="";
                        //记录回话信息;
                        if (type == 1) {
                            v = $("<div class='consult-time-show'><p>"+date+"</P></div><ul class='chat-thread-user' id='user'><li>" + msg + "</li></ul>");
                        } else {
                            v = $("<div class='consult-time-show'><p>"+date+"</P></div><ul class='chat-thread-teacher' id='user'><li>" + msg + "</li></ul>");
                        }
                        v.appendTo($("#scroller"));
                        //记录会话信息
                        var temp_times=commonService.HxAllTime- ($scope.userTimes+1);
                        var temp_data={id:$scope.id,type:type,times:temp_times,record:msg};
                        consultService.appendConsult(temp_data);
                    });

                };
                $scope.hxLogin=  $scope.hxId;
                $scope.hxPassword=consultService.pass;
                var login=function(){
                    //默认自动登陆配置账号
                    conn.open({
                        user :$scope.hxLogin,
                        pwd :  $scope.hxPassword,
                        appKey : consultService.appKey//开发者APPKey
                    });
                };
                //自动登陆
                login();
                //发送咨询信息
                $scope.sendMessage=function(){

                    if(!$scope.isRepley){
                        alert("请耐心等待咨询师回复!");
                        return;
                    }
                    if($scope.userTimes==0){
                        alert("问题已结,您已不能在发送咨询信息!");
                        return;
                    }
                    var msg=$("#msg").val();
                    if(msg.trim()==""){
                        alert("请输入咨询内容");
                        return;
                    }
                  /*  $scope.userTimes--;*/
                    var date=new Date();
                    //获得咨询师环信ID
                    var consultFrom=commonService.getCookie("consultFrom");
                    //构造信息的消息体 2015-7-9版本
                    var ext={
                        source:"2",//0：服务器 1：咨询师 2：用户
                        questionType:"0",//0：普通免费问题 1：测评结果免费问题 4：私人医生 5：图文咨询 6：换一换普通免费问题 7：换一换测评结果免费问题
                        question: {
                            questionId:$scope.id,
                            age :  parseInt($scope.userAge),
                            symptomType:parseInt($scope.classId),
                            brief :  $scope.initContent,
                            createTime : date.getTime(),
                            sex : parseInt($scope.userSex),
                            isQuestion: 0//用于标示此条消息是问题还是聊天（判断针对此问题的消息是否是第一次发送） 0:否 1：是
                        },
                        userInfo:{
                            userId :$scope.userId,
                            mobile : $scope.mobile,
                            hxId: $scope.hxId
                        }
                    }
                    //用户的相关信息 旧版
                    //var ext={
                    //    contentType : $scope.contentType,//此条消息的内容类型(0:文字1:语音2:图片)
                    //    isFree : 0,//此问题的收费类型(0:免费问题1:付费对话)
                    //    qType : 0,//0普通问题 1是转发问题（删除后创建问题的时候用）
                    //    //Json串封装了问题需要的信息{age:年龄,sex:0男1女,isSingle:0未婚1已婚,typeId:症状类型Id,brief:问题描述,createTime:问题提问时间,userId:用户ID,mobile:用户手机号,orderId:订单Id(付费问题才会用到,免费问题不传)
                    //    question :     {
                    //        age :  $scope.userAge,
                    //        brief : msg,
                    //        createTime : date.getTime(),
                    //        isSingle :  $scope.userMarry,
                    //        mobile :  $scope.mobile,
                    //        sex : $scope.userSex,
                    //        typeId : 15
                    //        //userId :   $scope.userId
                    //    },
                    //    questionId :$scope.id,  //questionId:当前对话的问题实体的ID
                    //    times :   $scope.userTimes,       //就此问题用户端已经发送的消息总数(请与本地times的取最大值)
                    //    type : 0                           //此消息的用途类型 (只会为 1:咨询师发给用户消息)
                    //};
                    var info={
                        to : consultFrom,
                        msg:msg,
                        type : "chat",
                        ext:ext
                    }
                    $log.debug('--------------->>>>>user:message:'+JSON.stringify(info));
                    //showMsg(1,msg,date.getTime());
                    showMsgAndFrom(1,msg,date.getTime(),$scope.consultFrom,"user");
                    conn.sendTextMessage(info);
                    $("#msg").val("");
                   /* $scope.isRepley=false;
                    $scope.closeSendTool();*/
                   // alert($scope.userTimes+"1");
                    $scope.closeSendTool();
                    /*if($scope.userTimes==0){
                        //关闭咨询信息
                        consultService.closeConsult($scope.id);
                        return;
                    }*/
                }
                $scope.changeStatus=function(){
                    $("#infomation").toggle();
                    $("#waitInfoTool").toggle();
                    $("#infoTool").toggle();
                    $("#sendTool").toggle();
                }
                $scope.closeInfoTool=function(){
                    $("#infomation").hide();
                    $("#waitInfoTool").hide();
                }
                $scope.showSendTool=function(){
                    $("#infoTool").show();
                    $("#sendTool").show();
                }
                $scope.closeSendTool=function(){
                    if($scope.userTimes==0){
                        $("#msg").attr('disabled',true);
                        $("#msgSendBtn").attr('disabled',true);
                    }
                }
                //切换提示信息状态
                if($scope.isRepley){
                    $scope.closeInfoTool();
                    $scope.showSendTool();
                }else{
                    $("#waitInfoTool").show();
                    $("#infoTool").hide();
                    $("#sendTool").hide();
                }
                $scope.changeHistoryReplay=function(){
                    if($scope.historyReplay){
                        $scope.isRepley=true;
                        $scope.closeInfoTool();
                        $scope.showSendTool();
                    }
                }
                $scope.$watch('historyReplay',$scope.changeHistoryReplay, true);

            }
        ]);

        /*咨询类别*/
        controllers.controller('ConsultClassCtrl', ['$scope','ConsultService','$rootScope',
            function($scope,consultService,$rootScope) {
                var promise = consultService.getClassList();
                promise.then(function(data) {
                    $scope.classData=data.value;
                });

                $scope.changeCss=function(id,name){
                    $scope.id=id;
                    $scope.name=name;
                    var num = $('.consult-class-info');
                    for(var i=0;i<num.length;i++) {
                        num.eq(i).removeClass('change_css')
                    }
                    $("#"+id).addClass("change_css");
                }
                $scope.confirm=function(){
                    window.location.href="consulation.html?id="+$scope.id+"&name="+$scope.name;
                }

            }]);

        //等会咨询回复
        controllers.controller('WaitReplyCtrl', ['$scope', 'ConsultService','ParamService',
            function($scope,consultService,paramService) {
                $scope.content = paramService.getValue("content");
            }
        ]);

        //提交咨询
        controllers.controller('ConsultCreateCtrl', ['$scope', 'ConsultService','ParamService','CommonService','ConsultDaoService',
            function($scope,consultService,paramService,commonService,consultDaoService) {
                $scope.classId = paramService.getValue("id");
                $scope.className = paramService.getValue("name");
                $scope.fieldId=commonService.getCookie("fieldId");
                //$scope.userId=commonService.getCookie("userId");
               /* if($scope.fieldId==null||"undefined"== typeof $scope.fieldId) {
                    alert("请先完善档案信息");
                    window.location.href="profiles.html";
                    return;
                }*/
                if($scope.className==""||$scope.className==null){
                    $scope.className="点击选择您的心理症状";
                    $("#info_input").hide();
                }else{
                    $("#info_input").show();
                    $("#select_input").hide();
                    $scope.consultInfo= $scope.className;
                }
                $scope.submitConsult=function(){
                    /*var consultInfo= $('#consultInfo').val();*/
                    var  consultInfo=$scope.consultInfo;
                    if(consultInfo==""||consultInfo==null){
                        alert("请输入咨询内容!");
                        return;
                    }
                    /*  if(consultInfo.trim().length<10){
                     alert("咨询内容不能少于10个!");
                     return;
                     }*/
                    //打开数据库链接
                    //consultDaoService.openDB();
                    var data={fileId:$scope.fieldId,classId:$scope.classId,content:consultInfo};
                    var promise = consultService.putConsultInfo(data);
                    promise.then(function(data) {
                        if(data.state!=1){
                            alert(data.desc);
                            return;
                        }
                        /*  var date=new Date();
                         try{
                         //记录咨询信息
                         consultDaoService.messages.content=consultInfo;
                         consultDaoService.messages.id=data.value;
                         consultDaoService.messages.times=date.getTime();
                         consultDaoService.messages.state=consultService.open;
                         consultDaoService.messages.count=commonService.HxAllTime;
                         consultDaoService.addData(consultDaoService.storeName,consultDaoService.messages);
                         consultDaoService.resetMessages();
                         }catch(e) {
                         }*/
                        window.location.href="consuMent.html?content="+consultInfo+"&id="+data.value+"&classId="+$scope.classId;
                    });

                }


            }
        ]);


        //个人档案信息
        controllers.controller('MyselfCtrl', ['$scope', 'ConsultService','ParamService','UserService','CommonService',
            function($scope,consultService,paramService,userService,commonService) {

                var promise = userService.getMyselfInfo();
                promise.then(function (data) {
                    if (data.state != 1) {
                        $("#userInfo").hide();
                        $("#unUserInfo").show();
                        return;
                    }
                    commonService.addCookie("userId",data.value.userId,commonService.OneDayValidity);
                    commonService.addCookie("fieldId",data.value.fieldId,commonService.OneDayValidity);
                    commonService.addCookie("birthday",data.value.birthday,commonService.OneDayValidity);
                    commonService.addCookie("sex",data.value.sex,commonService.OneDayValidity);
                    commonService.addCookie("marry",data.value.marry,commonService.OneDayValidity);
                    commonService.addCookie("age",commonService.getAge(data.value.birthday),commonService.OneDayValidity);
                    $("#userInfo").show();
                    $("#unUserInfo").hide();
                    $scope.birthday=data.value.birthday;
                    $scope.sex=data.value.sex;
                    if(data.value.sex==1){
                        $scope.sex="女"
                    }else{
                        $scope.sex="男"
                    }

                });

             /*   $scope.fieldId=commonService.getCookie("fieldId");
                if($scope.fieldId==null||"undefined"== typeof $scope.fieldId) {
                }else{
                    $scope.birthday=commonService.getCookie("birthday");
                    $scope.sex=commonService.getCookie("sex");
                    if( $scope.sex==0){
                        $scope.sex="女"
                    }else{
                        $scope.sex="男"
                    }
                    $("#userInfo").show();
                    $("#unUserInfo").hide();

                }*/

            }
        ]);
        //显示个人档案信息
        controllers.controller('ShowMyselfCtrl', ['$scope', 'ConsultService','ParamService','UserService','CommonService',
            function($scope,consultService,paramService,userService,commonService) {
                $scope.fieldId=commonService.getCookie("fieldId");
                if($scope.fieldId==null||"undefined"== typeof $scope.fieldId) {
                    alert("请先完善档案信息");
                    window.location.href="profiles.html";
                    return;
                }
                var promise = userService.getMyselfInfo();
                promise.then(function (data) {
                    if (data.state != 1) {
                        return;
                    }
                    $scope.birthday=data.value.birthday;
                    $scope.sex=data.value.sex;
                    $scope.marry=data.value.marry;
                    if($scope.sex==1){
                        $scope.sex="女"
                    }else{
                        $scope.sex="男"
                    }
                    if($scope.marry==0){
                        $scope.marry="未婚"
                    }else{
                        $scope.marry="已婚"
                    }
                });




            }
        ]);

    });

