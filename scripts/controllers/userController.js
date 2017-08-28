define(['controllers/controllers', 'services/userService', 'services/commonService', 'services/consultService', 'services/paramService', 'services/courseService', 'services/consultDaoService'],
    function (controllers) {
        /*用户注册*/
        controllers.controller('RegisterCtrl', ['$scope', 'UserService', 'CommonService',
            function ($scope, userService, commonService) {
                $scope.InterValObj; // timer变量，控制时间
                $scope.curCount = 0;	  // 当前剩余秒数
                $scope.count = 30;     // 倒计时长度
                $scope.codeLength = 6;// 验证码长度
                //注册
                $scope.onRegister = function () {
                    var phone = $("#phone").val();
                    var identifying = $("#identifying").val();
                    var password = $("#password").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    if (identifying.trim() == "" || identifying == null) {
                        alert("请输入验证码！");
                        return;
                    }
                    if (password.trim() == "" || password == null) {
                        alert("请输入密码！");
                        return;
                    }
                    //构造加密参数
                    var pass = $.md5(phone + $.md5(phone + password) + identifying);
                    var data = {account: phone, verify: identifying, password: pass};
                    var promise = userService.userCreate(data);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                        var ssid = data.value;
                        commonService.addCookie("hair-sessionId", ssid);
                        window.location.href = "hair-index.html";
                    });
                    //记录userid，username 写入cookie
                    commonService.addCookie("userId", userId, commonService.OneDayValidity);
                    commonService.addCookie("userName", userName, commonService.OneDayValidity);
                }

                // timer处理函数
                $scope.sendCaptcha = function () {
                    var phone = $("#phone").val();
                    if (isNaN(phone) || (phone.length != 11)) {
                        alert("手机号码为11位数字！请正确填写！");
                        return;
                    }
                    //发送请求道服务端
                    if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))) {
                        $("#phone").focus();
                        alert("请输入正确的手机号!");
                        return;
                    }
                    var promise = userService.sendVerify(phone);
                    promise.then(function (data) {
                        if (data.state != 1) {
                            alert(data.desc)
                            return;
                        }
                    });
                    $scope.curCount = $scope.count;
                    $("#captcha").css("background", "#b2b2b2");
                    $("#captcha").attr("disabled", "true");
                    $("#captcha").text("剩余:" + $scope.count);
                    $scope.InterValObj = window.setInterval($scope.setRemainTime, 1000); // 启动计时器，1秒执行一次
                };
                // timer处理函数
                $scope.setRemainTime = function () {
                    if ($scope.curCount == 0) {
                        window.clearInterval($scope.InterValObj);// 停止计时器
                        $("#captcha").removeAttr("disabled");// 启用按钮
                        $("#captcha").text("重新发送");
                        $("#captcha").css("background", "#61beec");
                    } else {
                        $scope.curCount--;
                        $("#captcha").text("剩余:" + $scope.curCount);
                    }
                };

            }]);
        //用户登录
        controllers.controller('LoginCtrl', ['$scope', 'UserService', 'CommonService',
            function ($scope, userService, commonService) {
                //注册
                $scope.onLogin = function () {

                };
            }
        ]);


    });

