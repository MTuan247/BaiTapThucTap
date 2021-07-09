function showErrorToast() {
    $(`
        <div class="toast toast--error">
            <div class="toast__icon">
                <img src="./assets/icon/error.png" alt="">
            </div>
            <div class="toast__messenger">Có lỗi xả ra</div>
            <i class="fa fa-times toast__close-icon" aria-hidden="true"  onclick="hideToast($(this).parent())" ></i>
        </div>
    `).appendTo('body').delay(2000).queue(function() { $(this).remove(); });
}

function showToast(type, message, invalid = false) {
    if (invalid) return;
    $(`
        <div class="toast toast--${type}">
            <div class="toast__icon">
                <img src="./assets/icon/${type}.png" alt="">
            </div>
            <div class="toast__messenger">${message}</div>
            <i class="fa fa-times toast__close-icon" aria-hidden="true"  onclick="hideToast($(this).parent())" ></i>
        </div>
    `).appendTo('body').delay(2000).queue(function() { $(this).remove(); });
}

function hideToast(el) {
    $(el).remove()
}