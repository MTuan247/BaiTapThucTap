// $(document).ready(function () {
//     clickTr()
// });

/**
 * Hàm xử lý click checkbox
 * Author: NMTuan (05/07/2021)
 */
function checkBox() {
    $(".check-box input").change(function () {
        $(this).parent().parent().toggleClass('selected')
        $(this).prev().toggleClass('custom-checkbox--selected')
    });
}

function clickTr() {
    $(".grid tr").on('click','',function () {
        $(".grid tr").removeClass('selected')
        $(this).toggleClass('selected')
    });
}
