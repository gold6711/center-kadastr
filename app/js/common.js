//if($) alert("Yes!") ;
$(document).ready(function() {
    $(document).on('click','.hide-nav',function(){
        var nav = $('.nav_list');
        $('.hide-nav').toggleClass('active');
        nav.toggleClass('show')
    })
});

$('.sub-menu ul').hide();
$(".sub-menu a").click(function () {
    $(this).parent(".sub-menu").children("ul").slideToggle("200");
    $(this).find("i.fa").toggleClass("fa-angle-up fa-angle-down");
});