define(['services/services','services/commonService'],
    function(services) {
        services.factory('ShareService', ['$http','$q','$rootScope','CommonService','$log',
            function($http,$q,$rootScope,commonService,$log) {
                return {
                    createSignature:function(){
                        var promise =this.getWeiXin_Token();
                        var shareService=this;
                        promise.then(function(data) {
                            var access_token =data.access_token;
                            if( access_token!=""&&typeof(access_token)!="undefined"&&access_token!=null) {
                                var promise_1 =shareService.getWeiXin_Jsapi_ticket(access_token);
                                promise_1.then(function(data) {
                                    var ticket=data.ticket;
                                    if( ticket!=""&& typeof(ticket)!="undefined"&&ticket!=null) {
                                        var noncestr=commonService.getRandomString(16);
                                        var timestamp=new Date().getTime();
                                        //var url="http://"+commonService.getServerUrl()+"/app/detailInfo.html"
                                        var url=encodeURIComponent("http://101.200.176.217/app/share.html");
                                        var params=[{key:'noncestr',value:noncestr},{key:'jsapi_ticket',value:ticket},{key:'timestamp',value:timestamp},{key:'url',value:url}];
                                        params=commonService.sortByKey(params,"key");
                                        var param=shareService.createWeiXin_LinkString(params);
                                        $log.debug('--------------->>>>>noncestr:'+noncestr);
                                        $log.debug('--------------->>>>>jsapi_ticket:'+ticket);
                                        $log.debug('--------------->>>>>timestamp:'+timestamp);
                                        $log.debug('--------------->>>>>url:'+url);
                                        $log.debug('--------------->>>>>createWeiXin_LinkString:param-->>'+param);
                                      /*  var s=new jsSHA(params,"TEXT");
                                        var signature=s.getHash("SHA-1","HEX");*/
                                        var signature=$.sha1(param);
                                        $log.debug('--------------->>>>>signature:-->>'+signature);
                                        commonService.addCookie("WeiXin_Access_token",access_token,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_ticket",ticket,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_noncestr",noncestr,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_timestamp",timestamp,commonService.weixin_expires_in);
                                        commonService.addCookie("WeiXin_signature",signature,commonService.weixin_expires_in);
                                        shareService.initWeixin();
                                    }
                                });
                            }
                        });
                    },
                    getWeiXin_Token:function(){
                        var deferred = $q.defer();
                        $http({url:"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+commonService.weixin_appID+"&secret="+commonService.weixin_appsecret+"",method:"get"}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    getServerSignature:function(jsapi_ticket,url){
                        var deferred = $q.defer();
                        $http({url:"http://"+commonService.getServerUrl()+"/wei/wei/sign.action?jsapi_ticket="+jsapi_ticket+"&url="+url,method:"get"}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    getWeiXin_Jsapi_ticket:function(access_token) {
                        var deferred = $q.defer();
                        $http({url:"https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi",method:"get"}).success(function(data, status, headers, config){
                            deferred.resolve(data);
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);
                        });
                        return deferred.promise;
                    },
                    createWeiXin_LinkString:function(params){
                        var len=params.length;
                        var str='';
                        for(var i=0;i<len;i++){
                            var key=params[i].key;
                            var value=params[i].value;
                            if (i == len - 1) {
                                str = str + key + "=" + value;
                            } else {
                                str = str + key + "=" + value + "&";
                            }
                        }
                        return str;
                    }

                };
            }]);
    });
