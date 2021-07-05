$(document).ready(function () {
    loadData()
});

/**
 * Ham load Data
 */
async function loadData() {
    await $.ajax({
        url: "http://cukcuk.manhnv.net/v1/Employees",
        method: "get",
        success: function(response){
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
                
                console.log(response)
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
}

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
* ham format gia tri null thanh ""
*/
function formatNull(value) {
    if (!value) return "";
    return value;
}

/**
 * Ham format Date
 * @param {*} value 
 * @returns 
 */
function formatDate(value){
    if (!value) return null;
    let year = value.substring(0,4)
    let month = value.substring(5,7)
    let day = value.substring(8,10)
    return day + "/" + month + "/" + year;
}

/**
 * ham format tinh trang lam viec
 * @param {*} value 
 * @returns 
 */
function formatWorkStatus(value) {
    if(value == 1) return "Đang làm việc"
    else if (value == 0) return "Đã nghỉ việc"
    return null;
}

/**
 * Ham format tien
 * @param {*} value 
 * @returns 
 */
function formatMoney(value) {
    if (!value) return null;
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

/**
 * Ham format tat ca
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
