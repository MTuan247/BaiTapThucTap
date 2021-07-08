// Xử lý các affect của dropdown
$(document).ready(function () {
    new ComboBox()
})

class ComboBox {
    constructor() {
        this.initEvent()
    }

    /**
     * Hàm thêm event
     * Author: NMTuan (07/07/2021)
     */
    initEvent() {
        let me = this;
        $(".combo-box").find('.combo-box__icon').click(function () {
            me.toggleFade($(this).parent())
        });
        $(".combo-box").keypress(function (e) {
            if (e.code == "Enter") {
                me.toggleFade(this)
            }
        });
        $(".combo-box .combo-box__item").click(function () {
            me.selectItem(this)
            me.collaseFadeOut($(this).closest('.combo-box'))
        });
        $(".combo-box .combo-box__item").keypress(function (e) {
            if (e.code == "Enter") {
                me.selectItem(this)
                $(this).next('.combo-box').focus()
                // me.collaseFadeOut($(this).closest('.combo-box'))
            }
        });

        $(".combo-box input").on('input', function () {
            me.detectItemMatched($(this).parent())
        })

        $(".combo-box input").focus(function(){
            me.collaseFadeIn(this)
            $(this).parent().addClass('combo-box--focus')
        })

        $(".combo-box input").focusout(function(){
            $(this).parent().removeClass('combo-box--focus')
        })

    }

    /**
     * Method ẩn, hiện collapse combo-box
     * Author: NMTuan (07/07/2021)
     * @param {element} el 
     */
    toggleFade(el) {
        $('.combo-box').not(el).find('.collapse').fadeOut()
        $(el).find('.collapse').fadeToggle()
        $(el).find('.combo-box__icon').toggleClass('rotate')
        this.detectSelectDropdownItem()
    }

    /**
     * Hàm hiện combo-box collaspe
     * Author: NMTuan (07/07/2021)
     * @param {element} el element combobox
     */
    collaseFadeIn(el) {
        $('.combo-box').not($(el).parent()).find('.collapse').fadeOut()
        $(el).parent().find('.collapse').fadeIn()
        $(el).siblings('.combo-box__icon').addClass('rotate')
        this.detectSelectDropdownItem()
    }

    /**
     * Hàm ẩn collapse
     * @param {element} el element combobox 
     */
    collaseFadeOut(el) {
        $(el).find('.collapse').fadeOut()
        $(el).find('.combo-box__icon').removeClass('rotate')
    }

    /**
     * Method lựa chọn dropdown item được chọn
     * Author: NMTuan (07/07/2021)
     * @param {element} el 
     */
    selectItem(el) {
        let itemSelected = $(el).text();
        $(el).parent().parent().find('.value').val(itemSelected)
    }

    /**
     * Method xác định dropdown item đã được chọn
     * Author: NMTuan (07/07/2021)
     */
    detectSelectDropdownItem() {
        let dropdown = $(".combo-box");
        for (let i = 0; i < dropdown.length; i++) {
            let value = $(dropdown[i]).find('.value');
            let items = $(dropdown[i]).find('.combo-box__item');
            for (let j = 0; j < items.length; j++) {
                let item = items[j]
                if ($(item).text() == $(value).val()) {
                    $(item).addClass('combo-box__item--selected')
                } else {
                    $(item).removeClass('combo-box__item--selected')
                }
            }

        }
    }

    /**
     * Hàm xác đinh items phù hợp, autocomplete
     * Author: NMTuan (07/07/2021)
     */
    detectItemMatched(el) {
        let items = $(el).find('.combo-box__item')
        let value = $(el).find('.value').val()
        debugger
        value = removeAccents(value)
        value = value.toLowerCase()
        $(items).each((each, item) => {
            let text = $(item).text()
            text = removeAccents(text)
            text = text.toLowerCase()
            if (text.includes(value)) {
                $(item).show()
            } else {
                $(item).hide()
            }
        })
    }

}


/**
 * Hàm ẩn dropdown khi click ra ngoài
 * Author: NMTuan (07/07/2021)
 * @param {event} event 
 */
document.onclick = function (event) {
    // if (!event.target.matches('.combo-box') & !event.target.matches('.value') & !event.target.matches('.combo-box__icon')) {
    if ($('.combo-box').has(event.target).length === 0 && !$('.combo-box').is(event.target)) {
        var comboBoxs = document.querySelectorAll('.combo-box .collapse')
        var icon = document.querySelectorAll('.combo-box .combo-box__icon')
        var i;
        for (i = 0; i < comboBoxs.length; i++) {
            var openDropdown = comboBoxs[i];
            if ($(openDropdown).css('display') == 'block') {
                $(icon).removeClass('rotate')
                $(openDropdown).fadeOut();
            }
        }
    }
}
