$(document).ready(function(){
    initEvents()
})

/** 
 * Hàm xử lý click checkbox
 * Author: NMTuan (05/07/2021)
 * @param {element} el 
 */
function checkBox(el) {
    $(el).parent().parent().toggleClass('selected')
    $(el).prev().toggleClass('custom-checkbox--selected')
}

/**
 * Hàm xử lý click vào hàng trong table
 * Author: NMTuan (06/07/2021)
 * @param {element} el 
 */
function clickTr(el) {
    $(".grid tr").removeClass('selected')
    $(el).toggleClass('selected')
}

/**
 * Hàm thêm các event
 * Author: NMTuan (06/07/2021)
 */
function initEvents() {
    $("table").on('change', '.check-box input', function () {
        checkBox(this)
    }); 
    $('.filter-bar .refresh').click(function (){
        new Main()
    })
}

 