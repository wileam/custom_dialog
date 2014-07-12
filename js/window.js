define(['jquery'],function($){
    function Window() {
        this.cfg = {
            width:500,
            height:300,
        };
    }

    Window.prototype = {
        alert: function(msg,handle,cfg){
            var $alertBox = $('<div class="window-alert"></div>');
            $alertBox.appendTo('body');
            $alertBox.html(msg);

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
                handle && handle();
                $alertBox.remove();
            });

            $.extend(this.cfg, cfg);

            $alertBox.css({
                height: this.cfg.height + "px",
                width: this.cfg.width + "px",
                top: (this.cfg.y || (window.innerHeight - this.cfg.height)/2) + "px",
                left: (this.cfg.x || (window.innerWidth - this.cfg.width)/2) + "px"
            });

        },
        comfirm: function(){},
        prompt: function(){}
    }
    return {
        Window: Window
    }
});