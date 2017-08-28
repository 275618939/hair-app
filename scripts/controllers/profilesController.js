define(['controllers/controllers',  'services/userService','services/commonService'],
    function(controllers) {

        /*完善个人档案*/
        controllers.controller('ProfilesCtrl', ['$scope','UserService', 'CommonService','$rootScope',
            function($scope,userService,commonService,$rootScope) {

                $('#birthday').mobiscroll().date();
                //初始化日期控件
                var opt = {
                    preset: 'date', //日期
                    theme: 'android-ics light', //皮肤样式
                    display: 'modal', //显示方式
                    mode: 'clickpick', //日期选择模式
                    dateFormat: 'yy-mm-dd', // 日期格式
                    setText: '确定', //确认按钮名称
                    cancelText: '取消', //取消按钮名籍我
                    dateOrder: 'yy-mm-dd', //面板中日期排列格式
                    dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
                    endYear: 2020 //结束年份
                };
                $('#birthday').mobiscroll(opt);
                //获取个人档案信息
                //var userId=commonService.getCookie("userId");
             /*   if(userId!=null&&"undefined"!= typeof userId) {*/
                    var promise = userService.getMyselfInfo();
                    promise.then(function (data) {
                        if (data.state != 1) {
                            return;
                        }
                        $('#birthday').val(commonService.strToTime(data.value.birthday));
                        if (data.value.sex == 1) {
                            $("#women").click(function () {
                                $('#women').attr("checked", true);
                            });
                            $("#women").trigger("click");
                        }
                        if (data.value.marry == 0) {
                            $('#none').attr("checked", true);
                            $("#none").click(function () {
                                $('#none').attr("checked", true);
                            });
                            $("#none").trigger("click");
                        }
                    });
               /* }*/

                /*提交个人信息*/
                $scope.submitUserInfo=function(){

                    var birthday= $('#birthday').val();
                    var sex = $('input[name="sex"]:checked ').val();
                    var marry = $('input[name="marry"]:checked ').val();
                    if(birthday.trim()==""||birthday==null){
                        alert("请选择出生日期!");
                        return;
                    }
                    var year=birthday.substring(0,4);
                    var month=birthday.substring(5,7)-1;
                    var date=birthday.substring(8,10);
                    var date1=new Date(year,month,date);
                    var date2=new Date();
                    var time=date1.getTime()-date2.getTime();
                    if(time>=0){
                        alert("请选择合法的出生日期!");
                        return;
                    }
                    //birthday=(birthday.replace(/\-/g, ""));
                    var data={birthday:birthday,sex:sex,marry:marry};
                    var promise = userService.postCounseling(data);
                    promise.then(function(data) {
                        if(data.state!=1){
                            alert(data.desc);
                            return;
                        }
                        //window.history.go(-1); //后退一页
                        //window.history.go(-2); //后退两页
                        window.location.href="consulation.html";
                    });
                }




            }]);







    });

