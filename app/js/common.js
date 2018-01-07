$(document).ready(function() {
    $(document).on('click','.hide-nav',function(){
        var nav = $('.nav_list');
        $('.hide-nav').toggleClass('active');
        nav.toggleClass('show')
    })
});