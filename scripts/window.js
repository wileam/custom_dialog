define(['jquery'],function($){
    function Window() {

    }

    Window.prototype = {
        alert: function(msg){
            var $alertBox = $('<div class="window_alert"></div>');
            $alertBox.appendTo('body');
            $alertBox.html(msg);
        },
        comfirm: function(){},
        prompt: function(){}
    }
    return {
        Window: Window
    }
});