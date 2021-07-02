// $(document).ready(function(){
//     $(".dropdown").click(function(){
//       $(".filter-bar .filter .collapse").toggle();
//     });
// });

$(document).ready(function () {
    $(".dropdown").click(function () {
        $(this).find('.collapse').fadeToggle()
        $(this).find('.icon-right').toggleClass('rotate')
    });
});

$(document).ready(function () {
    $(".dropdown .dropdown-item").click(function () {
        let itemSelected = $(this).text();
        $(this).parent().parent().find('.value').text(itemSelected)
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropdown') & !event.target.matches('.value') & !event.target.matches('.icon-right')) {
        var dropdowns = document.querySelectorAll('.dropdown .collapse')
        var icon = document.querySelectorAll('.dropdown .icon-right')
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if ($(openDropdown).css('display') == 'block' ) {
                $(icon).removeClass('rotate')
                $(openDropdown).css('display', "none");
            }
        }
    }
}

$(document).ready(function () {
    $(".dropdown").click(function () {
        let dropdown = $(".dropdown");
        for (let i = 0 ; i < dropdown.length; i++ ){
            let value = $(dropdown[i]).find('.value');
            let items = $(dropdown[i]).find('.dropdown-item');
            for ( let j = 0; j < items.length; j++){
                let item = items[j]
                if($(item).text() == $(value).text()){
                    $(item).addClass('dropdown-item--selected')
                } else {
                    $(item).removeClass('dropdown-item--selected')
                }
            }

        }
    });
});