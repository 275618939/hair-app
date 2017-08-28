// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        iscroll: 'vendor/iscroll-lite',
        touchslider: 'vendor/jquery.touchslider.min',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
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
    }
});
require([
        'angular','angularRoute',
        'app', 'domReady','jquery',"iscroll","touchslider",
        'controllers/testController',
        'controllers/commonController',
        'interceptors/requestInterceptors'
    ],
    function (angular,angularRoute,app, domReady) {
        'use strict';
        app.config(['$httpProvider','$routeProvider','$sceDelegateProvider',
            function($httpProvider,$routeProvider,$sceDelegateProvider) {
                $httpProvider.interceptors.push('RequestInterceptors');
                $sceDelegateProvider.resourceUrlWhitelist([
                 'self',
                 'http://zhuowang.yalixinli.com**']);
            }
        ]);

        domReady(function() {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
