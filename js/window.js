define(['jquery'],function($){
    function Window() {

    }

    Window.prototype = {
        alert: function(msg,handle){
            var $alertBox = $('<div class="window-alert"></div>');
            $alertBox.appendTo('body');
            $alertBox.html(msg);

            var $closeBtn = $('<input type="button" value="Close" class="closeBtn">');
            $closeBtn.appendTo($alertBox);

            if(handle) {
                $closeBtn.on('click',function(event) {
                    event.preventDefault();
                    /* Act on the event */
                    handle();
                    $alertBox.remove();
                });
            }
        },
        comfirm: function(){},
        prompt: function(){}
    }
    return {
        Window: Window
    }
});