define(['controllers/controllers', 'services/bannerService'],
    function(controllers) {
        controllers.controller('BannerCtrl', ['$scope', 'BannerService',
            function($scope, bannerService) {
                var promise = bannerService.getBanners();
                promise.then(function(data) {
                    var state=data.state;
                    var des=data.desc;
                    //$scope.bannerItems =data.value;
                    for(var index in data.value){
                        var item=data.value[index];
                        var v=$("<li><img src='"+item.image+"'></li>");
                        v.appendTo($("#infoBanner"));
                    }
                    alert("ok");
                    var slidey =  $('.touchslider').unslider({
                        speed: 500,
                        delay: 3000,
                        dots: true});
                    var data = slidey.data('unslider');
                    //$scope.bannerItems =[{"path":"banner.png"},{"path":"banner.png"},{"path":"banner.png"}];
                    //$scope.$watch('bannerItems', bannerService.showBanner, true);
                });

            }]);
    });

