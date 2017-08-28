define(['controllers/controllers', 'services/infomationService',  'services/shareService','services/commonService'],
    function(controllers) {
        controllers.controller('ShareCtrl', ['$scope', 'ShareService','InfomationService','CommonService','$rootScope','$log',
            function($scope, shareService,infoService,commonService,$rootScope,$log) {
                //$rootScope.access_token="cT4Lp3fbrbh9Rmem2D8yuCl9609OYPfnzyQBeQqV-NQLh-gjKwtVUlsCKUC5WjQ1En6o2oDKcM92t0_rN8o5a-krI_aF4QvjTUKgYOx1N7c";
                //$rootScope.ticket= "kgt8ON7yVITDhtdwci0qeU_Fqt_FITJFoVUiCMVZm8wm4euz8vxFUf04NaOyyP6frL-kZUmvR2iDegozhryOaQ";
                $scope.initWeiXin=function(timestamp,nonceStr,signature){
                    $log.debug('--------------->>>>>timestamp:'+timestamp);
                    $log.debug('--------------->>>>>nonceStr:'+nonceStr);
                    $log.debug('--------------->>>>>signature:'+signature);
                    wx.config({
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId:commonService.weixin_appID, // 必填，公众号的唯一标识
                        timestamp:timestamp , // 必填，生成签名的时间戳
                        nonceStr: nonceStr, // 必填，生成签名的随机串
                        signature:signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo'
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.error(function (res) {
                        alert("error="+res.errMsg);
                        $log.debug('--------------->>>>>error:'+res.errMsg);
                    });
                    wx.ready(function ($scope) {
                        $('#onMenuShareTimeline').click( function () {
                            alert("点击分享到朋友圈!");
                            $log.debug('--------------->>>>>点击分享到朋友圈!');
                            wx.onMenuShareTimeline({
                                    title: '卓望测试',
                                    link: 'http://101.200.176.217/app',
                                    imgUrl: 'http://101.200.176.217/app/images/information.png',
                                    trigger: function (res) {
                                        alert('用户点击分享到朋友圈');
                                    },
                                    success: function (res) {
                                        alert('已分享');
                                        $log.debug('--------------->>>>>success:'+res.errMsg);
                                    },
                                    cancel: function (res) {
                                        alert('已取消');
                                        $log.debug('--------------->>>>>complete:'+res.errMsg);
                                    },
                                    fail: function (res) {
                                        alert(JSON.stringify(res));
                                        $log.debug('--------------->>>>>fail:'+res.errMsg);
                                    },
                                    error: function (res) {
                                        alert(JSON.stringify(res));
                                        $log.debug('--------------->>>>>error:'+res.errMsg);
                                    }
                                }
                            );

                        });

                    });
                }
                $scope.createSignature_server=function(){
                    var promise =shareService.getWeiXin_Token();
                    promise.then(function(data2) {
                        var access_token =data2.access_token;
                        if( access_token!=""&&typeof(access_token)!="undefined"&&access_token!=null) {
                            var url=location.href.split('#')[0];
                            $log.debug('--------------->>>>>getServerSignature:url='+url);
                            var promise_1 =shareService.getWeiXin_Jsapi_ticket(access_token);
                            promise_1.then(function(data1) {
                                var ticket=data1.ticket;
                                if( ticket!=""&& typeof(ticket)!="undefined"&&ticket!=null) {
                                    var promise_2 =shareService.getServerSignature(ticket,url);
                                    promise_2.then(function(data) {
                                        $log.debug('--------------->>>>>getServerSignature:'+JSON.stringify(data));
                                        commonService.addCookie("access_token",access_token,commonService.weixin_expires_in);
                                        commonService.addCookie("jsapi_ticket",data.jsapi_ticket,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_noncestr",data.nonceStr,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_timestamp",data.timestamp,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_signature",data.signature,commonService.weixin_expires_in);
                                        //commonService.addCookie("WeiXin_url",data.url,commonService.weixin_expires_in);
                                        $scope.initWeiXin(data.timestamp,data.nonceStr,data.signature);
                                    });
                                }
                            });
                        }
                    });
                }

                var ticket= commonService.getCookie("jsapi_ticket");
                if( ticket==""|| typeof(ticket)=="undefined"||ticket==null) {
                    $scope.createSignature_server();
                }else{
                    var timestamp=commonService.getCookie("WeiXin_timestamp");
                    var nonceStr=commonService.getCookie("WeiXin_noncestr");
                    var signature=commonService.getCookie("WeiXin_signature");
                    $scope.initWeiXin(timestamp,nonceStr,signature);
                }

                /*  wx.config({
                 debug: true,
                 appId:commonService.weixin_appID,
                 timestamp: 1437319472,
                 nonceStr: '5568531b-3afa-45a1-bccf-e67739394d2d',
                 signature: '4c13ca35654cebef282c415563e0300097fb86c5',// b4110d8110951d20ce269f0bcbd2fb28ac8ea826
                 jsApiList: [
                 'onMenuShareTimeline',
                 'onMenuShareAppMessage',
                 'onMenuShareQQ',
                 'onMenuShareWeibo'
                 ]
                 });
                 wx.ready(function ($scope) {
                 $('#onMenuShareTimeline').click( function () {
                 alert("点击分享到朋友圈!");
                 $log.debug('--------------->>>>>点击分享到朋友圈!');
                 wx.onMenuShareTimeline({
                 title: '卓望测试',
                 link: "http://101.200.176.217/app/share.html",
                 imgUrl: 'http://101.200.176.217/app/images/information.png',
                 trigger: function (res) {
                 alert('用户点击分享到朋友圈');
                 },
                 success: function (res) {
                 alert('已分享');
                 $log.debug('--------------->>>>>success:'+res.errMsg);
                 },
                 cancel: function (res) {
                 alert('已取消');
                 $log.debug('--------------->>>>>complete:'+res.errMsg);
                 },
                 fail: function (res) {
                 alert(JSON.stringify(res));
                 $log.debug('--------------->>>>>fail:'+res.errMsg);
                 },
                 error: function (res) {
                 alert(JSON.stringify(res));
                 $log.debug('--------------->>>>>error:'+res.errMsg);
                 }
                 }
                 );

                 });

                 });*/



            }]);
    });

