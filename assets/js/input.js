$(document).ready(function () {
    focusHandle()
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

/**
 * Hàm xử lý clear input
 * Author: NMTuan (05/07/2021)
 */

function clearInput() {
    $(".field .icon-right").click(function () {
        $(this).prev().val("");
    });

    $(".field-label .icon-right").click(function () {
        $(this).prev().val("");
    });
}