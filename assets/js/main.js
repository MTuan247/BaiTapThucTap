let main;

$(document).ready(function () {
    main = new Main()
    main.loadData()
});

class Main {
    constructor() {
        // this.loadData()
        this.initEvents()
        this.data = []
    }

    initEvents() {
        let me = this
        $('.grid thead th').click(function(){
            let fieldName = $(this).attr('fieldName')
            me.sortData(fieldName)
            me.bindData(me.data)
        })
    }

    /**
    * Hàm load dữ liệu từ api
    * Author: NMTuan (05/07/2021)
    */
    async loadData() {
        let me = this;
        try {
            await $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees",
                method: "get",
                success: function (response) {
                    console.log(response)
                    me.data = response
                    me.bindData(me.data)
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Hàm bind data
     * @param {response} response 
     */
    bindData(response) {

        $(".grid table tbody").empty()

        response.map((item, index) => {

            let tr = $('<tr></tr>')
            let employeeId = item.EmployeeId
            tr = $(tr).attr('employeeId', employeeId)
            let theads = $('.grid table tr th')
            $(theads).each((i, thead) => {
                let td = $(`<td></td>`)
                let fieldName = $(thead).attr('fieldName');
                let value = item[fieldName]
                value = formatData(value, fieldName)
                td = formatCell(td, fieldName, index)
                td.append(value)
                tr.append(td)
            })

            $(".grid table tbody").append(tr)
        })
    }

    /**
     * Hàm sắp xếp dữ liệu
     * @param {fieldName} fieldName 
     */
    sortData(fieldName) {
        this.data.sort(function(a,b){
            if(a[fieldName] < b[fieldName]) return -1;
            if(a[fieldName] > b[fieldName]) return 1;
            if (a[fieldName] == null) return -1;
            return 0;
        })
    }

    createData() {

    }

    updateData() {

    }

    deleteData() {

    }

    loadDataById(id) {
        let me = this;
        try {
            $.ajax({
                url: "http://cukcuk.manhnv.net/v1/Employees/" + id,
                method: "get",
                success: function (response) {
                    console.log(response)
                    $('.info-form .field-label').each((index, item) => {
                        let fieldName = $(item).attr('fieldName')
                        let fieldType = $(item).attr('fieldType')
                        let value =response[fieldName]
                        if (fieldType == 'Date') {
                            value = formatDateInput(value)
                        }
                        
                        $(item).find('input').val(value)
                    })
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    bindDataToForm() {

    }
}

/**
 * Hàm format cell của table tùy theo loại dữ liệu
 * Author: NMTuan (05/07/2021)
 * @param {*} td 
 * @param {*} fieldName 
 * @param {*} index 
 * @returns 
 */
function formatCell(td, fieldName, index) {

    let cell = td

    if (fieldName == "Checkbox") {
        $(cell).addClass('check-box')
        $(cell).append(`
            <div class="custom-checkbox">
                <i class="fa fa-check" aria-hidden="true"></i>
            </div>
            <input type="checkbox" name="" id="">
        `)
    }

    if (fieldName == "Index") {
        $(cell).append(index + 1)
    }

    if (fieldName == "Salary") {
        $(cell).addClass("text-align-right")
    }
    if (fieldName == "DateOfBirth") {
        $(cell).addClass("text-align-center")
    }
    return cell;
}

/* 
* Hàm format các giá trị null
* Author: NMTuan (05/07/2021)
*/
function formatNull(value) {
    if (!value) return "";
    return value;
}

/**
 * Hàm format các giá trị date
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatDate(value) {
    if (!value) return null;
    // let year = value.substring(0,4)
    // let month = value.substring(5,7)
    // let day = value.substring(8,10)
    // return day + "/" + month + "/" + year;
    let rs = new Date(value)
    // rs = rs.toLocaleDateString()
    let day = rs.getDate()
    let month = rs.getMonth()
    let year = rs.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    rs = day + '/' + month + '/' + year
    return rs;
}

/**
 * Hàm format date cho input type date
 * Author: NMTuan (07/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatDateInput(value) {
    if (!value) return null;
    let rs = new Date(value)
    let day = rs.getDate()
    let month = rs.getMonth()
    let year = rs.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    rs = year + '-' + month + '-' + day
    return rs;
}

/**
 * Hàm format tình trạng làm việc (WorkStatus)
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatWorkStatus(value) {
    if (value == 1) return "Đang làm việc"
    else if (value == 0) return "Đã nghỉ việc"
    return null;
}

/**
 * Hàm format giá trị tiền tệ
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatMoney(value) {
    if (!value) return null;
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

/**
 * Hàm format tổng hợp
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @param {*} fieldName 
 * @returns 
 */
function formatData(value, fieldName) {
    let rs = value
    if (fieldName == "WorkStatus") {
        rs = formatWorkStatus(rs)
    }
    if (fieldName == "Salary") {
        rs = formatMoney(rs)
    }
    if (fieldName == "DateOfBirth") {
        rs = formatDate(rs)
    }
    rs = formatNull(rs)
    return rs;
}
