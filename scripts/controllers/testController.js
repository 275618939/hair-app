define(['controllers/controllers', 'services/testService', 'services/paramService','services/commonService'],
    function(controllers) {
        /*加载首页评测信息*/
        controllers.controller('MainTestCtrl', ['$scope', 'TestService',
            function($scope, testService) {
                //$scope.testItems =[{id:1,name:'考试焦虑测评'},{id:2,name:'学业成就责任测评'},{id:3,name:'青少年个性测评'},{id:4,name:'同学关系测评'}];
                var promise = testService.geMainTest();
                promise.then(function(data) {
                    $scope.testItems =data.value;
                });
            }]);
        /*初始评测主页*/
        controllers.controller('InitTestCtrl', ['$scope', 'TestService',
            function($scope, testService) {

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

                            }else if(id=="adult-button"){
                                $("#adult").show();
                                $("#student").hide();
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
        /*加载学生评测信息*/
        controllers.controller('StudentTestCtrl', ['$scope', 'TestService',
            function($scope, testService) {
                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = testService.getTest(testService.student,testService.free,$scope.currentPage);
                    promise.then(function(data) {
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var name=null;
                        var icon=null;
                        var id=0;
                        var fee=0;
                        for(var item in data.value){
                            name=data.value[item].name;
                            icon=data.value[item].icon;
                            id=data.value[item].id;
                            fee=data.value[item].fee;
                            if(name.length>11){
                                name=name.substring(0,8)+"...";
                            }
                            var v="";
                            if(fee==1){
                                var v=$("<div class='zhw-item-review-list'><header><div class='right'><img src='images/pay.png'/></div></header><div class='img'><img src='images/pingce02.png' /></div><div class='des'><div class='left'><b>"+name+"</b></div></div></div>");
                            }else{
                                var v=$("<div class='zhw-item-review-list'><a href='evaluation.html?id="+id+"'><img src='"+icon+"' /><div class='des'><b>"+name+"</b></div></a></div>");
                            }
                            v.appendTo($("#student"));
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
        /*加载成人评测信息*/
        controllers.controller('AdultTestCtrl', ['$scope', 'TestService',
            function($scope, testService) {

                $scope.currentPage = 1;
                $scope.dataLen = -1;
                $scope.load = function () {
                    var promise = testService.getTest(testService.adult,testService.free,$scope.currentPage);
                    promise.then(function(data) {
                        $scope.dataLen=data.value.length;
                        //infoContent
                        var name=null;
                        var icon=null;
                        var id=0;
                        var fee=0;
                        for(var item in data.value){
                            name=data.value[item].name;
                            icon=data.value[item].icon;
                            id=data.value[item].id;
                            fee=data.value[item].fee;
                            if(name.length>11){
                                name=name.substring(0,8)+"...";
                            }
                            var v="";
                            if(fee==1){
                                v=$("<div class='zhw-item-review-list'><header><div class='right'><img src='images/pay.png'/></div></header><div class='img'><img src='images/pingce02.png' /></div><div class='des'><div class='left'><b>"+name+"</b></div></div></div>");
                            }else{
                                v=$("<div class='zhw-item-review-list'><a href='evaluation.html?id="+id+"'><!--<header><div class='right'><img src='images/pay.png'/></div></header>--><div class='img'><img src='"+icon+"'/></div><div class='des'><div class='left'><b>"+name+"</b></div></div></a></div>");
                            }
                            v.appendTo($("#adult"));
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
        /*加载量表评测信息*/
        controllers.controller('IntroductCtrl', ['$scope', 'TestService','ParamService',
            function($scope, testService,paramService) {
                $scope.id=paramService.getValue("id");
                //$scope.name=paramService.getValue("name");
                var promise = testService.geIntroductInfo($scope.id);
                promise.then(function(data) {
                    $scope.brief =data.value.brief;
                    $scope.icon =data.value.icon;
                    $scope.name=data.value.name;
                    $scope.guide =data.value.guide;
                    $scope.url=data.value.url;
                   /* var v=$($scope.guide);
                    v.appendTo($("#guide"));*/
                    $("#guide").html($scope.guide);
                    $("#brief").html($scope.brief);

                });
            }]);
        /*开始测试评测信息*/
        controllers.controller('StartTestCtrl', ['$scope', 'TestService','ParamService','CommonService',
            function($scope, testService,paramService,commonService) {
                $scope.id=paramService.getValue("id");
                $scope.name=paramService.getValue("name");
                $scope.url=paramService.getValue("url");
                $scope.fieldId=commonService.getCookie("fieldId");
                if($scope.fieldId==null||"undefined"== typeof $scope.fieldId) {
                    $scope.fieldId=0;
                }
                $scope.fieldId=parseInt($scope.fieldId);
                $scope.currentPage=1;
                $scope.fristPage=1;
                $scope.width=100;
                $scope.showPrevBtn={'show':false};
                $scope.showSubmitBtn={'show':false};
                $scope.userSelectItems=[];
              /*  var promise = testService.getQuestions($scope.id);*/
                var promise = testService.getQuestionsByUrl(decodeURIComponent($scope.url));
                promise.then(function(data) {
                    if(data.msg=="success"){
                        $scope.amount=data.questions.length;
                        var items=[];
                        for(var i=0;i<$scope.amount;i++){
                            var temp=data.questions[i];
                            items.push({id:parseInt(temp.id),answerId:parseInt(temp.answerId),problem:temp.question,options:temp.options});
                        }
                        $scope.quests=items;
                        $scope.currentItems= $scope.quests[$scope.currentPage-1];
                        $scope.currentWidth= $scope.width/$scope.amount; //全局变量
                        $('#progress').css('width', $scope.currentWidth + '%');
                    }
                });
               /* promise.then(function(data) {
                    if(data.state==1){
                        $scope.name=data.value.name;
                        $scope.amount=data.value.amount;
                        var items=[];
                        var j=0;
                        for(var i=0;i<4;i++){
                            var temp=data.value.questions[0];
                            items.push({id:(i+1),problem:temp.problem+"-"+(i+1),options:temp.options});
                        }
                        $scope.amount=items.length;
                        //$scope.quests=data.value.questions;
                        $scope.quests=items;
                        $scope.currentItems= $scope.quests[$scope.currentPage-1];
                        $scope.currentWidth= $scope.width/$scope.amount; //全局变量
                        $('#progress').css('width', $scope.currentWidth + '%');
                    }

                });*/
                $scope.submitTest=function(){
                    //记录最后一一题用户的选择
                    var index= $("input[name='answer']:checked").val();
                    if(isNaN(index)){
                        alert("请选择测试项!");
                        return;
                    }
                    index=parseInt(index);
                    $scope.updateSelectItems($scope.currentItems.id, $scope.currentPage,index);
                    var answers=JSON.stringify($scope.userSelectItems);
                    var promise = testService.testSubmit( $scope.id,answers,$scope.fieldId);
                    promise.then(function(data) {
                        if(data.state!=1){
                            alert(data.desc);
                        }else{
                            //alert(commonService.reportUrl);
                            //var url=commonService.reportUrl.replace("*",data.value);
                            //window.location.href=url;
                            window.location.href="testReport.html?id="+data.value+"&path="+1;
                        }
                    });
                };
                $scope.changeProgress=function(){
                    $('#progress').css('width', $scope.currentWidth*$scope.currentPage + '%');
                };
                $scope.nextQuestion=function(index){
                    if( $scope.currentPage>=  $scope.amount){
                        if( $scope.currentPage==  $scope.amount){
                            $scope.showSubmitBtn={'show':true};
                        }
                        return;
                    }
                    $scope.updateSelectItems($scope.currentItems.id,$scope.currentItems.answerId,index);
                    $scope.showPrevBtn={'show':true};
                    $scope.currentPage+=1;
                    $scope.currentItems= $scope.quests[$scope.currentPage-1];
                    $scope.changeProgress();
                    //重置所有选项
                    $("input:radio[name='answer']").attr("checked",false);

                };
                $scope.prevQuestion=function(){
                    if( $scope.currentPage<=$scope.fristPage){
                        return;
                    }
                    $scope.showSubmitBtn={'show':false};
                    $scope.currentPage-=1;
                    $scope.currentItems= $scope.quests[$scope.currentPage-1];
                    $scope.showSelectItems();
                    $scope.changeProgress();
                    if( $scope.currentPage==$scope.fristPage){
                        $scope.showPrevBtn={'show':false};
                    }
                };
                $scope.showSelectItems=function(){
                    var id=$scope.currentItems.id;
                    for(var item in  $scope.userSelectItems) {
                        if($scope.userSelectItems[item].id==id){
                            var temp="answer-"+$scope.userSelectItems[item].oIdx;
                            $("#"+temp+"").prop("checked",true);
                            return;
                        }
                    }
                }
                $scope.updateSelectItems=function(id,qIdx,oIdx){
                    var exist=false;
                    for(var item in  $scope.userSelectItems){
                        if($scope.userSelectItems[item].id==id){
                            $scope.userSelectItems[item].oIdx=parseInt(oIdx);
                            exist=true;
                            break;
                        }
                    }
                    if(!exist){
                        $scope.userSelectItems.push({id:parseInt(id),qIdx:parseInt(qIdx),oIdx:oIdx});
                    }

                }
            }]);
        /*量表评测报告*/
        controllers.controller('ReportCtrl', ['$scope', 'TestService','ParamService','CommonService',
            function($scope, testService,paramService,commonService) {
                $scope.testId=paramService.getValue("id");
                $scope.path=paramService.getValue("path");
                $scope.reportUrl="http://"+commonService.getServerUrl()+"/api/test/report/"+ $scope.testId;
                $("#reportFrame").load(function(){
                    var mainheight = $(this).contents().find("body").height()+30;
                    $(this).height(mainheight);
                });
                $scope.goPath =function(){
                    if($scope.path==1){
                        window.location.href="review.html";
                    }else{
                        window.location.href="user.html";
                    }
                };
                //var promise = testService.getReport($scope.testId);
                //promise.then(function(data) {
                //    data=data.replace('TestController/basic',"")
                //    $("#myreport").html(data);
                //});
            }]);
    });

