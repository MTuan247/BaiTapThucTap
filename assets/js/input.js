$(document).ready(function () {

    $(".field input").focusin(function () {
        $(this).parent().addClass('field--focus')
    });

    clearInput()

});

function clearInput() {
    $(".field .icon-right").click(function () {
        $(this).prev().val("");
    });

    $(".field-label .icon-right").click(function () {
        $(this).prev().val("");
    });
}