// $(document).ready(function () {
//     $(".field-label").focusout(function () {
//         let input = $(this).find('input');
//         $(input).addClass('field--error')
//     });
// });

$(document).ready(function () {
    
    validateRequired()
    validateEmail()
});

/*
* Ham validate Email
*/
function validateEmail() {
    $(".field-label").focusout(function () {
        let input = $(this).find('input[type="email"]');
        let value = $(input).val();
        const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!pattern.test(value)){
            $(input).addClass('field--error')
        } else {
            $(input).removeClass('field--error')
        }
    });
}

/**
 * Ham validate required
*/
function validateRequired(){
    $(".field-label").focusout(function () {
        let input = $(this).find('input[required]');
        if (!$(input).val()){
            $(input).addClass('field--error')
        } else {
            $(input).removeClass('field--error')
        }
    });
}