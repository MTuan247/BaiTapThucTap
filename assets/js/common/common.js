$(document).ready(function(){
    checkMatchUrl()
    
    $('.toggle-icon').click(function () {
        $('.content').toggleClass('content--collapse')
    })
    
})

function checkMatchUrl(href){
    let path = window.location.pathname
    $('.navbar').find('a').each((index, item) => {
        let href = $(item).attr('href')
        if (href == path) {
            $(item).find('.nav-item').addClass('nav-item--active')
        } else {
            $(item).find('.nav-item').removeClass('nav-item--active')
        }
    })
}