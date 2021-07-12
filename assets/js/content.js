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
            let departmentId = $('#department-combobox').getValue()
            let positionId = $('#position-combobox').getValue()
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

        $('.paging-next').click(function() {
            me.nextPage()
        })

        $('.paging-prev').click(function() {
            me.prevPage()
        })

        $('.paging-first').click(function(){
            me.switchToPage(1)
        })

        $('.paging-last').click(function(){
            me.switchToPage(main.totalPage)
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
        this.switchToPage(number)
    }

    switchToPage(number) {
        number = parseInt(number)
        main.pageNumber = number
        $('.refresh').click()
        this.updatePagingNumber(number)
        this.checkPageNumber()
    }

    nextPage() {
        let current = $('.paging-bar .paging-number--active').text()
        if (current == main.totalPage) {
            return
        } else {
            current = parseInt(current)
            current++
            this.switchToPage(current)
        }
    }

    prevPage(){
        let current = $('.paging-bar .paging-number--active').text()
        if (current == '1') {
            return
        } else {
            current = parseInt(current)
            current--
            this.switchToPage(current)
        }
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

    getPagingNumber(number){
        if (number == 1) {
            return [1,2,3,4]
        } else if ( main.totalPage - number < 4 ){
            return [main.totalPage-3, main.totalPage -2, main.totalPage -1, main.totalPage]
        } else {
            return [number-1,number,number+1,number+2]
        } 

    }

    updatePagingNumber(number){
        let numbers = this.getPagingNumber(number)
        $('.paging-bar').find('.paging-number').each((index, item) => {
            $(item).text(numbers[index])
        })
      
    }
}



