$(document).ready(function () {
    $(".field input").focusin(function () {
        $(this).parent().addClass('field--focus')
    });
});

$(document).ready(function () {
    $(".field input").focusout(function () {
        $(this).parent().removeClass('field--focus')
    });
});