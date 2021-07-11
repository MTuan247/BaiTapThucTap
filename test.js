// Xử lý các affect của dropdown
$(document).ready(function () {
    new ComboBox()
})

$.fn.getValue = function () {
    return $(this).data('value')
}

$.fn.getText = function () {
    return $(this).data('text')
}

class ComboBox {
    constructor() {
        let me = this
        this.loadCollapse('.combo-box[data-type=Department]','http://cukcuk.manhnv.net/api/Department','DepartmentName')
        this.loadCollapse('.combo-box[data-type=Position]','http://cukcuk.manhnv.net/v1/Positions','PositionName')
        this.initEvent()
        this.addDataToAllItem()
    }

    /**
     * Hàm thêm event
     * Author: NMTuan (07/07/2021)
     */
    initEvent() {
        let me = this;

        $(".combo-box").find('.combo-box__icon').click(function () {
            me.toggleFade($(this).parent())
            $('.combo-box .combo-box__item').show()
        });

        $(".combo-box").keypress(function (e) {
            debugger
            let combobox = $(this)
            if (e.code == "Enter") {
                if (combobox.find('.collapse').css('display') == 'none') {
                    me.toggleFade(combobox)
                } else {
                    let selectItem = combobox.find('.combo-box__item--focus')
                    me.selectItem(selectItem)
                    me.toggleFade(combobox)
                }
            }
        });

        $(".combo-box").on('click', '.combo-box__item', function () {
            me.selectItem(this)
            me.collapseFadeOut($(this).closest('.combo-box'))
        });

        $(".combo-box").on('input', '.value', function () {
            me.detectItemMatched($(this).parent())
        })

        $(".combo-box input").focus(function(){
            me.collapseFadeIn($(this).parent())
            $(this).parent().addClass('combo-box--focus')
        })

        $(".combo-box input").focusout(function(){
            $(this).parent().removeClass('combo-box--focus')
        })

        $(".combo-box").keydown(function(e){
            if (e.which == 38) { //up
                me.prevItem(this)
                return false;
            }
            if (e.which == 40) { //down
                me.nextItem(this)
                return false;
            }
        });

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
        this.firstItem(el)
    }

    /**
     * Hàm hiện combo-box collaspe
     * Author: NMTuan (07/07/2021)
     * @param {element} el element combobox input
     */
    collapseFadeIn(el) {
        $('.combo-box').not(el).find('.collapse').fadeOut()
        $(el).find('.collapse').fadeIn()
        $(el).find('.combo-box__icon').addClass('rotate')
        this.detectSelectDropdownItem()
        this.firstItem(el)
    }

    /**
     * Hàm ẩn collapse
     * @param {element} el element combobox 
     */
    collapseFadeOut(el) {
        $(el).find('.collapse').fadeOut()
        $(el).find('.combo-box__icon').removeClass('rotate')
    }

    /**
     * Method lựa chọn dropdown item được chọn
     * Author: NMTuan (07/07/2021)
     * @param {element} el 
     */
    selectItem(el) {
        let combobox = $(el).closest('.combo-box')
        let itemSelected = $(el).text();
        combobox.find('.value').val(itemSelected)
        this.addDataToCombobox(el)
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
        value = removeAccents(value)
        value = value.toLowerCase()
        $(items).each((index, item) => {
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

    /**
     * Hàm load dữ liệu từ api đổ vào combo-box
     * Author: NMTuan (09/07/2021)
     * @param {element} el element combo-box
     * @param {url} url đường dẫn đến api
     * @param {string} name tên trường cần hiển thị
     * @param {function} func callback truyền vào hàm thực thi sau khi load xong
     */
    loadCollapse(el, url, name, func = function(){}) {
        let me = this
        try {
            $.ajax({
                url: url,
                method: "get",
                success: function(response){
                    me.bindCollapse(response, el ,name)
                    func()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    bindCollapse(response, target, name){
        response.map((item, index) => {
            let el = $(`<div class="combo-box__item" tabindex="0"><i class="fa fa-check icon-left" aria-hidden="true"></i>${ item[name] }</div>`)
                .appendTo($(target).find('.collapse'))
            for (var key in item) {
                el.data(key, item[key])
            }
        })
        this.addDataToItem(target)

    }

    addDataToItem(el){
        $(el).find('.combo-box__item').each((index, item) => {
            let value = index
            let text = $(item).attr('value')
            $(item).data('value', value)
            $(item).data('text', text)
        })
    }

    addDataToAllItem() {
        $('.combo-box').find('.combo-box__item').each((index, item) => {
            let value = index
            let text = $(item).attr('value')
            $(item).data('value', value)
            $(item).data('text', text)
        })
    }

    addDataToCombobox(el) {
        let combobox = $(el).closest('.combo-box')
        combobox.data('value', $(el).data('value'))
        combobox.data('text', $(el).data('text'))
    }

    firstItem(el){
        $(el).find('.combo-box__item').removeClass('combo-box__item--focus')
        $(el).find('.combo-box__item').first().addClass('combo-box__item--focus')
    }

    lastItem(el){
        $(el).find('.combo-box__item').removeClass('combo-box__item--focus')
        $(el).find('.combo-box__item').last().addClass('combo-box__item--focus')
    }

    nextItem(el) {
        let current = $(el).find('.combo-box__item--focus').first()
        let next = $(current).next('.combo-box__item')
        if (next.length == 0) {
            this.firstItem(el)
            return;
        }
        $(current).removeClass('combo-box__item--focus')
        $(next).addClass('combo-box__item--focus')
    }

    prevItem(el) {
        let current = $(el).find('.combo-box__item--focus').first()
        let prev = $(current).prev('.combo-box__item')
        if (prev.length == 0) {
            this.lastItem(el)
            return;
        }
        $(current).removeClass('combo-box__item--focus')
        $(prev).addClass('combo-box__item--focus')
    }

}


/**
 * Hàm ẩn dropdown khi click ra ngoài
 * Author: NMTuan (07/07/2021)
 * @param {event} event 
 */
document.onclick = function (event) {
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
