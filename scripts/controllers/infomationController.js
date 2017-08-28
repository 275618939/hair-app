define(['controllers/controllers', 'services/infomationService', 'services/paramService', 'services/bannerService', 'services/commonService'],
    function(controllers) {
        //加载首页咨询信息
        controllers.controller('InfoCtrl', ['$scope', 'InfomationService',
            function($scope, infoService) {
                var promise = infoService.getMainInformation();
                promise.then(function(data) {
                    $scope.infoItems =data.value;
                });
            }]);
        //咨询详情
        controllers.controller('InfoDetailCtrl', ['$scope','$routeParams', 'InfomationService','ParamService',
            function($scope,$routeParams,infoService,paramService) {
                $scope.infoId=paramService.getValue("id");
                $scope.menuLove={'show':true};
                $scope.menuLoveCancel={'show':false};

                var promise = infoService.getInfoDetail($scope.infoId);
                promise.then(function(data) {
                    if(data.state==1){
                        var detail=data.value;
                        $scope.infoName=detail.name;
                        /* $scope.infoContent=detail.content;*/
                        $scope.infoImage=detail.icon;
                        $scope.infoLove=detail.love;
                        $scope.infoComment=detail.comment;
                        $scope.infoPv=detail.pv;
                        if($scope.infoLove<=0){
                            $("#love0").hide();
                        }
                        if($scope.infoComment<=0){
                            $("#infoComment").hide();
                        }
                        detail.content = detail.content.replace(/<(script)[\S\s]*?\1>|<\/?(a|img)[^>]*>/gi, "");
                        $("#detailInfo").html(detail.content);
                    }
                });
                $scope.toggleMenuLove = function() {
                    var promise = infoService.putLove($scope.infoId,infoService.love());
                    promise.then(function(data) {
                        if(data.state==1) {
                            $scope.infoLove=data.value;
                            $("#addLove").hide();
                            $("#cancelLove").show();
                            $("#love0").show();
                        }else{
                            alert(data.desc);
                        }
                    });
                };
                $scope.toggleMenuLoveCancel = function() {
                    var promise = infoService.putLove($scope.infoId,infoService.cancelLove());
                    promise.then(function(data) {
                        if(data.state==1) {
                            $scope.infoLove=data.value;
                            if($scope.infoLove<=0){
                                $("#love0").hide();
                            }
                            $("#addLove").show();
                            $("#cancelLove").hide();
                        }else{
                            alert(data.desc);
                        }
                    });
                };
                $scope.loadLove=function(){
                    var promise = infoService.getLoveCheck($scope.infoId);
                    promise.then(function(data) {
                        if(data.state==1) {
                            if (data.value == 1) {
                                $("#addLove").hide();
                                $("#cancelLove").show();
                            }else{
                                $("#addLove").show();
                                $("#cancelLove").hide();
                                if($scope.infoLove<=0){
                                    $("#love1").hide();
                                }
                            }
                        }else{
                            alert(data.desc);
                        }
                    });
                };
                //初始化赞
                $scope.loadLove();
                //分享
               $scope.onShare=function(){

                   $("#tool").hide();
                   $("#shareTool").show();
                   $("#detail").css("background","rgba(0, 0, 0, 0.3)");
               }
                //取消分享
                $scope.cancelOnShare=function(){
                    $scope.showShare={'show':false};
                    $scope.showNav={'show':true};
                    $("#detail").css("background","");
                    $("#tool").show();
                    $("#shareTool").hide();
                }
                //分享到QQ空间
                $scope.shreaQzone=function(){
                    var title= $scope.infoName;
                    var url=encodeURIComponent(document.location.href);
                    var shareqqzonestring='http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?summary='+title+'&url='+url+'&pics='+ $scope.infoImage;
                    //window.location.href="userShare.html?url="+sharesinastring;
                    window.open(shareqqzonestring,'newwindow','height=400,width=400,top=100,left=100');
                }
                //分享到新浪微博
                $scope.shareSina=function(){
                    var title= $scope.infoName;
                    var url=encodeURIComponent(document.location.href);
                    var sharesinastring='http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+url+'&content=utf-8&sourceUrl='+url+'&pic='+ $scope.infoImage;
                    window.open(sharesinastring,'newwindow','height=400,width=400,top=100,left=100');
                    //window.location.href="userShare.html?url="+sharesinastring;
                }


            }]);

        //打开分享
        controllers.controller('UserShareCtrl', ['$scope','ParamService', 'InfomationService',
            function($scope,paramService,infoService) {
                $scope.url=paramService.getValue("url");

            }]);

        //热点分类
        controllers.controller('InfoClassCtrl', ['$scope','$routeParams', 'InfomationService',
            function($scope,$routeParams,infoService) {
                var promise = infoService.getClassList();
                promise.then(function(data) {
                    $scope.infoClassItems =data.value;
                });

            }]);
        //热点信息推广Banner
        controllers.controller('InfoBannerCtrl', ['$scope','$routeParams', 'InfomationService', 'BannerService','ParamService',
            function($scope,$routeParams,infoService,bannerService,paramService) {
                $scope.classId=paramService.getValue("id");
                var promise = infoService.getClassBannerList( $scope.classId);
                promise.then(function(data) {
                    $scope.infoBannerItems =data.value;
                    //$scope.$watch('infoBannerItems', bannerService.showBanner, true);
                });
                $scope.detail=function(url){
                    var index=url.indexOf("=");
                    var data=url.substring(index+1,url.length);
                    data=data.replace(/\'/g,"\"");//替换半角单引号为全角单引号
                    data=jQuery.parseJSON(data);
                    var id=data.infoId;
                    window.location.href="detailInfo.html?id="+id;
                };
            }]);
        //加载热点信息
        controllers.controller('InfoClassListCtrl', ['$scope','$routeParams', 'InfomationService','ParamService',
            function($scope,$routeParams,infoService,paramService) {
                $scope.classId=paramService.getValue("id");
                $scope.className=paramService.getValue("name");
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = infoService.getInfoList($scope.classId,$scope.currentPage);
                    promise.then(function(data) {
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var name=null;
                        var brief=null;
                        var pv=0;
                        var id=0;
                        var icon=null;
                        for(var item in data.value){
                            name=data.value[item].name;
                            brief=data.value[item].brief;
                            pv=data.value[item].pv;
                            id=data.value[item].id;
                            icon=data.value[item].icon;
                            if(name.length>22){
                                name=name.substring(0,22)+"...";
                            }
                            if(brief.length>27){
                                brief=brief.substring(0,27)+"...";
                            }
                            var v=$("<div class='zhw-class-info-list'><a href='detailInfo.html?id="+id+"'><img src='"+icon+"' /><div  class='title'> <b>"+name+"</b></div><div  class='content'> <label>"+brief+"</label></div><div  class='flow'> <label>"+pv+"人看过</label></div></a></div>");
                            //var v=$("<div class='zhw-item-info-list'><a href='detailInfo.html?id="+id+"'><div class='img'><img src='"+icon+"'/></div><div class='des'><div  class='bTop'> <b>"+name+"</b></div><div  class='laLeft'> <label>"+brief+"</label></div><div  class='classRight'> <label>"+pv+"人看过</label></div></div></a></div>");
                            v.appendTo($("#infoContent"));
                        }
                    });
                };
                $scope.load();
                $(window).scroll(function () {
                    //$(window).scrollTop()这个方法是当前滚动条滚动的距离
                    //$(window).height()获取当前窗体的高度
                    //$(document).height()获取当前文档的高度
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
        //评论信息
        controllers.controller('InfoCommetCtrl', ['$scope','$routeParams', 'InfomationService','ParamService','CommonService',
            function($scope,$routeParams,infoService,paramService,commonService) {
                $scope.infoId=paramService.getValue("id");
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.haveDate=0;
                $scope.load = function () {
                    var promise = infoService.getInfoComment($scope.infoId,$scope.currentPage);
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
                    var promise = infoService.putComment( $scope.infoId,commentContent);
                    promise.then(function(data) {
                        if(data.state==1){
                            $("#commentContent").val("");
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

