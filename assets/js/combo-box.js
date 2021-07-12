// Xử lý các affect của dropdown
$(document).ready(function () {
    new ComboBox()
})

$.fn.getValue = function () {
    let text = $(this).find('input').val()
    $(this).find('.combo-box__item').each((index, item) => {
        if($(item).data('text') == text ) {
            let value = $(item).data('value')
            $(this).data('value', value)
        }
    })
    return $(this).data('value')
}

$.fn.getText = function () {
    let text = $(this).find('input').val()
    $(this).find('.combo-box__item').each((index, item) => {
        if($(item).data('text') == text ) {
            let text = $(item).data('text')
            $(this).data('text', text)
        }
    })
    return $(this).data('text')
}

class ComboBox {
    constructor() {
        let me = this
        this.loadCollapse('.combo-box[data-type=Department]','http://cukcuk.manhnv.net/api/Department','DepartmentName', 'DepartmentId')
        this.loadCollapse('.combo-box[data-type=Position]','http://cukcuk.manhnv.net/v1/Positions','PositionName','PositionId')
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
            me.checkItemExist($(this).parent())
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
                $(item).removeClass('combo-box__item--hide')
                $(item).addClass('combo-box__item--show')
            } else {
                $(item).addClass('combo-box__item--hide')
                $(item).removeClass('combo-box__item--show')
            }
        })
    }

    /**
     * Hàm load dữ liệu từ api đổ vào combo-box
     * Author: NMTuan (09/07/2021)
     * @param {element} el element combo-box
     * @param {url} url đường dẫn đến api
     * @param {string} name tên trường cần hiển thị
     * @param {string} id id của item
     * @param {function} func callback truyền vào hàm thực thi sau khi load xong
     */
    loadCollapse(el, url, name, id, func = function(){}) {
        let me = this
        try {
            $.ajax({
                url: url,
                method: "get",
                success: function(response){
                    me.bindCollapse(response, el ,name, id)
                    func()
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Hàm load dữ liệu vào combobox
     * Author: NMTuan (11/07/2021)
     * @param {json} response dữ liệu load từ api
     * @param {element} target combobox cần load
     * @param {string} name tên trường cần hiển thị lên combobox-item
     * @param {string} id id của item
     */
    bindCollapse(response, target, name, id){
        response.map((item, index) => {
            let el = $(`<div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left" aria-hidden="true"></i>${ item[name] }</div>`)
                .appendTo($(target).find('.collapse'))
            el.data('id', item[id])
            for (var key in item) {
                el.data(key, item[key])
            }
        })
        this.addDataToItem(target)

    }

    /**
     * Hàm lưu data cho các item
     * Author: NMTuan (11/07/2021)
     * @param {element} el combobox-item
     */
    addDataToItem(el){
        $(el).find('.combo-box__item').each((index, item) => {
            let value = index
            let text = $(item).text()
            $(item).data('value', value)
            $(item).data('text', text)
        })
    }

    /**
     * Hàm lưu data cho mọi combobox
     * Author: NMTuan (11/07/2021)
     */
    addDataToAllItem() {
        $('.combo-box').each((combobox, index) => {
            $(combobox).find('.combo-box__item').each((index, item) => {
                let value = index
                let text = $(item).attr('value')
                $(item).data('value', value)
                $(item).data('text', text)
            })
        })
    }

    /**
     * Hàm lưu data cho combobox khi chọn 1 item
     * Author: NMTuan (11/07/2021)
     * @param {element} el combobox-item
     */
    addDataToCombobox(el) {
        let combobox = $(el).closest('.combo-box')
        combobox.data('value', $(el).data('value'))
        combobox.data('text', $(el).data('text'))
        combobox.data('id', $(el).data('id'))
    }

    /**
     * Hàm chuyển focus lên combobox-item đầu tiên
     * Author: NMTuan (11/07/2021)
     * @param {element} el combobox
     */
    firstItem(el){
        $(el).find('.combo-box__item--show').removeClass('combo-box__item--focus')
        $(el).find('.combo-box__item--show').first().addClass('combo-box__item--focus')
    }

    /**
     * Hàm chuyển focus xuống combobox item cuối cùng
     * Auhtor: NMTuan (11/07/2021)
     * @param {element} el combobox
     */
    lastItem(el){
        $(el).find('.combo-box__item--show').removeClass('combo-box__item--focus')
        $(el).find('.combo-box__item--show').last().addClass('combo-box__item--focus')
    }

    /**
     * Hàm chuyển sang item tiếp theo
     * Author: NMTuan (11/07/2021)
     * @param {element} el combobox
     * @returns 
     */
    nextItem(el) {
        let current = $(el).find('.combo-box__item--focus').first()
        let next = $(current).nextAll('.combo-box__item--show').first()

        if (next.length == 0) {
            this.firstItem(el)
            return;
        }
        $(current).removeClass('combo-box__item--focus')
        $(next).addClass('combo-box__item--focus')
    }

    /**
     * Hàm lùi về combobox item trước
     * Author: NMTuan (11/07/2021)
     * @param {element} el combobox
     * @returns 
     */
    prevItem(el) {
        let current = $(el).find('.combo-box__item--focus').first()
        let prev = $(current).prevAll('.combo-box__item--show').first()
        if (prev.length == 0) {
            this.lastItem(el)
            return;
        }
        $(current).removeClass('combo-box__item--focus')
        $(prev).addClass('combo-box__item--focus')
    }

    /**
     * Hàm kiểm tra giá trị có tồn tại trong combobox
     * @param {element} el combobox
     */
    checkItemExist(el) {
        let text = $(el).find('input').val()
        let rs = false;
        $(el).find('.combo-box__item').each((index, item) => {
            if ( $(item).text() == text ) {
                rs = true
                $(el).removeClass('combo-box--error')
                $(el).attr('title', '')
            }
        })
        setTimeout(()=>{
            if (rs == false) {
                $(el).addClass('combo-box--error')
                $(el).attr('title', 'Không tồn tại giá trị')
            }
        }, 300)
        
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
