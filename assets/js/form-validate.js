$(document).ready(function () {
    $(".field-label").focusout(function () {
        validateInput(this)
    });
})

/**
 * Hàm kiểm tra email có đúng định dạng
 * Hàm đã không được sử dụng
 * Author: NMTuan (05/07/2021)
 */
function validateEmail(el) {
    let input = $(el).find('input[type="email"]');
    let message = $(el).find('.input-warning')
    let value = $(input).val();
    const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(value)){
        $(input).addClass('field--error')
        $(message).find('span').text('Email không đúng định dạng')
        $(message).css('opacity', 1)
        setTimeout(() => {$(message).css('opacity',0)}, 2000)
        return false;
    } else {
        $(input).removeClass('field--error')
        $(message).css('opacity', 0)
        return true;
    }
}

/**
 * Hàm kiểm tra các trường required
 * Hàm đã k được sử dụng
 * Author: NMTuan (05/07/2021)
 */
function validateRequired(el){
    let input = $(el).find('input[required]');
    let message = $(el).find('.input-warning')
    if (!$(input).val()){
        $(input).addClass('field--error')
        $(message).find('span').text('Không thể để trống')
        $(message).css('opacity', 1)
        setTimeout(() => {$(message).css('opacity',0)}, 2000)
        return false;
    } else {
        $(input).removeClass('field--error')
        $(message).css('opacity', 0)
        return true;
    }
}

/**
 * Hàm kiểm tra input và trả về thông báo
 * Author: NMTuan (06/07/2021)
 * Update: (09/07/2021)
 * @param {element} el 
 * @returns 
 */
function validateMessage(el) {
    // let inputRequired = $(el).find('input[required]');
    // let inputEmail = $(el).find('input[type="email"]')
    // let valueRequired = $(inputRequired).val();
    // let valueEmail = $(inputEmail).val()
    // const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!valueRequired) {
    //     $(inputRequired).addClass('field--error')
    //     return "Không được để trống"
    // } else if (!emailPattern.test(valueEmail) && valueEmail){
    //     $(inputEmail).addClass('field--error')
    //     return "Email k đúng đinh dạng"
    // } else {
    //     $(inputEmail).removeClass('field--error')
    //     $(inputRequired).removeClass('field--error')
    //     return ""
    // }

    let input = $(el).find('input');
    let value = $(el).find('input').val()
    if($(input).attr('required')) {
        if(!value) {
            $(input).addClass('field--error')
            return "Không được để trống"
        }
    }
    if($(input).attr('type') == 'email') {
        let emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(value)) {
            $(input).addClass('field--error')
            return "Email k đúng đinh dạng"
        }
    }

    $(input).removeClass('field--error')
    return ""
    
}


/**
 * Hàm xử lý khi có thông báo
 * Author: NMTuan (06/07/2021)
 * @param {element} el 
 */
function validateInput(el) {
    let message = validateMessage(el);
    if (message != "") {
        let inputWarning = $(el).find('.input-warning')
        fadeInMessage(inputWarning, message)
    }
}


/**
 * Hàm xử lý hiện message
 * Author: NMTuan (06/07/2021)
 * @param {element} el 
 * @param {string} message 
 */
function fadeInMessage(el, message) {
    $(el).find('span').text(message)
    $(el).css('display', 'flex')
    $(el).fadeOut(3000)
}

/**
 * Hàm kiểm tra kí tự vừa nhập có phải là số
 * Author: NMTuan (08/07/2021)
 * @param {event} e 
 * @returns 
 */
function isNumber(e) {
    var charCode = (e.which) ? (e.which) : (e.keyCode)
    if ( charCode > 31 && (charCode > 57 || charCode < 48)) {
        return false;
    }
    return true;
}