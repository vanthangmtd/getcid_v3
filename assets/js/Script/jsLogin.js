var listItemWebLogin = new Array("tbxEmailLogin", "tbxPasswordLogin", "btnLogin");
listItemWebLogin.push("tbxFirstNameRegisterUser", "tbxLastNameRegisterUser", "tbxUserNameRegisterUser", "tbxEmailRegisterUser", "tbxPasswordRegisterUser", "tbxConfirmPasswordRegisterUser", "tbxCodeRegisterUser", "btnCode", "btnRegisterUser");

$("#formLogin").validate({
    rules: {
        EmailLogin: {
            required: true,
            email: true
        },
        PasswordLogin: "required",
    },
    messages: {
        EmailLogin: "Required",
        PasswordLogin: "Required",
    },
    submitHandler: function () {
        var EmailLogin = $("#tbxEmailLogin").val();
        var PasswordLogin = $("#tbxPasswordLogin").val();
        var RememberLogin = $("#remember").is(':checked');

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
            .done(function (result) {
                if (result.Status == "Success") {
                    ShowAlert('success', "Login success.");
                    $("#formLogin").trigger("reset");
                    location.replace('/' + result.Result);
                }
                else {
                    ShowAlert('warning', result.Result);
                }
                RestoreButton("btnLogin", "LOGIN");
                EnableItem(listItemWebLogin);
            })
            .fail(function (result) {
                RestoreButton("btnLogin", "LOGIN");
                EnableItem(listItemWebLogin);
                if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
            })
    }
});

$("#formRegisterUser").validate({
    rules: {
        FirstNameRegisterUser: "required",
        LastNameRegisterUser: "required",
        UserNameRegisterUser: "required",
        CodeRegisterUser: "required",
        EmailRegisterUser: {
            required: true,
            email: true
        },
        PasswordRegisterUser: {
            required: true,
            equalTo: "#tbxConfirmPasswordRegisterUser"
        },
        ConfirmPasswordRegisterUser: {
            required: true,
            equalTo: "#tbxPasswordRegisterUser"
        }
    },
    messages: {
        FirstNameRegisterUser: "Required",
        LastNameRegisterUser: "Required",
        UserNameRegisterUser: "Required",
        EmailRegisterUser: "Required",
        CodeRegisterUser: "Required",
        PasswordRegisterUser: "Requires or Password and Confirm password, not match",
        ConfirmPasswordRegisterUser: "Requires or Password and Confirm password, not match",
    },
    submitHandler: function () {
        var FirstNameRegister = $("#tbxFirstNameRegisterUser").val();
        var LastNameRegister = $("#tbxLastNameRegisterUser").val();
        var UserNameRegister = $("#tbxUserNameRegisterUser").val();
        var EmailRegister = $("#tbxEmailRegisterUser").val();
        var CodeRegister = $("#tbxCodeRegisterUser").val();
        var PasswordRegister = $("#tbxPasswordRegisterUser").val();
        var ConfirmPasswordRegister = $("#tbxConfirmPasswordRegisterUser").val();

        ShowLoadingButton("btnRegisterUserUser");
        DisableItem(listItemWebLogin);
        const dataRequest = {
            email: EmailRegister,
            password: PasswordRegister,
            confirm_password: ConfirmPasswordRegister,
            token: CodeRegister,
            first_name: FirstNameRegister,
            last_name: LastNameRegister,
            user_name: UserNameRegister,
        }
        $.ajax({
            url: '/login/register',
            data: JSON.stringify(dataRequest),
            contentType: 'application/json',
            type: "POST",
        })
            .done(function (result) {
                if (result.Status == "Success") {
                    ShowAlert('success', result.Result);
                    $("#formRegisterUser").trigger("reset");
                    var layout_login = document.getElementById("layout_login");
                    var layout_register = document.getElementById("layout_register");
                    layout_login.style.display = "block";
                    layout_register.style.display = "none";
                    $("#tbxEmailLogin").val(EmailRegister);
                }
                else {
                    ShowAlert('warning', result.Result);
                    $("#tbxPasswordRegisterUser").val('');
                    $("#tbxConfirmPasswordRegisterUser").val('');
                }
                RestoreButton("btnRegisterUser", "Register");
                EnableItem(listItemWebLogin);
            })
            .fail(function (result) {
                RestoreButton("btnRegisterUser", "Register");
                EnableItem(listItemWebLogin);
                if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
            })
    }
});

function GetCode() {
    var email = $("#tbxEmailRegisterUser").val();
    if (email.length <= 0) {
        ShowAlert('warning', "Please enter you email");
    }
    else {
        $('#btnCode').css('pointerEvents', 'none');
        ShowLoadingButton("btnCode");
        DisableItem(listItemWebLogin);
        $.post("/login/verify-email", {
            email: email,
        })
            .done(function (result) {
                if (result.Status == "Success") {
                    ShowAlert('success', result.Result);
                }
                else {
                    ShowAlert('warning', result.Result);
                }
                EnableItem(listItemWebLogin);
                RestoreButton("btnCode", "Get Code");
                $('#btnCode').css('pointerEvents', 'auto');
            })
            .fail(function (result) {
                EnableItem(listItemWebLogin);
                RestoreButton("btnCode", "Get Code");
                $('#btnCode').css('pointerEvents', 'auto');
                if (result.status == 403)
                    ShowAlert('danger', "Access denied.");
                else
                    ShowAlert('danger', "Sorry, cannot connect server.");
            })
    }
}