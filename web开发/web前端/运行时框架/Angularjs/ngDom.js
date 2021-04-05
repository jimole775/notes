

angular.module('ngUtilsModule', [])
.factory('ngDom',
    function (clearAlertWhenClickBody,$compile, $q) {
        var commonStorage = {
            hasExist: {},
            countDown: {}
        };
        return {
          
          
             rightMenu: function (eventTarget, showTemplate, callback) {

                clearAlertWhenClickBody("." + showTemplate.className);

                eventTarget.oncontextmenu = function (e) {

                    if (showTemplate && showTemplate.style) {

                        // 优先显示，才有高宽可以获取
                        // 原因可能出现在模板生成处！
                        showTemplate.style.display = "block";
                        showTemplate.style.opacity = 0;

                        var maxHeight = document.documentElement.clientHeight;
                        var maxWidth = document.documentElement.clientWidth;
                        var showTplHeight = showTemplate.offsetHeight;
                        var showTplWidth = showTemplate.offsetWidth;

                        // 在鼠标右上方的位置
                        // var isBeyondDistance = e.clientY - showTplHeight - maxHeight;
                        // var topValue = isBeyondDistance > 0 ? e.clientY - showTplHeight - isBeyondDistance : e.clientY - showTplHeight;
                        // topValue = e.clientY - showTplHeight < 0 ? 0 : topValue;

                        // 在鼠标右下方的位置
                        var isBeyondDistance = e.clientY + showTplHeight - maxHeight;
                        var topValue = isBeyondDistance > 0 ? maxHeight - showTplHeight : e.clientY;

                        isBeyondDistance = e.clientX + showTplWidth > maxWidth;
                        var leftValue = isBeyondDistance > 0 ? e.clientX - showTplWidth : e.clientX;
                        showTemplate.style.opacity = 1;
                        showTemplate.style.position = "fixed";
                        showTemplate.style.zIndex = "9991";
                        showTemplate.style.top = topValue + "px";
                        showTemplate.style.left = leftValue + "px";

                        if (callback && callback instanceof Function) {
                            callback(searchingTr(e.target));
                        }

                        return false;
                    }

                };


                function searchingTr(target) {

                    if (target.nodeName !== "TR") {
                        target = searchingTr(target.parentNode);
                    }

                    return target;
                }
            }

            /**
             * 这里要明白，我们所谓的渲染就是动态拼接一个html模板，来对应directive在html中的状态
             * @name[String]        ::指令名
             * @props[Object]       ::对应html标签的属性，提供一个正常的键值对
             * @replace[Boolean]    ::是否要替换已有的指令，如果不设置，就默认只渲染一次
             * @env[Scope]          ::父级的$scope对象
             * @container[Element]  ::需要插入的位置，如果不设置，默认查找父级是否有 @name + 'Container' 这个ID,如果没有，抛出错误
             * @callback[Function]  ::回调
             * @return[callback]
             * */
            , renderDirective: function (customList) {
                // var delayTime = customList.delay;
                // var isReplace = customList.replace;
                // var props = customList.props;
                // var directiveName = customList.name;
                // var parentScope = customList.env;
                // var container = customList.container;
                // var callback = customList.callback;
                function ComponentBuilder(){

                    this.version = 1.0;
                    this.update = function(){};
                    this.destroy = function(){};
                    this.create = function(){};

                }

                function buildComponentExternalEvent(customList){

                    var thisComponent = {};
                    thisComponent.update = function(){};
                    thisComponent.destroy = function(){
                        customList.container.find("#" + customList.name).remove();
                    };
                    thisComponent.create = function(){};
                    return thisComponent;
                }

                function correlationTemplate(componentExternalObject,parentScope){

                    parentScope[customList.name + "Component"] = componentExternalObject;

                    customList.props["thisUpdate"] = customList.name + "Component" + ".update";

                    return componentExternalObject;
                }

                customList = queryParams(customList);
                if (customList.container) {
                    this.elementReady(customList.container, function (correctElement) {
                        customList.container = $(correctElement);
                        return render(customList);
                    });
                } else {
                    throw Error("we needs a container to load directive module!");
                }

                function render(customList) {
                    var isReplace = customList.replace;
                    var directiveName = customList.name;
                    var delayTime = customList.delay;
                    var container = customList.container;
                    var callback = customList.callback;
                    var parentScope = customList.env;
                    var props = customList.props;
                    // var componentExternalObject =
                    //     correlationTemplate(
                    //         buildComponentExternalEvent(customList,parentScope)
                    //         ,parentScope);

                    var template = spillTemplate(customList);

                    if (isReplace && container.find("[pms-id=" + directiveName + "]").length) {
                        container.find("[pms-id=" + directiveName + "]").remove();
                    }

                    if (delayTime) {
                        setTimeout(function () {
                            customList.env.$apply(container.append($compile(template)(parentScope)));
                            callback();
                        }, delayTime);
                    } else {
                        container.append($compile(template)(parentScope));
                        callback();
                    }

                    return {};
                }

                function spillTemplate(customList) {
                    var directiveName = splitToHtml(customList.name);
                    var props = anlyzParams(customList.props);
                    return "<" + directiveName + " " + props + "></" + directiveName + ">";

                    function anlyzParams(object) {
                        var result = "";
                        Object.keys(object).forEach(function (key) {
                            var htmlProp = splitToHtml(key);
                            var htmlPropValue = object[key];
                            result += htmlProp + "='" + htmlPropValue + "' ";
                        });
                        return result;
                    }

                    // "directiveName" => "directive-name"
                    function splitToHtml(string) {
                        var result = "";
                        var stringArray = string.split("");

                        stringArray.forEach(function (singleWord) {
                            if (singleWord === singleWord.toUpperCase()) {
                                result += "-" + singleWord.toLowerCase();
                            } else {
                                result += singleWord;
                            }
                        });

                        return result;
                    }
                }

                function queryParams(customList) {
                    var name = customList.name;
                    var env = customList.env;
                    var container = customList.container;
                    if (!container) container = "#" + name + "Container"; // 如果不给与渲染的位置，就直接默认用户已经设定了一个和directiveName同名的ID到位置元素
                    if (!name || !env || !container) throw Error("we needs a env to rendering directive module!");

                    var props = customList.props ? customList.props : {};
                    props['pmsId'] = props.id ? props.id : name;

                    var delay = customList.delay ? customList.delay : 0; //是否延迟渲染！
                    var replace = customList.replace; //是否在每次刷新的时候，先删后加！
                    var callback = customList.callback ? customList.callback : function () {
                    };

                    return {
                        name: name,
                        env: env,
                        container: container,
                        props: props,
                        delay: delay,
                        replace: replace,
                        callback: callback
                    };
                }

            }

            , queryElementType: function (targetOrSelector) {
                //1,如果是字符串，并且没有【#】和【.】 默认就定位【#】，如果获取不到，再获取【.】，如果获取到多个，就抛出错误，避免无法定位异常
                //2,如果是对象，就直接判断是否具有nodeType属性，如果有，就是原生dom，如果没有，就判断其长度，如果超过1个，就抛出错误
                //3,如果找不到对应的元素，统一返回null;
                var result = null;
                var doc = document;
                var element = null;
                if (typeof targetOrSelector === "string" && targetOrSelector.length > 0) {
                    var selector = targetOrSelector;
                    if (/^[#\.]/.test(selector)) {
                        element = doc.querySelectorAll(selector);
                        if (element.length > 1) {
                            throw Error("is not support multi rendering yet! please provides unique selector!");
                        } else if (element.length === 1) {
                            result = element[0];
                        } else {
                            console.log(element + " is not a correct element!");
                        }
                    } else {

                        element = doc.getElementById(selector);
                        if (element) {
                            result = element;
                        } else {
                            element = doc.getElementsByClassName(selector);
                            if (element.length > 1) {
                                throw Error("is not support multi rendering yet! please provides unique selector!");
                            } else if (element.length === 1) {
                                result = element[0];
                            } else {
                                console.log(element + " is not a correct element!");
                            }
                        }
                    }

                } else if (typeof targetOrSelector === "object") {
                    var target = targetOrSelector;
                    if (target.nodeType) {
                        result = target;
                    } else {
                        if (target.length > 1) {
                            throw Error("is not support multi rendering yet! please provides unique selector!");
                        } else if (target.length === 1) {
                            result = target[0];
                        } else {
                            console.log(target + " is not a correct element!");
                        }
                    }
                }

                return result;
            }

            /**
             * @elementOrSelector[Element|selector] dom元素或者选择器
             * @callback[Function] 回调
             * @topScope[pmsUtils] 递归使用，调用的时候【不需要传值】-- 其主要作用时在递归中能正确关联到当前的this域
             * @countTime[Number] 递归使用，调用的时候【不需要传值】-- 其主要作用时限制递归次数
             * */
            , elementReady: function (elementOrSelector, callback, topScope, countTime) {

                var scope = topScope ? topScope : this;
                var selector = elementOrSelector.selector ? elementOrSelector.selector : elementOrSelector;
                var element = scope.queryElementType(selector);
                countTime = countTime ? countTime-- : 100;

                if (countTime <= 0) {
                    return console.log("已经尽力了，确实找不到需要监听的元素！");
                }

                if (element) {
                    return callback(element);
                } else {
                    setTimeout(function () {
                        element = null;
                        return scope.elementReady(elementOrSelector, callback, scope, countTime);
                    }, 45);
                }
            }

            , bindEnterKey: function (callback) {
                $('body').off("keydown").on("keydown", function (event) {
                    if (event.key === "Enter") {
                        callback();
                    }
                })
            }


            , waiting:{
                start:function(timing){
                    $("#pmsWaitingLayer").remove();
                    $("div[ui-view]").append('<table id="pmsWaitingLayer" style="width:100%;height:100%;position:absolute;left:0;top:0;z-index: 111111111;background:rgba(33,33,33,0.3)"><tbody><tr><td class="text-center"><img src="img/loading1.gif"></td></tr></tbody></table>');

                    setTimeout(function(){
                        $("#pmsWaitingLayer").remove();
                    },timing ? timing : 15000)
                },
                end:function(){
                    $("#pmsWaitingLayer").remove();
                }
            }

        }
    }
)