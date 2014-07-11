define(['jquery'],function($){
    function Windows() {

    }

    Windows.prototype = {
        alert: function(){},
        comfirm: function(){},
        prompt: function(){}
    }
    return {
        Window: Window;
    }
});