// Xử lý các affect của dropdown
$(document).ready(function () {
    new Dropdown()
})

class Dropdown {
    constructor() {
        this.initEvent()
    }

    initEvent() {
        let me = this;
        $(".dropdown").click(function () {
            me.toggleFade(this)
        });
        $(".dropdown").keypress(function (e) {
            if (e.code == "Enter") {
                me.toggleFade(this)
            }
        });
        $(".dropdown .dropdown-item").click(function () {
            me.selectItem(this)
        });
        $(".dropdown .dropdown-item").keypress(function (e) {
            if (e.code == "Enter") {
                me.selectItem(this)
                $(this).closest('dropdown').focus()
            }
        });
    }

    /**
     * Method hiện collapse dropdown
     * @param {element} el 
     */
    toggleFade(el) {
        $('.dropdown').not(el).find('.collapse').fadeOut()
        $(el).find('.collapse').fadeToggle()
        $(el).find('.icon-right').toggleClass('rotate')
        this.detectSelectDropdownItem()
    }

    /**
     * Method lựa chọn dropdown item được chọn
     * @param {element} el 
     */
    selectItem(el) {
        let itemSelected = $(el).text();
        $(el).parent().parent().find('.value').text(itemSelected)
    }

    /**
     * Method xác định dropdown item đã được chọn
     */
    detectSelectDropdownItem() {
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

}


/**
 * Hàm ẩn dropdown khi click ra ngoài
 * Author: NMTuan (06/07/2021)
 * @param {event} event 
 */
window.onclick = function (event) {
    if (!event.target.matches('.dropdown') & !event.target.matches('.value') & !event.target.matches('.icon-right')) {
        var dropdowns = document.querySelectorAll('.dropdown .collapse')
        var icon = document.querySelectorAll('.dropdown .icon-right')
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if ($(openDropdown).css('display') == 'block') {
                $(icon).removeClass('rotate')
                $(openDropdown).fadeOut();
            }
        }
    }
}