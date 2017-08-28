/*广告推广Banner业务处理*/
define(['services/services','services/commonService'],
    function(services) {
        services.factory('BannerService', ['$http','$q','CommonService',
            function($http,$q,commonService) {
                return {
                    /*首页推广Banners*/
                    getBanners: function() {
                        var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
                        /* var value= [
                         {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
                         {title: 'Polka dots', description: 'Dots with polka', price: 2.95},
                         {title: 'Pebbles', description: 'Just little rocks', price: 6.95}];*/
                        /*information/banners/7  http://"+window.location.host+"/api/main/banners*/
                        $http({url:"http://"+commonService.getServerUrl()+"/api/main/banners",method:"get",data:{}}).success(function(data, status, headers, config){
                            deferred.resolve(data);  // 声明执行成功，即http请求数据成功，可以返回数据了
                        }).error(function(data, status, headers, config){
                            deferred.reject(data);   // 声明执行失败，即服务器返回错误
                        });
                        return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API
                    },showBanner:function(){
                        var slidey =  $('.touchslider').unslider({
                            speed: 1000,
                            delay: 5000,
                            keys: true,               //  Enable keyboard (left, right) arrow shortcuts
                            dots: true,               //  Display dot navigation
                            fluid: false
                           });
                        var data = slidey.data('unslider');
                        /*setTimeout(function(){
                            alert("ok");
                            var slidey =  $('.touchslider').unslider({dots: true});
                            var data = slidey.data('unslider');
                        },2000);*/
                        /*$(".touchslider").touchSlider({
                            mouseTouch: true,
                            duration: 350, // 动画速度
                            delay: 5000, // 动画时间间隔
                            namespace: "touchslider",
                            //fullsize:true,
                            autoplay: true
                        });*/
                        /*alert($(".touchslider").attr("id"));*/
                       // $(".touchslider").data("touchslider").start();
                        //$(".touchslider").resize();

                    }

                };
            }]);
    });
