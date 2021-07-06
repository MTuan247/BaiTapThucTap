$(document).ready(function () {
    toggleModal()
    formatMoneyOnChange()
});

/**
 * Hàm xử lý ẩn hiện modal
 * Author: NMTuan (05/07/2021)
 */
function toggleModal() {
    $('#add-employee').click(() => {
        // $('.modal').css('display','block')
        $('.modal').fadeIn()
    })

    $('.info-form .close').click(() => {
        // $('.modal').css('display','none')
        $('.modal').fadeOut()
    })

    $('.info-form .form__footer #cancel').click(() => {
        $('.modal').fadeOut()
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