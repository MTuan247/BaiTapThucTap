$(document).ready(function () {
    $(".check-box input").change(function () {
        $(this).parent().parent().toggleClass('selected')
        $(this).prev().toggleClass('custom-checkbox--selected')
    });
});