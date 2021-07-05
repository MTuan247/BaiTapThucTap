$(document).ready(function () {
    validateRequired()
    validateEmail()
});

/**
 * Hàm kiểm tra email có đúng định dạng
 * Author: NMTuan (05/07/2021)
 */
function validateEmail() {
    $(".field-label").focusout(function () {
        let input = $(this).find('input[type="email"]');
        let value = $(input).val();
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(value)){
            $(input).addClass('field--error')
        } else {
            $(input).removeClass('field--error')
        }
    });
}

/**
 * Hàm kiểm tra các trường required
 * Author: NMTuan (05/07/2021)
 */
function validateRequired(){
    $(".field-label").focusout(function () {
        let input = $(this).find('input[required]');
        let message = $(this).find('.input-warning')
        if (!$(input).val()){
            $(input).addClass('field--error')
            $(message).find('span').text('Không thể để trống')
            $(message).css('opacity', 1)
            setTimeout(() => {$(message).css('opacity',0)}, 2000)
        } else {
            $(input).removeClass('field--error')
            $(message).css('opacity', 0)
        }
    });
}