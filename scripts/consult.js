// the app/scripts/main.js file, which defines our RequireJS config
require.config({
    paths: {
        angular: 'vendor/angular',
        angularRoute:'vendor/angular-route',
        jquery: 'vendor/jquery',
        easymobim:'vendor/easymob/easemob.im-1.0.5',
        json2:'vendor/easymob/json2',
        strophe:'vendor/easymob/strophe-custom-2.0.0',
        jqueryMd5:'vendor/jQuery.md5',
        domReady: 'vendor/domReady'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        jqueryMd5: {
            deps: [ 'jquery'],
            exports: 'jqueryMd5'
        },
        easymobim: {
            deps: [ 'jquery','strophe'],
            exports: 'easymobim'
        },json2: {
            deps: [ 'jquery'],
            exports: 'json2'
        },strophe: {
            deps: [ 'jquery'],
            exports: 'strophe'
        },
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
        'app', 'domReady','jquery','easymobim','json2','strophe','jqueryMd5',
        'filters/intervalFilters',
        'controllers/consultController',
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
