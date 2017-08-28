/*
 $scope.getDataByKey=function(e,item){
 var data=e.target.result;
 console.log(data.consultId);
 };
 $scope.getDataAll=function(e){
 var result = e.target.result;
 if (!!result == false)
 return;
 //console.log(result.value.consultId);
 result.continue();//这边执行轮询读取
 }*/
/*         setTimeout(function(){
 //consultDaoService.getDataByKey(consultDaoService.storeName,1,$scope.getDataByKey);
 consultDaoService.getDataAll(consultDaoService.storeName, $scope.load);
 },500);*/
define(['services/services','services/commonService'],
    function(services) {
        services.factory('ConsultDaoService', ['$http','$q','CommonService',
            function($http,$q,commonService) {
                return {
                    path:'id',
                    storeName:'messages',
                    session:{from:'',to:'',content:'',times:0,type:0},//0：咨询师回复的内容，1：用户发送的内容
                    messages:{id:0,  userId:0, fromId:"",toId:"",content:"",count:0, state:0, times:0,session:[] },
                    //重置messages
                    resetMessages:function(){
                        this.messages={id:0, userId:0, fromId:"",toId:"",content:"",count:0, state:0, times:0,session:[]};
                    },
                    //重置session
                    resetSession:function(){
                        this.session={from:'',to:'',content:'',times:0,type:0};
                    },
                    //数据库信息
                    consultDb:{
                        name:'consult',
                        version:1,
                        db:null
                    },
                    //打开数据库
                    openDB:function(){
                        var daoService=this;
                        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                        if(!window.indexedDB) {
                            alert("很遗憾,不支持IndexDb,无法缓存历史记录!");
                            return;
                        }
                        var request=window.indexedDB.open(daoService.consultDb.name,daoService.consultDb.version);
                        request.onerror=function(e){
                            console.log('OPen Error!');
                        };
                        request.onsuccess=function(e){
                            console.log('OPen Success');
                            daoService.consultDb.db=e.target.result;
                        };
                        request.onupgradeneeded=function(e){
                            var db=e.target.result;
                            console.log('DB Name changed to '+db.name);
                            console.log('DB storeName changed to '+daoService.storeName);
                            if(!db.objectStoreNames.contains(daoService.storeName)){
                                db.createObjectStore(daoService.storeName,{keyPath:daoService.path});
                            }
                            console.log('DB version changed to '+db.version);
                        };
                    },
                    //关闭数据库
                    closeDb:function(){
                        if(this.consultDb.db!=null){
                            this.consultDb.db.close();
                        }
                    },
                    //删除数据库
                    deleteDb:function(name){
                        window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
                        window.indexedDB.deleteDatabase(name);
                    },
                    //添加数据
                    addData:function(storeName,datas){
                        var transaction= this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        store.add(datas);
                        /* for(var i=0;i<datas.length;i++){
                         store.add(datas[i]);
                         }*/
                    },
                    //查找表中所有数据
                    getDataAll:function(storeName,fun){
                        var data=null;
                        var transaction=this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        var keyRange = IDBKeyRange.lowerBound(0);
                        //开启索引为0的表
                        var request = store.openCursor(keyRange);
                        request.onsuccess=fun;
                    },
                    //查找数据
                    getDataByKey:function(storeName,value){
                        var deferred = $q.defer();
                        var transaction=this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        var request=store.get(value);
                        request.onsuccess=function(e){
                            data=e.target.result;
                            deferred.resolve(data);
                        };
                        return deferred.promise;
                    },
                    //更新数据
                    updateDataByKey:function(storeName,key,value){
                        var transaction=this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        var request=store.get(key);
                        request.onsuccess=function(e){
                            //data=e.target.result;
                            //student.age=35;
                            store.put(value);
                        };
                    },
                    //删除数据
                    deleteDataByKey:function(storeName,value){
                        var transaction=this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        store.delete(value);
                    },
                    //清除表中数据
                    clearObjectStore:function(storeName){
                        var transaction=this.consultDb.db.transaction(storeName,'readwrite');
                        var store=transaction.objectStore(storeName);
                        store.clear();
                        //删除数据库中的表
                        /*  if(db.objectStoreNames.contains('students')){
                         db.deleteObjectStore('students');
                         }*/
                    }




                };
            }]);
    });
