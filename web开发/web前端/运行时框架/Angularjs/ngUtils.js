angular.module('ngUtilsModule', [])
.factory("ngUtils",
    function (clearAlertWhenClickBody,$compile,) {
        var commonStorage = {
            hasExist: {},
            countDown: {}
        };
        return {
            hasExist: function (origin, tag, prop) {
                var isExist = false;
                if (this.isArray(origin)) {
                    var i = origin.length;
                    while (i--) {
                        if (prop) {
                            if (origin[prop] === tag[prop]) {
                                isExist = true;
                                break;
                            }
                        } else {
                            if (origin === tag) {
                                isExist = true;
                                break;
                            }
                        }
                    }
                }

                if (this.isString(origin)) {
                    if (typeof tag === "object" && typeof prop === "string") {
                        isExist = origin.indexOf(tag[prop]) > -1;
                    } else {
                        isExist = origin.indexOf(tag) > -1;
                    }
                }

                if (this.isObject(origin)) {
                    if (typeof tag === "object" && typeof prop === "string") {
                        var realTag = tag[prop];
                        isExist = origin[realTag];
                    } else {
                        isExist = origin[tag];
                    }
                }

                return isExist;
            }

            , isFunction:function(functionLike){
                return Object.prototype.toString.call(functionLike) === '[object Function]';
            }

            , isObject: function (objectLike) {
                return Object.prototype.toString.call(objectLike) === '[object Object]';
            }

            , isArray: function (arrayLike) {
                return Object.prototype.toString.call(arrayLike) === '[object Array]';
            }

            , isString: function (stringLike) {
                return Object.prototype.toString.call(stringLike) === '[object String]';
            }

            , isNumber: function (numberLike) {
                return Object.prototype.toString.call(numberLike) === '[object Number]';
            }

            , isBoolean: function (booleanLike) {
                return Object.prototype.toString.call(booleanLike) === '[object Boolean]';
            }

            , isNull:function(nullLike){
                return Object.prototype.toString.call(nullLike) === '[object Null]';
            }

            , isUndefined:function(undefinedLike){
                return Object.prototype.toString.call(undefinedLike) === '[object Undefined]';
            }

            , isNumberString:function(numberStringLike){
                return this.isString(numberStringLike) && !isNaN(Number(numberStringLike));
            }

            , isUpper: function (code) {
                return this.isString(code) && code === code.toUpperCase();
            }

            , isEmpty:function(item){
                var result = null;
                try {
                    if(this.isObject(item)){
                        result = JSON.stringify(item).length === 2;
                    }
                    if(this.isString(item)){
                        result = item.length === 0;
                    }
                    if(item === null || item === undefined){
                        result = true;
                    }
                }catch (e) {
                    console.log(e.message);
                }
                return result;
            }

            , countDown: function (time, result, callback) {
                var countDownStorage = commonStorage.countDown;
                time = Math.abs(parseInt(time));
                stopCounting();
                startCounting(time, result);
                fillValue(time, result);

                function startCounting(time, result) {
                    countDownStorage.thisCounter = setInterval(function () {
                        time--;
                        if (time <= 0) {
                            stopCounting();
                            clearValue(result);
                            applyCallback(callback);
                            return;
                        }
                        fillValue(time, result);
                    }, 1000);

                    return stopCounting;
                }

                function fillValue(time, result) {
                    result.innerText = time;
                }

                function stopCounting() {
                    clearInterval(countDownStorage.thisCounter);
                    countDownStorage.thisCounter = null;
                }

                function applyCallback(callback) {
                    if (callback && typeof callback === "function") callback();
                }

                function clearValue(result) {
                    result.innerText = "";
                }

            }

            /**
             * @fieldEntries: ::{key:value,key:value...}
             * @return:       ::[key,key...]
             * */
            , getObjectKeys: function (fieldEntries) {
                var result = [];
                if (this.isObject(fieldEntries)) {
                    Object.keys(fieldEntries).forEach(function (entriesKey, index) {
                        result.push(entriesKey);
                    });
                } else {
                    result = fieldEntries;
                }
                return result;
            }

            , bindEnterKey: function (callback) {
                $('body').off("keydown").on("keydown", function (event) {
                    if (event.key === "Enter") {
                        callback();
                    }
                })
            }

            , getMonthLastDate:function(year,month,distance){
                year = year ? year : new Date().getFullYear();
                month = month ? month : (new Date().getMonth() + 1);
                distance = distance ? distance : 0;
                var nextMoth = month + 1;
                var curMothLastDayObj = new Date(new Date(year + "-" + nextMoth) - 1000*60*60*24);
                return curMothLastDayObj.getDate() - parseInt(distance);
            }

            , compare:function(originItems,modifiedItems,rowMark){

                var result = {
                    modifiedItems : [],
                    newItems : [],
                    abandonedItems : [],
                    unmodifiedItems : []
                };

                rowMark = rowMark ? rowMark : "index";

                if(this.isEmpty(originItems) || this.isEmpty(modifiedItems)){
                    result.abandonedItems = originItems;
                    result.newItems = modifiedItems;
                    return result;
                }

                // 1，默认情况，修改的会比原数据多，那么多出来的必定是新的
                // 2，原始的比修改的多，那么，没匹配的就会被剔除
                // 3，修改的和原始的一个都匹配不上，也就是说，修改的全部是新增的
                if(this.isArray(originItems) && this.isArray(modifiedItems)){

                    modifiedItems.forEach(function(modifiedItem,modifiedIndex){

                        if(modifiedItem[rowMark] !== undefined){
                            originItems.forEach(function(originItem){
                                // 相同对象，才进行比较
                                if(originItem[rowMark] === modifiedItem[rowMark]){
                                    originItem.isModified = false;
                                    modifiedItem.isModified = false;
                                    comparingItem(originItem,modifiedItem);
                                }
                            });

                        }else{
                            // 如果不提供标记，或者对应的标记没有赋值，就查找对应下标的originItem
                            var originItem = originItems[modifiedIndex];

                            // 如果对应的originItem有数据，就进行比对，如果没有，就证明modify是新增的
                            if(originItem){
                                originItem.isModified = false;
                                modifiedItem.isModified = false;
                                comparingItem(originItem,modifiedItem);
                            }

                        }
                    });

                    modifiedItems.forEach(function (modifiedItem) {
                        if(modifiedItem.isModified === undefined){
                            result.newItems.push(modifiedItem);
                        }
                        if(modifiedItem.isModified === false){
                            delete modifiedItem.isModified;
                            result.unmodifiedItems.push(modifiedItem);
                        }
                        if(modifiedItem.isModified === true){
                            delete modifiedItem.isModified;
                            result.modifiedItems.push(modifiedItem);
                        }
                    });

                    originItems.forEach(function (originItem) {

                        if(originItem.isModified === undefined){
                            result.abandonedItems.push(originItem);
                        }
                    });


                    function comparingItem(originItem,modifiedItem){
                        for(var prop in originItem){
                            if(originItem.hasOwnProperty(prop) && prop !== "$$hasKey"){
                                originItem[prop] = typeof originItem[prop] === "string" ? originItem[prop].trim() : originItem[prop];
                                modifiedItem[prop] = typeof modifiedItem[prop] === "string" ? modifiedItem[prop].trim() : modifiedItem[prop];
                                if(originItem[prop] !== modifiedItem[prop]){
                                    originItem.isModified = true;
                                    modifiedItem.isModified = true;
                                    break;
                                }
                            }
                        }
                    }
                }

                // 如果是对象类型，就返回字段名数组
                if(this.isObject(originItems) && this.isObject(modifiedItems)){
                    Object.keys(originItems).forEach(function(originKey){
                        if(modifiedItems[originKey] === undefined){
                            return result.abandonedItems.push(originKey);
                        }

                        if(modifiedItems[originKey] !== originItems[originKey]){
                            result.modifiedItems.push(originKey);
                        }else{
                            result.unmodifiedItems.push(originKey);
                        }

                    });

                    Object.keys(modifiedItems).forEach(function(modifiedKey){
                        if(originItems[modifiedKey] === undefined){
                            result.newItems.push(modifiedKey);
                        }
                    });
                }

                return result;
            }

            , dateFormat:function(fmt){
                //fmt 年-月-日 时:分:秒 季度 "YYYY-MM-DD hh:mm:ss q"
                var curDate = new Date();
                var o = {
                    "M+": curDate.getMonth() + 1, //月份
                    "D+": curDate.getDate(), //日
                    "h+": curDate.getHours(), //小时
                    "m+": curDate.getMinutes(), //分
                    "s+": curDate.getSeconds(), //秒
                    "q+": Math.floor((curDate.getMonth() + 3) / 3), //季度
                    "S": curDate.getMilliseconds() //毫秒
                };
                if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (curDate.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }
    }
)