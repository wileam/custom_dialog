require.config({
    paths:{
        jquery: 'jquery-1.9.0'
    }
});

require(['jquery','window'],function($,w){
    $('#a').click(function(){
        new w.Window().alert("welcome!",function(){
        	window.alert("You close the dialog.");
        });
    })
})