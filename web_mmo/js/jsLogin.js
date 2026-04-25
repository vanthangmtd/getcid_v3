var listItemWebLogin = new Array("tbxEmailLogin", "tbxPasswordLogin", "remember", "btnLogin");
function Login() {
    var EmailLogin = $("#tbxEmailLogin").val();
    var PasswordLogin = $("#tbxPasswordLogin").val();
    var RememberLogin = $("#remember").is(':checked');
    if (EmailLogin == '') {
        ShowAlert('warning', 'Email Empty');
        return;
    }
    else if (PasswordLogin == '') {
        ShowAlert('warning', 'Password Empty');
        return;
    }
    ShowLoadingButton("btnLogin");
    DisableItem(listItemWebLogin);
    const dataRequest = {
        email: EmailLogin,
        password: PasswordLogin,
        remember: RememberLogin,
    }
    $.ajax({
        url: '/login/check-login',
        data: JSON.stringify(dataRequest),
        contentType: 'application/json',
        type: "POST",
    })
        .done(function(result) {
            if (result.Status == "Success") {
                ShowAlert('success', "Login success.");
                $("#formLogin").trigger("reset");
                location.replace('/');
            }
            else {
                ShowAlert('warning', result.Result);
            }
            RestoreButton("btnLogin", "Sign in");
            EnableItem(listItemWebLogin);
        })
        .fail(function(result) {
            RestoreButton("btnLogin", "Sign in");
            EnableItem(listItemWebLogin);
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
}

function ShowLoadingButton(idItem) {
    var button = '<i class="fa-solid fa-spinner fa-pulse" style="font-size: 20px;"></i>';
    $("#" + idItem + "").html(button);
}


function RestoreButton(idItem, nameItem) {
    $("#" + idItem + "").html(nameItem);
}

function EnableItem(listItems) {
    for (let i = 0; i < listItems.length; i++) {
        $("#" + listItems[i] + "").removeAttr('disabled');
    }
}

function DisableItem(listItems) {
    for (let i = 0; i < listItems.length; i++) {
        $("#" + listItems[i] + "").attr('disabled', true);
    }
}

function ShowAlert(messageAlert, messageText) {
    var html = '<div class="toast text-white bg-' + messageAlert + ' border-0" data-bs-delay="10000"><div class="toast-header bg-' + messageAlert + ' text-white"><strong class="me-auto">Notification!</strong><small>just now</small><button type="button" class="btn-close" data-bs-dismiss="toast"></button></div>';
    html = html + '<div class="toast-body">' + messageText + '</div></div>';
    $("#toast").html(html);
    $(".toast").toast("show");
};