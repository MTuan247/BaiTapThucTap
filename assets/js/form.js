$(document).ready(function () {
    toggleModal()
});

/**
 * Hàm xử lý ẩn hiện modal
 /* Author: NMTuan (05/07/2021)
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