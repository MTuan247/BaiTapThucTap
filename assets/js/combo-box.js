// Xử lý các affect của dropdown
$(document).ready(function () {
    new ComboBox()
})

class ComboBox {
    constructor() {
        this.initEvent()
    }

    initEvent() {
        let me = this;
        $(".combo-box").find('.combo-box__icon').click(function () {
            me.toggleFade(this)
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
                $(this).closest('combo-box').focus()
            }
        });

        $(".combo-box input").on('input', function () {
            me.detectItemMatched()
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
     * Method hiện collapse dropdown
     * @param {element} el 
     */
    toggleFade(el) {
        $('.combo-box').not($(el).parent()).find('.collapse').fadeOut()
        $(el).siblings('.collapse').fadeToggle()
        $(el).toggleClass('rotate')
        this.detectSelectDropdownItem()
    }

    collaseFadeIn(el) {
        $('.combo-box').not($(el).parent()).find('.collapse').fadeOut()
        $(el).parent().find('.collapse').fadeIn()
        $(el).siblings('.combo-box__icon').addClass('rotate')
        this.detectSelectDropdownItem()
    }

    collaseFadeOut(el) {
        $(el).find('.collapse').fadeOut()
        $(el).find('.combo-box-icon').removeClass('rotate')
    }

    /**
     * Method lựa chọn dropdown item được chọn
     * @param {element} el 
     */
    selectItem(el) {
        let itemSelected = $(el).text();
        $(el).parent().parent().find('.value').val(itemSelected)
    }

    /**
     * Method xác định dropdown item đã được chọn
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

    
    detectItemMatched() {
        let items = $(".combo-box .combo-box__item")
        let value = $(".combo-box .value").val()
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

function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}