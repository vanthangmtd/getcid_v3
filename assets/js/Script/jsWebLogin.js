var layout_login;
var layout_register;

if (document.getElementById('layout_login') instanceof Object) {
    layout_login = document.getElementById("layout_login");
    layout_register = document.getElementById("layout_register");
    layout_login.style.display = "block";
    layout_register.style.display = "none";
}

function showLayoutRegister() {
    layout_login.style.display = "none";
    layout_register.style.display = "block";
}

function showLayoutLogin() {
    layout_login.style.display = "block";
    layout_register.style.display = "none";
}