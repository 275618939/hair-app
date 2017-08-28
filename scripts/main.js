// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        /* iscroll: 'vendor/iscroll-lite',*/
        touchslider: 'vendor/jquery.touchslider.min',
        unslider: 'vendor/unslider',
        swipe: 'vendor/jquery.event.swipe',
        move: 'vendor/jquery.event.move',
        /*   twitter:'vendor/bootstrap',*/
        //bootstrap:'bootstrap',
        domReady: 'vendor/domReady'

    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        move: {
            deps: [ 'jquery'],
            exports: 'move'
        },
        swipe: {
            deps: [ 'jquery','move'],
            exports: 'swipe'
        },
        unslider: {
            deps: [ 'jquery'],
            exports: 'unslider'
        },
        touchslider: {
            deps: [ 'jquery'],
            exports: 'touchslider'
        },
        /*   iscroll: {
         deps: [ 'jquery'],
         exports: 'iscroll'
         },*/
        angular: {
            deps: [ 'jquery'],
            exports: 'angular'
        }, angularRoute: {
            deps: [ 'angular'],
            exports: 'angularRoute'
        }
    },
    waitSeconds: 0
    //deps:['bootstrap'],//�ȼ���bootstrap�ļ�
    /* urlArgs: "bust=" + (new Date()).getTime()  //��ֹ��ȡ���棬������*/
});
//
require([
        'angular','angularRoute',
        'app', 'domReady','jquery',/*"iscroll",*/"touchslider","unslider","swipe",
        'filters/intervalFilters',
        'filters/nameFilters',
        /* 'controllers/rootController',
         'controllers/bannerController',
         'controllers/infomationController',
         'controllers/courseController',*/
        'controllers/mainController',
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
                /*      $routeProvider.when('/', {
                 templateUrl: 'views/root.html',
                 controller: 'IndexCtrl'
                 }).otherwise({
                 redirectTo: '/'
                 });*/
                /*  $routeProvider.when('/detail/:id', {
                 templateUrl: 'detailInfo.html'
                 /!*controller: 'IndexCtrl'*!/
                 }).otherwise({
                 redirectTo: '/'
                 });*/
            }
        ]);

        domReady(function() {
            angular.bootstrap(document, ['zhwApp']);
            // The following is required if you want AngularJS Scenario tests to work
            $('html').addClass('ng-app: zhwApp');
        });
    }
);
