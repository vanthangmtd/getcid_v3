var listItem = new Array("tarData", "btnCheck", "btnClean");
var listDataInput = new Array();
var code_check = '';

function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (let i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

function GetDataInput(data) {
    listDataInput = new Array();
    var items = remove_duplicates(data.replaceAll(' ', '\n').split('\n'));
    for (let i = 0; i < items.length; i++) {
        if (items[i].length > 0) {
            const value = {
                ip: '',
                port: '',
                username: '',
                password: ''
            }
            var data = items[i].split(':');
            if (data[0] != null && data[1] != null) {
                value.ip = data[0];
                value.port = data[1];
                if (data.length == 3) {
                    value.username = data[2];
                    value.password = '';
                }
                else if (data.length == 4) {
                    value.username = data[2];
                    value.password = data[3];
                }
            }
            listDataInput.push(value);
        }
    }
}

function CheckProxy() {
    var totalProxy = listDataInput.length;
    if (totalProxy <= 0) {
        ShowAlert('danger', "Please check your data.");
        return;
    }
    var dataRequest = {
        data: listDataInput
    }
    Clock();
    var table = $('#datatable').DataTable();
    table.clear().draw();
    ShowLoadingButton("btnCheck");
    DisableItem(listItem);
    $.ajax({
        url: '/proxy/process-check-proxy',
        data: JSON.stringify(dataRequest),
        contentType: 'application/json',
        type: "POST",
    })
        .done(function(result) {
            if (result.Status == 'Success') {
                ShowAlert('success', 'Checking!');
                code_check = result.Result;
                if (!interval_check) {
                    interval_check = setInterval(() => {
                        GetCheckProxy();
                    }, delay)
                }
            }
            else {
                ShowAlert('warning', result.Result);
                RestoreButton("btnCheck", "Check");
                EnableItem(listItem);
                clearInterval(interval);
            }
        })
        .fail(function(result) {
            RestoreButton("btnCheck", "Check");
            EnableItem(listItem);
            clearInterval(interval);
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
}

function GetCheckProxy() {
    var totalAcc = listDataInput.length;
    $.post("/proxy/process-get-check-proxy", {
        code: code_check
    })
        .done(function(result1) {
            if (result1.Status == 'Success') {
                var data = result1.Result;
                for (let i = 0; i < data.length; i++) {
                    var value = new Array();
                    value.push(data[i].no);
                    value.push(data[i].ip);
                    value.push(data[i].port);
                    value.push(data[i].status);
                    AddRowDataTable('datatable', data[i].no, value);
                    if (data[i].status == 'End Check Proxy') {
                        pauseCheck();
                        break;
                    }
                }
            }
            else {
                ShowAlert('warning', result1.Result);
                pauseCheck();
            }
        })
        .fail(function(result1) {
            if (result1.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
            pauseCheck();
        })
}

function pauseCheck() {
    clearInterval(interval_check)
    interval_check = undefined;
    RestoreButton("btnCheck", "Check");
    EnableItem(listItem);
    clearInterval(interval);
} 