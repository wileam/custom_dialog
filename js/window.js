define(['jquery'],function($){
    function Window() {
        this.cfg = {
            msg:"system message",
            handle: null,
            width:500,
            height:300
        };
    }

    Window.prototype = {
        alert: function(cfg){
            var CFG = $.extend(this.cfg,cfg);
            var $alertBox = $('<div class="window-alert"></div>');
            $alertBox.appendTo('body');
            $alertBox.html(CFG.msg);

            var $confirmBtn = $('<input type="button" value="OK" class="confirm-btn">');
            $confirmBtn.appendTo($alertBox);

            // if(handle) {
            //     $confirmBtn.on('click',function(event) {
            //         event.preventDefault();
            //         /* Act on the event */
            //         handle();
            //         $alertBox.remove();
            //     });
            // }

            $confirmBtn.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                CFG.handle && CFG.handle();
                $alertBox.remove();
            });

            $alertBox.css({
                height: CFG.height + "px",
                width: CFG.width + "px",
                top: (CFG.y || (window.innerHeight - CFG.height)/2) + "px",
                left: (CFG.x || (window.innerWidth - CFG.width)/2) + "px"
            });

        },
        comfirm: function(){},
        prompt: function(){}
    }
    return {
        Window: Window
    }
});