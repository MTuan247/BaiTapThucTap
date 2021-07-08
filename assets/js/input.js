$(document).ready(function () {
    focusHandle()
    inputHandle()
    clearInput()
});

/**
 * Hàm xử lý focusin và focusout của input
 * Author: NMTuan (05/07/2021)
 */
function focusHandle() {
    $(".field input").focusin(function () {
        $(this).parent().addClass('field--focus')
    });

    $(".field input").focusout(function () {
        $(this).parent().removeClass('field--focus')
    });

}

function inputHandle() {
    $('.field-label input').on('input', function(){
        showClearIcon(this)
    })
    
    $('.field input').on('input', function(){
        showClearIcon(this)
    })
}

/**
 * Hàm xử lý clear input
 * Author: NMTuan (05/07/2021)
 */

function clearInput() {
    $(".field .icon-right").click(function () {
        $(this).prev().val("");
        $(this).siblings('input').trigger('input')
    });

    $(".field-label .icon-right").click(function () {
        $(this).prev().val("");
        $(this).siblings('input').trigger('input')        
    });
}

/**
 * Hàm xử lí ẩn hiện clear button
 * @param {element input} item 
 */
function showClearIcon(item) {
    if($(item).val() != ""){
        $(item).siblings('.icon-right').show()
    } else {
        $(item).siblings('.icon-right').hide()
    }
}