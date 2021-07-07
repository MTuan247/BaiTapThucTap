$(document).ready(function () {
    toggleModal()
    formatMoneyOnChange()
});

/**
 * Hàm xử lý ẩn hiện modal
 * Author: NMTuan (05/07/2021)
 */
function toggleModal() {

    $('.info-form .close').click(() => {
        $('.modal').fadeOut()
    })

    $('.info-form .form__footer #cancel').click(() => {
        $('.modal').fadeOut()
    })

    $('.info-form #submit').click(() => {
        submit()
    })
}


/**
 * Hàm format tiền khi nhập vào input
 * Author: NMTuan (06/07/2021) 
 */
function formatMoneyOnChange(){
    $('#salary').on('input',function() {
        let value = $(this).val()
        value = value.replaceAll('.','')
        value = BigInt(value).toLocaleString('it-IT');
        $(this).val(value)
    })

}

function isNumber(e) {
    var charCode = (e.which) ? (e.which) : (e.keyCode)
    if ( charCode > 31 && (charCode > 57 || charCode < 48)) {
        return false;
    }
    return true;
}

function submit() {
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
    $('.field-label').each((index, item) => {
        let fieldName = $(item).attr('fieldName')
        let fieldType = $(item).attr('fieldType')
        let value = $(item).find('input').val()
        if(fieldType == 'Date') value = new Date(value)
        if(fieldType == 'Money') {
            value = value.replaceAll('.','')
            value = parseInt(value)
        }
        data[fieldName] = value;
    })
    data = JSON.stringify(data)
    console.log(data)
    main.addData(data)
}