// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        iscroll: 'vendor/iscroll-lite',
        jquerySha:'vendor/jquery.sha1',
        weixin:'vendor/jweixin-1.0.0',
        touchslider: 'vendor/jquery.touchslider.min',
        domReady: 'vendor/domReady'
    },
    shim: {

        jquery: {
            exports: 'jquery'
        },
        jquerySha: {
            deps: [ 'jquery'],
            exports: 'jquerySha'
        },
     /*   weixin: {
            deps: [ 'jquery'],
            exports: 'weixin'
        },*/
        touchslider: {
            deps: [ 'jquery'],
            exports: 'touchslider'
        },
        iscroll: {
            deps: [ 'jquery'],
            exports: 'iscroll'
        },
        angular: {
            deps: [ 'jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: [ 'angular'],
            exports: 'angularRoute'
        }
    }/*,
    deps:['weixin']*/
});
require([
        'angular','angularRoute',
        'app', 'domReady','jquery',"iscroll","touchslider",'jquerySha',/*'weixin',*/
        'controllers/shareController',
        'controllers/infomationController',
        'controllers/commonController',
        'interceptors/requestInterceptors'
    ],
    function (angular,angularRoute,app, domReady) {
        'use strict';
        app.config(['$httpProvider','$routeProvider',
            function($httpProvider,$routeProvider) {
                $httpProvider.interceptors.push('RequestInterceptors');
               // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
               // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
               // $httpProvider.defaults.headers['Session-Id'] = 'e10adc3949ba59abbe56e057f20f883e';
            }
        ]);

        domReady(function() {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
