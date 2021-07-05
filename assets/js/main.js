$(document).ready(function () {
    loadData()
});

/**
 * Hàm load dữ liệu từ api
 * Author: NMTuan (05/07/2021)
 */
async function loadData() {
    await $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees",
        method: "get",
        success: function(response){   
            console.log(response)
            response.map((item, index) => {
                // let employeeCode = item.EmployeeCode;
                // let fullName = item.FullName;
                // let gender = item.GenderName;
                // let birthday = item.DateOfBirth;
                // let phone = item.PhoneNumber;
                // let email = item.Email;
                // let positionName = item.PositionName;
                // let department = item.DepartmentName;
                // let salary = item.Salary;
                // let workStatus = item.WorkStatus;

                let tr = $('<tr></tr>')
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
            
    
                $(".grid table").append(tr)
            } )
    }});
    checkBox()
    clickTr()
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
function formatDate(value){
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
 * Hàm format tình trạng làm việc (WorkStatus)
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatWorkStatus(value) {
    if(value == 1) return "Đang làm việc"
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
    if(fieldName == "WorkStatus") {
        rs = formatWorkStatus(rs)
    }
    if(fieldName == "Salary") {
        rs = formatMoney(rs)
    }
    if(fieldName == "DateOfBirth") {
        rs = formatDate(rs)
    }
    rs = formatNull(rs)
    return rs;
}
