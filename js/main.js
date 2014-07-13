require.config({
    paths:{
        jquery: 'jquery-1.9.0',
        jqueryUI: 'jquery-ui-1.11.0.min'
    }
});

// 此处require jquery是因为下面要用到jquery的选择器，如果里面不需要用到jq，只需要require window进来即可。
require(['jquery','window'],function($,w){
    $('#a').click(function(){
        var win = new w.Window();
        win.alert({
            title:"提示（标题区域可拖动）",
            msg:"welcome!",
            handle: function(){
                alert("You close the dialog.");
            },
            width: 300,
            height: 150,
            y: 100,
            hasCloseBtn:true,
            hasMask:true,
            isDraggable:true,
            dragHandle:'.alert-hd'
        });
        win.on('close',function(){
            alert("This is the second handler for comfirm btn.");
        })
    });
});