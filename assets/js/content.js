$(document).ready(function () {
    new Content()
})

class Content {
    constructor() {
        this.initEvents()
    }

    /**
     * Hàm thêm các event
     * Author: NMTuan (06/07/2021)
     */
    initEvents() {
        let me = this
        $("table").on('change', '.check-box input', function () {
            me.checkBox(this)
        })

        $('.filter-bar .refresh').click(function () {
            let departmentId = $('#department-combobox').data('id')
            let positionId = $('#position-combobox').data('id')
            departmentId = formatNull(departmentId)
            positionId = formatNull(positionId)
            main.loadDataFiltered(main.pageSize, main.pageNumber, departmentId, positionId)
        })

        $('.filter-bar .delete').click(function () {
            showAlarmPopup()
        })

        $("table").on('dblclick', 'tbody tr', function () {
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

        $('.paging-number').click(function() {
            me.switchPage(this)
        })

    }

    /** 
     * Hàm xử lý click checkbox
     * Author: NMTuan (05/07/2021)
     * @param {element} el 
     */
    checkBox(el) {
        $(el).parent().parent().toggleClass('selected')
        $(el).prev().toggleClass('custom-checkbox--selected')
    }

    /**
     * Hàm xử lý click vào hàng trong table
     * Author: NMTuan (06/07/2021)
     * @param {element} el 
     */
    clickTr(el) {
        $(".grid tr").removeClass('selected')
        $(el).toggleClass('selected')
    }

    switchPage(el) {
        let number = $(el).text()
        main.pageNumber = parseInt(number)
        $('.refresh').click()
        this.checkPageNumber()
    }

    checkPageNumber() {
        let me = this
        $('.paging-bar .paging-number').removeClass('paging-number--active')
        $('.paging-bar').find('.paging-number').each((index, item) => {
            let number = $(item).text()
            if (number == main.pageNumber) {
                $(item).addClass('paging-number--active')
                return
            }
        })
    }
}



