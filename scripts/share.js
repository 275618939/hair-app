// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        weixin:'vendor/jweixin-1.0.0',
        jquerySha:'vendor/jquery.sha1',
        //bootstrap:'bootstrap',
        domReady: 'vendor/domReady'

    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
      /*  jquerySha: {
            deps: [ 'jquery'],
            exports: 'jquerySha'
        },*/
        angular: {
            deps: [ 'jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: [ 'angular'],
            exports: 'angularRoute'
        }
    }
    //deps:['bootstrap'],//先加载bootstrap文件
    /* urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用*/
});
//
require([
        'angular','angularRoute',
        'app', 'domReady','jquery',/*'jquerySha',*//*'weixin',*/
        'filters/intervalFilters',
        'controllers/shareController',
        'controllers/commonController',
        'interceptors/requestInterceptors'
        /*  'directives/ngbkFocus'*/
        // Any individual controller, service, directive or filter file
        // that you add will need to be pulled in here.
    ],
    function (angular,angularRoute,app, domReady) {
        'use strict';
        app.config(['$httpProvider','$routeProvider',
            function($httpProvider,$routeProvider) {
                $httpProvider.interceptors.push('RequestInterceptors');
            }
        ]);

        domReady(function() {
            angular.bootstrap(document, ['zhwApp']);
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
