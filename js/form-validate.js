$(document).ready(function () {
    $(".field-label").focusout(function () {
        let input = $(this).find('input');
        $(input).addClass('field--error')
    });
});