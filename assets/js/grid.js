// $(document).ready(function () {
//     checkBox()
// });

/**
 * Ham xu ly click check box
 */
function checkBox() {
    $(".check-box input").change(function () {
        $(this).parent().parent().toggleClass('selected')
        $(this).prev().toggleClass('custom-checkbox--selected')
    });
}
