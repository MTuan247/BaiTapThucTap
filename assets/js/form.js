$(document).ready(function () {
    initEventsModal()
    formatMoneyOnChange()
});

/**
 * Hàm xử lý ẩn hiện modal
 * Author: NMTuan (05/07/2021)
 */
function initEventsModal() {

    $('.info-form .close').click(() => {
        showWarningPopup()
    })

    $('.info-form .form__footer #cancel').click(() => {
        $('.modal').fadeOut()
        resetForm()
    })

    $('.info-form #submit').click(() => {
        submitForm()
    })

    $( function() {
        $(".info-form").resizable();
        $(".info-form").draggable();
    } );
}


/**
 * Hàm format tiền khi nhập vào input
 * Author: NMTuan (06/07/2021) 
 */
function formatMoneyOnChange(){
    $('#salary').on('input',function() {
        let value = $(this).val()
        value = value.replaceAll('.','')
        value = value.replaceAll(',','')
        value = BigInt(value).toLocaleString('it-IT');
        $(this).val(value)
    })

}
 
/**
 * Hàm thực hiện reset lại form
 * Author: NMTuan (08/07/2021)
 */
function resetForm() {
    $('.info-form').find('.form__field-input').find('input').val("")
}

/**
 * Hàm thực hiện submit form
 * Author: NMTuan (08/07/2021)
 */
function submitForm() {
    if (!checkFormValid()) return;
    let data  = {
        "createdDate": "",
        "createdBy": "",
        "modifiedDate": "",
        "modifiedBy": "",
        "employeeCode": "",
        "firstName": "",
        "lastName": "",
        "fullName": "",
        "gender": 0,
        "dateOfBirth": "",
        "phoneNumber": "",
        "email": "",
        "address": "",
        "identityNumber": "",
        "identityDate": "",
        "identityPlace": "",
        "joinDate": "",
        "martialStatus": 0,
        "educationalBackground": 0,
        "qualificationId": "",
        "departmentId": "",
        "workStatus": 0,
        "personalTaxCode": "",
        "salary": 0,
        "positionCode": "",
        "positionName": "",
        "departmentCode": "",
        "departmentName": "",
        "qualificationName": ""
      }
    $('.form__field-input').each((index, item) => {
        let fieldName = $(item).attr('fieldName')
        let fieldType = $(item).attr('fieldType')
        let value = $(item).find('input').val()
        if(fieldType == 'Date') value = new Date(value)
        else if(fieldType == 'Money') {
            value = value.replaceAll('.','')
            value = value.replaceAll(',','')
            value = parseInt(value)
        } else if (fieldName == 'GenderName') {
            if (value == 'Nam') data['Gender'] = 1;
            else if (value == 'Nữ') data['Gender'] = 0;
            else if (value == 'Không xác định') data['Gender'] = 2;

        }
        data[fieldName] = value;
    })
    data = JSON.stringify(data)
    let employeeId = $('.modal .info-form').attr('employeeId')
    if (employeeId == '') {
        main.addData(data)
    } else if (employeeId != '') {
        data["employeeId"] = employeeId;
        main.updateData(employeeId, data)
    }
    $('.modal').fadeOut()

}

/**
 * Hàm kiểm tra form có trường không hợp lệ k
 * Author: NMTuan (08/07/2021)
 * @returns boolean form có hợp lệ
 */
function checkFormValid(){
    let rs = true
    $('.form__field-input').each((index, item) => {
        $(item).trigger('focusout')
        if($(item).find('input').hasClass('field--error')){
            rs = false
            return false
        }    
    })
    return rs
}