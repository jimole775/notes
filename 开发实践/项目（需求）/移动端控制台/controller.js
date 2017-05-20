/**
 * Created by Andy on 2016/8/26.
 */
(function () {
    var win = window;
    win.regular = {};

    var $AppConsole = $("#AppConsole");
    var $AppConsoleHead = $("#AppConsoleHead");
    var $AppConsoleBody = $("#AppConsoleBody");
    var $extendFunTag = $("#extendFunTag");
    var $extendFunTagHook = $("#extendFunTagHook");
    var $consolePlatform = $("#consolePlatform");
    var $hoverButtonBox = $("#hoverButtonBox");
    var $consoleRange = $consolePlatform.find("textarea");
    var $clickAnimation = $("#clickFlagTier");
    var $consoleCMDs = $("#consoleCMDs");
    var $_close = $("#_close");
    var $_save = $("#_save");
    var codeStorage = [];
    var codeStorageIndex = 0;
    var selfHeight = $hoverButtonBox.height();
    var resizeHoverButton = (function () {
        var bodyHeight = $AppConsole.height();
        var buttonBox = $hoverButtonBox.height();
        var headerHeight = $AppConsoleHead.height();
        var space = bodyHeight - buttonBox + headerHeight;
        $hoverButtonBox.css({
            top: space / 2,
            height: selfHeight + ((space - selfHeight) / 5)
        });

        return arguments.callee;
    })();

    (function appendCMD(cmdList_obj) {
        var str = "";
        for (var prop in cmdList_obj)
            if (cmdList_obj.hasOwnProperty(prop))
                str += '<tr><td>' + prop + '<i style="display: none">' + cmdList_obj[prop] + '</i>' + '</td></tr>';

        $consoleCMDs.find("tbody").append(str);
        $consoleCMDs.find("tr").each(function (index, item) {
            $(item).off().on("click", function () {
                var self = $(this);
                console.log(self);
                $consoleCMDs.hide();
                $consoleRange.val(self.find("i").text());
            })
        })
    })({
        "发送数据给DEV": "devService.sendDataToDev()",
        "发送数据给APP": "win.appService.sendDataToApp()",
        "关闭加载遮罩": "tool.loading(0)",
        "开启加载遮罩": "tool.loading()"
    });

    $("#clearButton").on("click", function () {
        if ($consolePlatform.is(":visible")) {
            $consoleRange.val("");
            if ($consoleCMDs.is(":visible"))
                $consoleCMDs.hide();
            else
                $consoleCMDs.show();
        } else {
            $AppConsoleBody.html("");
        }
    });


    $("#scrollToBottomButton").on("click", function () {
        if ($consolePlatform.is(":visible"))
            exec();
        else
            $AppConsoleBody.scrollTop($AppConsoleBody[0].scrollHeight);
    });

    //模拟doubleClick事件
    var clickTime = 0;
    $AppConsoleHead.on("touchstart", function () {
        if (++clickTime >= 2) {
            if ($consolePlatform.is(":visible")) {
                $consolePlatform.hide();
                $AppConsoleBody.show();
            } else {
                $consolePlatform.show();
                $consoleCMDs.hide();
                $consoleRange.focus();
                $AppConsoleBody.hide();
            }
        }
        setTimeout(function () {
            clickTime = 0;
        }, 300);
    });

    function exec() {
        var code = $consoleRange.val();
        $consoleRange.val("");
        try {
            var fn = new Function(code);
            fn();
        } catch (e) {
            console.log(e.message);
            return;
        }
        codeStorage.push(code);
        codeStorage.unDuplicate();
        codeStorageIndex = codeStorage.length;
    }

    //如果在PC端操作，使用ctrl+enter键，并且取消blur事件，防止发生两次事件
    document.onkeydown = function (e) {

        if (e.ctrlKey) {          //ctrl

            $consoleRange.off("blur");
            switch (e.keyCode) {
                case 13:        //enter
                    exec();
                    break;
                case 38:        //向上
                    codeStorageIndex--;
                    if (codeStorageIndex < 0) {
                        codeStorageIndex = 0
                    }
                    $consoleRange.val(codeStorage[codeStorageIndex]);
                    break;

                case 40:        //向下
                    codeStorageIndex++;
                    if (codeStorageIndex > codeStorage.length) {
                        codeStorageIndex = codeStorage.length
                    }
                    $consoleRange.val(codeStorage[codeStorageIndex]);
                    break;

            }

        }

    };


    /*********************
     * 捕捉控制台打印信息 *
     ********************/
    if (console) {
        var _console = {
            log: console.log
        };
        console.log = function () {
            // 做自己的处理
            _log.apply(this, Array.prototype.slice.call(arguments, 0));
            // 调用原方法输出
            _console.log.apply(this, Array.prototype.slice.call(arguments, 0));
        };
        // warn、debug、error同理
    }


    /*********************
     * window错误信息捕捉 *
     ********************/
    win.onerror = function () {
        setTimeout(function () {
            _log.apply(this, Array.prototype.slice.call(arguments, 0));
        }, 300);
        return false;
    };


    /******************
     * angular异常捕捉 *
     ******************/
    if (win.angular && win.App) {
        win.App.config(function ($provide) {
            $provide.decorator("$exceptionHandler", ['$delegate', function ($delegate) {     //$exceptionHandler"  错误异常处理器
                return function (exception, cause) {
                    //Raygun.send(exception);                   //发送到Raygun在线BUG接收站
                    //_log(exception.stack, cause);
                    angular_logPrevHandle(exception.stack, cause);
                    $delegate(exception, cause);                //$delegate 是异常处理器的实体，我们会调用它来获得输出到控制台的原始行为.
                }
            }])
        });
    }


    function angular_logPrevHandle(stack, cause) {
        var errAry = stack.split("\n");
        _log.apply(this, errAry.concat(cause));
    }


    /**********************
     * 实时打印信息实体函数 *
     **********************/
    function _log() {
        var msg = "";
        try {
            if (arguments.length) {
                var len = arguments.length;
                var param = arguments[0].toString();
                var i = 1;
                //捕捉window错误，使用红色加重字体；
                if (/(error)/ig.test(param.substr(0, 20)) ||
                    /(Unexpected)/ig.test(param.substr(0, 40)) ||
                    /(is not defined)$/ig.test(param.substring(param.length - 20, param.length)) ||
                    /(of undefined)$/ig.test(param.substring(param.length - 20, param.length))
                ) {
                    msg += "<p class='warn-text' style='font-weight: bold;'>" + param + "</p>";
                    //普通打印文本
                    while (i < len) {
                        param = arguments[i++];
                        msg += "<p style='text-indent:1.4rem;'>" + (typeof param === "object" ? JSON.stringify(param) : param) + "</p>";
                    }
                }
                else {
                    msg += "<p>" + param + "</p>";
                    //普通打印文本
                    while (i < len) {
                        param = arguments[i++];
                        msg += "<p>" + (typeof param === "object" ? JSON.stringify(param) : param ) + "</p>";
                    }
                }
            }
        } catch (e) {
            msg += e.message;
        }
        var newDate = new Date();
        var hour = newDate.getHours();
        var min = newDate.getMinutes();
        var sec = newDate.getSeconds();
        var _element = '<li style="border-bottom: 1px solid rgb(255, 132, 132);padding:0.5rem;word-break: break-all;font-size: 1.4rem;">' + "【" + hour + ":" + min + ":" + sec + "】" + msg + '</li>';


        //todo 方案1
        // 普通数据只有在 控制台存在 的时候打印,异常捕捉随时打印
        //if (isErr) {
        //    $AppConsoleBody.append(_element);
        //}
        //else if($AppConsole.is(":visible")){
        //    $AppConsoleBody.append(_element);
        //}

        //todo 方案2
        // 不管什么数据都打印，不过只存30条，可以方便在遇到异常时再打开log,仍然可以查看最后的数据
        var logs = $AppConsoleBody.find("li");
        if (logs.length < 30) {
            $AppConsoleBody.append(_element);
        } else {
            $(logs[0]).remove();
            $AppConsoleBody.append(_element);
        }
    }

    $_close.on("click", function () {
            $AppConsoleBody.html("");
            $AppConsole.hide();
        }
    );

    $_save.on("click", function () {
        var debugContent = $AppConsoleBody.html().splice(/(<p>|<\/p>|<li>|<\/li>)/g, "");
        tool.DebugLogPrintf(debugContent);
    });

    var waitingFn = null;
    var lightAnimation = null;
    var waitingSec = 0;
    var activeTier = $("#activeTier");
    var dibClickEvent = {
        touchstart: function (e) {
            waitingSec++;
            if (waitingSec === 2 && !$AppConsole.is(":visible")) {
                activeTier.show();

                //限定3秒钟只触发一次,以waitingSec为触发机制，
                // 所以3秒后重置waitingSec为0，否则waitingSec的值只会无限大，永远不会等于2
                setTimeout(function () {
                    activeTier.hide();
                    waitingSec = 0;
                }, 3000);
            }
        }
    };

    var callConsole = {
        touchstart: function (e) {
            tool.stopPropagation(e);

            if (!lightAnimation) {
                var _opacity = 0.5;
                lightAnimation = setInterval(function () {
                    _opacity -= 0.1;
                    $clickAnimation.css({
                        opacity: _opacity
                    });

                    if (_opacity <= 0) {
                        clearInterval(lightAnimation);
                        lightAnimation = null;
                    }
                }, 45);
            }

            //5秒钟内只触发一次，以waitingFn为触发机制；
            if (!waitingFn)
                waitingFn = setTimeout(function () {
                    $AppConsole.show();
                    //考虑到有时候touchend会丢失，所以当控制台显示的时候，重置触发开关waitingFn；
                    waitingFn = null;
                }, 5000);

        },

        touchend: function (e) {
            clearTimeout(waitingFn);
            waitingFn = null;
        }
    };

    $("body").on(dibClickEvent);
    activeTier.off().on(callConsole);
})();
