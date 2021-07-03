
// Xử lý các affect của dropdown


$(document).ready(function () {
    $(".dropdown").click(function () {
        toggleFade(this)
    });
});


$(document).ready(function () {
    $(".dropdown").keypress(function (e) {
        if (e.code == "Enter") {
            toggleFade(this)
        }
    });
});

$(document).ready(function () {
    $(".dropdown .dropdown-item").click(function () {
        selectItem(this)
    });
});

$(document).ready(function () {
    $(".dropdown .dropdown-item").keypress(function (e) {
        if (e.code == "Enter") {
            selectItem(this)
        }
    });
});

window.onclick = function (event) {
    if (!event.target.matches('.dropdown') & !event.target.matches('.value') & !event.target.matches('.icon-right')) {
        var dropdowns = document.querySelectorAll('.dropdown .collapse')
        var icon = document.querySelectorAll('.dropdown .icon-right')
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if ($(openDropdown).css('display') == 'block') {
                $(icon).removeClass('rotate')
                $(openDropdown).css('display', "none");
            }
        }
    }
}


/* 
    Hàm ẩn hiện collapse trong dropdown

*/
function toggleFade(el) {
    $(el).find('.collapse').fadeToggle()
    $(el).find('.icon-right').toggleClass('rotate')
    detectSelectDropdownItem()
}

/* 
    Hàm chọn item trong dropdown

*/
function selectItem(el) {
    let itemSelected = $(el).text();
    $(el).parent().parent().find('.value').text(itemSelected)
}

/* 
    Hàm xác định dropdown-item đã được chọn

*/
function detectSelectDropdownItem() {
    let dropdown = $(".dropdown");
    for (let i = 0; i < dropdown.length; i++) {
        let value = $(dropdown[i]).find('.value');
        let items = $(dropdown[i]).find('.dropdown-item');
        for (let j = 0; j < items.length; j++) {
            let item = items[j]
            if ($(item).text() == $(value).text()) {
                $(item).addClass('dropdown-item--selected')
            } else {
                $(item).removeClass('dropdown-item--selected')
            }
        }

    }
}