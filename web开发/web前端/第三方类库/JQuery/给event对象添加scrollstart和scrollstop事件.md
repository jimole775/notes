 ``` js
 (function(){
    var special = jQuery.event.special,
        handle = jQuery.event.handle ? jQuery.event.handle : jQuery.event.dispatch, // 兼容1.9之后jQuery.event.handle为undefined的BUG
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1)
    special.scrollstart = {
        setup() {
            var timer,
                handler = function (evt) {
                    var _self = this,
                        _args = arguments
                    if (timer) {
                        clearTimeout(timer)
                    } else {
                        evt.type = 'scrollstart'
                        handle.apply(_self, _args)
                    }
                    timer = setTimeout(() => {
                        timer = null
                    }, special.scrollstop.latency)
                }
            jQuery(this).bind('scroll', handler).data(uid1, handler)
        },
        teardown() {
            jQuery(this).unbind('scroll', jQuery(this).data(uid1))
        }
    }
    special.scrollstop = {
        latency: 300,
        setup: function() {
            var timer,
                handler = function(evt) {
                    var _self = this,
                        _args = arguments
                    if (timer) {
                        clearTimeout(timer)
                    }
                    timer = setTimeout( function(){
                        timer = null
                        evt.type = 'scrollstop'
                        handle.apply(_self, _args)
                    }, special.scrollstop.latency)
                }
            jQuery(this).bind('scroll', handler).data(uid2, handler)
        },
        teardown: function() {
            jQuery(this).unbind('scroll', jQuery(this).data(uid2))
        }
    }
})()
```