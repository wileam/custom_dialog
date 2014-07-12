define(['jquery'],function($){
    function Window() {
        this.cfg = {
            title:"Alert",
            msg:"",
            handle: null,
            width:500,
            height:300,
            hasCloseBtn:false,
            hasMask:true
        };
    }

    Window.prototype = {
        alert: function(cfg){
            var CFG = $.extend(this.cfg,cfg);
            // mask
            if(CFG.hasMask) {
                var $windowMask = $('<div class="window-mask"></div>');
                $windowMask.appendTo('body');
            }

            var $alertBox = $('<div class="window-alert"></div>');
            $alertBox.appendTo('body');

            // alert-hd
            var $alertHd = $('<div class="alert-hd"></div>'),
                $alertHdTitle = $('<div class="title"></div>'),
                $alertHdClose = $('<a  href="#" class="close">X</a>');

            $alertHdTitle.html(CFG.title);

            $alertHdTitle.appendTo($alertHd);
            if(CFG.hasCloseBtn) {
                $alertHdClose.appendTo($alertHd);
            }
            $alertHd.appendTo($alertBox);

            $alertHdClose.on('click', function(event) {
                event.preventDefault();

                $alertBox.remove();
                CFG.hasMask && $windowMask.remove();
            });

            // alert-bd
            var $alertBd = $('<div class="alert-bd"></div>'),
                $alertBdMsg = $('<div class="content"></div>');

            $alertBdMsg.html(CFG.msg);
            $alertBdMsg.appendTo($alertBd);
            $alertBd.appendTo($alertBox);

            $alertBd.css({
                height: (CFG.height - 82) + "px"
            });

            // alert-footer
            var $alertFooter = $('<div class="alert-footer"></div>'),
                $confirmBtn = $('<input type="button" value="OK" class="confirm-btn">');

            $confirmBtn.appendTo($alertFooter);
            $alertFooter.appendTo($alertBox);

            $confirmBtn.on('click', function(event) {
                event.preventDefault();
                /* Act on the event */
                CFG.handle && CFG.handle();
                $alertBox.remove();
                CFG.hasMask && $windowMask.remove();
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