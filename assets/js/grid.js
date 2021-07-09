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
    })
    
    $('.filter-bar .refresh').click(function (){
        main.loadData()
        // showErrorToast()
    })

    $('.filter-bar .delete').click(function (){
        showAlarmPopup()
    })

    $("table").on('dblclick','tbody tr',function(){
        modalFadeIn()
        let employeeId = $(this).attr('employeeId')
        main.loadDataById(employeeId)
        $('.modal .info-form').attr('employeeId', employeeId)
    })

    $('#add-employee').click(async () => {
        modalFadeIn()
        resetForm()
        $('.modal .info-form').attr('employeeId', '')
        let employeeCode = await main.getNewEmployeeCode()
        $('.info-form .field-label').first().find('input').val(employeeCode)
    })

    $('.toggle-icon').click(function(){
        $('.content').toggleClass('content--collapse')
    })
}

 