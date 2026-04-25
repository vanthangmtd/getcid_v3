var listItem = new Array("tarData", "btnCheck", "btnClean", "cbbTypePassword", "tbxGuidProcessCheckCoin", "tbxGuidProcessChangePassword", "btnChangePassword", "tbxCoin", "tbxUserReceive", "btnSendCoin");

var listDataInput = new Array();
var guid_process_check = '';
var guid_process_change_password = '';
var guid_process_send_coin = '';

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
            const person = {
                user: items[i].substring(0, items[i].indexOf("|")),
                password: items[i].substring(items[i].indexOf("|") + 1)
            };
            if (person.user != null && person.user != '' && person.password != null && person.password != '')
                listDataInput.push(person);
        }
    }
}

function CheckCoins(platform) {
    var table = $('#datatable').DataTable();
    table.clear().draw();
    table.column(0).title('ID');
    table.column(1).title('UserName');
    table.column(2).title('Password');
    table.column(3).title('Coins');
    table.column(4).title('Status');

    $('#spTotalCoin').html('-');
    $('#spTotalCoinSend').html('-');
    $('#tbxGuidProcessCheckCoin').val('');
    $('#tbxGuidProcessChangePassword').val('');

    var totalAcc = listDataInput.length;
    if (totalAcc <= 0) {
        ShowAlert('warning', "Please check your data.");
        return;
    }
    var dataRequest = {
        platform: platform,
        data: listDataInput
    }
    Clock();
    ShowLoadingButton("btnCheck");
    DisableItem(listItem);
    $.ajax({
        url: '/process-check',
        data: JSON.stringify(dataRequest),
        contentType: 'application/json',
        type: "POST",
    })
        .done(function(result) {
            if (result.Status == 'Success') {
                ShowAlert('success', 'Checking!');
                guid_process_check = result.Result.guid_process;
                $('#tbxGuidProcessCheckCoin').val(result.Result.guid_process);
                if (!interval_check) {
                    interval_check = setInterval(() => {
                        GetCheckCoin();
                    }, delay)
                }
            }
            else {
                $('#tbxGuidProcessCheckCoin').val('');
                $('#tbxGuidProcessChangePassword').val('');
                ShowAlert('warning', result.Result);
                pauseCheck();
            }
        })
        .fail(function(result) {
            $('#tbxGuidProcessCheckCoin').val('');
            $('#tbxGuidProcessChangePassword').val('');
            pauseCheck();
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
}

function GetCheckCoin() {
    var totalAcc = listDataInput.length;
    $.post("/get-check", {
        guid_process: guid_process_check
    })
        .done(function(result1) {
            if (result1.Status == 'Success') {
                var table = $('#datatable').DataTable();
                var data1 = result1.Result.data1;
                var data2 = result1.Result.data2;
                var check_end = 0;
                for (let a = 0; a < data1.length; a++) {
                    if (data1[a].message == 'End Check Coin')
                        check_end = 1;
                }
                if (check_end == 1) 
                    table.clear().draw();

                for (let a = 0; a < data1.length; a++) {
                    var value = new Array();
                    value.push(data1[a].no);
                    value.push(data1[a].username);
                    value.push(data1[a].password);
                    var coin = FormatNumber(data1[a].coin);
                    value.push(coin);
                    if (check_end == 1)
                        value.push(data1[a].message);
                    else
                        value.push('Checking...');

                    AddRowDataTable('datatable', data1[a].no, value);

                    if (data1[a].message == 'End Check Coin') {
                        pauseCheck();
                        $('#spTotalCoin').html(FormatNumber(data2.totalCoin));
                        $('#spTotalCoinSend').html(FormatNumber(data2.totalCoinSend));
                        break;
                    }
                }
                if (table.rows().count() == totalAcc || (table.rows().count() - 1) == totalAcc) {
                    pauseCheck();
                    $('#spTotalCoin').html(FormatNumber(data2.totalCoin));
                    $('#spTotalCoinSend').html(FormatNumber(data2.totalCoinSend));
                }
            }
            else {
                $('#tbxGuidProcessCheckCoin').val('');
                $('#tbxGuidProcessChangePassword').val('');
                ShowAlert('warning', result.Result);
                pauseCheck();
                $('#spTotalCoin').html('-');
                $('#spTotalCoinSend').html('-');
            }
        })
        .fail(function(result1) {
            $('#tbxGuidProcessCheckCoin').val('');
            $('#tbxGuidProcessChangePassword').val('');
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



function ChangePassword(platform) {
    var table = $('#datatable').DataTable();
    table.clear().draw();
    table.column(0).title('ID');
    table.column(1).title('UserName');
    table.column(2).title('Password');
    table.column(3).title('Coins');
    table.column(4).title('Status');
    $('#spTotalCoin').html('-');
    $('#spTotalCoinSend').html('-');
    $('#tbxGuidProcessChangePassword').val('');

    var guid_process_check_coin = $('#tbxGuidProcessCheckCoin').val();
    var type_password = $("#cbbTypePassword :selected").val();
    var new_password = $('#tbxPassword').val();
    if (guid_process_check_coin == '') {
        ShowAlert('warning', "Please check your data.");
        return;
    }

    var dataRequest = {
        platform: platform,
        guid_process_check_coin: guid_process_check_coin,
        type_password: type_password,
        new_password: new_password,
    }
    Clock1();
    ShowLoadingButton("btnChangePassword");
    DisableItem(listItem);
    $.ajax({
        url: '/process-change-password',
        data: JSON.stringify(dataRequest),
        contentType: 'application/json',
        type: "POST",
    })
        .done(function(result) {
            if (result.Status == 'Success') {
                ShowAlert('success', 'Changing!');
                guid_process_change_password = result.Result.guid_process;
                $('#tbxGuidProcessChangePassword').val(result.Result.guid_process);
                if (!interval_change_password) {
                    interval_change_password = setInterval(() => {
                        GetChangePassword();
                    }, delay)
                }
            }
            else {
                $('#tbxGuidProcessChangePassword').val('');
                ShowAlert('warning', result.Result);
                pauseChangePassword();
            }
        })
        .fail(function(result) {
            $('#tbxGuidProcessChangePassword').val('');
            pauseChangePassword();
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
}

function GetChangePassword() {
    $.post("/get-change-password", {
        guid_process: guid_process_change_password
    })
        .done(function(result1) {
            if (result1.Status == 'Success') {
                var table = $('#datatable').DataTable();
                var data = result1.Result;
                var check_end = 0;
                for (let a = 0; a < data.length; a++) {
                    if (data[a].message == 'End Change Password')
                        check_end = 1;
                }
                if (check_end == 1) 
                    table.clear().draw();

                for (let a = 0; a < data.length; a++) {
                    var value = new Array();
                    value.push(data[a].no);
                    value.push(data[a].username);
                    value.push(data[a].password);
                    var coin = FormatNumber(data[a].coin);
                    value.push(coin);
                    if (check_end == 1)
                        value.push(data[a].message);
                    else
                        value.push('Changing...');

                    AddRowDataTable('datatable', data[a].no, value);

                    if (data[a].message == 'End Change Password') {
                        pauseChangePassword();
                        break;
                    }
                }
            }
            else {
                $('#tbxGuidProcessChangePassword').val('');
                ShowAlert('warning', result.Result);
                pauseChangePassword();
            }
        })
        .fail(function(result1) {
            $('#tbxGuidProcessChangePassword').val('');
            if (result1.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
            pauseChangePassword();
        })
}

function pauseChangePassword() {
    clearInterval(interval_change_password)
    interval_change_password = undefined;
    RestoreButton("btnChangePassword", "Change Password");
    EnableItem(listItem);
    clearInterval(interval1);
} 


function SendCoin(platform) { 
    var table = $('#datatable').DataTable();
    table.clear().draw();
    table.column(0).title('ID');
    table.column(1).title('User send');
    table.column(2).title('User Receive');
    table.column(3).title('Coins');
    table.column(4).title('Status');
    var guid_process_check_coin = $('#tbxGuidProcessCheckCoin').val();
    var guid_process_change_password = $('#tbxGuidProcessChangePassword').val();
    var coin_send = $('#tbxCoin').val();
    var user_receive = $('#tbxUserReceive').val();

    var guid_process = '';
    if (guid_process_change_password != '')
        guid_process = guid_process_change_password;
    else if (guid_process_check_coin != '')
        guid_process = guid_process_check_coin;

    if (guid_process == '' || coin_send <= 0 || user_receive == '') {
        ShowAlert('warning', "Please check your data.");
        return;
    }

    var dataRequest = {
        platform: platform,
        guid_process: guid_process,
        coin_send: coin_send,
        user_receive: user_receive
    }
    Clock2();
    ShowLoadingButton("btnSendCoin");
    DisableItem(listItem);
    $.ajax({
        url: '/process-send-coin',
        data: JSON.stringify(dataRequest),
        contentType: 'application/json',
        type: "POST",
    })
        .done(function(result) {
            if (result.Status == 'Success') {
                ShowAlert('success', 'Sending!');
                guid_process_send_coin = result.Result.guid_process;
                if (!interval_send) {
                    interval_send = setInterval(() => {
                        GetSendCoin();
                    }, delay)
                }
            }
            else {
                ShowAlert('warning', result.Result);
                pauseSendCoin();
            }
        })
        .fail(function(result) {
            pauseSendCoin();
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
} 

function GetSendCoin() {
    $.post("/get-send-coin", {
        guid_process: guid_process_send_coin
    })
        .done(function(result1) {
            if (result1.Status == 'Success') {
                var table = $('#datatable').DataTable();
                var data = result1.Result.data;
                var check_end = 0;
                for (let a = 0; a < data.length; a++) {
                    if (data[a].message == 'End Send Coin')
                        check_end = 1;
                }
                if (check_end == 1) {
                    table.clear().draw();
                    $('#spCoinSend').html(FormatNumber(result1.Result.total_coin));
                }

                for (let a = 0; a < data.length; a++) {
                    var value = new Array();
                    value.push(data[a].no);
                    value.push(data[a].user_send);
                    value.push(data[a].user_receive);
                    var coin = FormatNumber(data[a].coin_send);
                    value.push(coin);
                    if (check_end == 1)
                        value.push(data[a].message);
                    else
                        value.push('Sending...');

                    AddRowDataTable('datatable', data[a].no, value);

                    if (data[a].message == 'End Send Coin') {
                        pauseSendCoin();
                        break;
                    }
                }
            }
            else {
                ShowAlert('warning', result.Result);
                pauseSendCoin();
            }
        })
        .fail(function(result1) {
            if (result1.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
            pauseSendCoin();
        })
}

function pauseSendCoin() {
    clearInterval(interval_send)
    interval_send = undefined;
    RestoreButton("btnSendCoin", "Send");
    EnableItem(listItem);
    clearInterval(interval2);
} 
