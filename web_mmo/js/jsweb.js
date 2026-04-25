if (document.getElementById('datatable') instanceof Object) {
    SettingDatatable('datatable');
}

$('#datatable tbody').on('click', 'tr', function() {
    var table = $('#datatable').DataTable();
    table.$('tr.choose').removeAttr('style');
    table.$('tr.choose').removeClass('choose');

    $(this).addClass('choose');
    $(this).css('background-color', 'silver');
});

var interval;
var interval1;
var interval2;
var interval_check;
var interval_change_password;
var interval_send;
const delay = 5000;
function Clock() {
    clearInterval(interval);
    var startTime = Date.now();
    interval = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        $('#timerCheck').html((elapsedTime / 1000).toFixed(3));
    }, 100);
}

function Clock1() {
    clearInterval(interval1);
    var startTime = Date.now();
    interval1 = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        $('#timerChangePass').html((elapsedTime / 1000).toFixed(3));
    }, 100);
}

function Clock2() {
    clearInterval(interval2);
    var startTime = Date.now();
    interval2 = setInterval(function() {
        var elapsedTime = Date.now() - startTime;
        $('#timerSend').html((elapsedTime / 1000).toFixed(3));
    }, 100);
}

function SettingDatatable(table_id) {
    $('#' + table_id).DataTable({
        destroy: true,
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, 'All'],
        ],
        scrollX: true,
        responsive: true,
        colReorder: true,
        searchBuilder: true,
        typeDetect: false,
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ],
        dom: "<'row'<'col-sm-12 col-md-8'Q><'col-sm-12 col-md-4 text-end'B>>" +
            "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    });
    var table = $('#' + table_id).DataTable();
    table.order([0, 'desc']).draw();
    $('#' + table_id + '_wrapper thead tr th').each(function() { $(this).removeClass('text-break text_align_font_size') });
}

function ConfigSettingDatatable(table_id) {
    $('#' + table_id).DataTable({
        destroy: true,
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, 'All'],
        ],
        scrollX: true,
        responsive: true,
        colReorder: true,
        searchBuilder: true,
        typeDetect: false,
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ],
        dom: "<'row'<'col-sm-12 col-md-8'Q><'col-sm-12 col-md-4 text-end'B>>" +
            "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    });
    var table = $('#' + table_id).DataTable();
    table.order([0, 'desc']).draw();
    $('#' + table_id + '_wrapper thead tr th').each(function() { $(this).removeClass('text-break text_align_font_size') });
}

function DeleteRowDatatable(table_id) {
    var table = $('#' + table_id).DataTable();
    table.row('.choose').remove().draw(false);
}

function AddOrUpdateRowDataTable(table_id, id_row_update, value) {
    var table = $('#' + table_id).DataTable();
    if (id_row_update.length > 0) {
        var row = table.row('.choose');
        var index = row.index();
        value[1] = $(table.row('tr.choose').node()).find('td').eq(1)[0].innerText;
        table.row(index).data(value).draw();
    }
    else {
        table.$('tr.choose').removeAttr('style');
        table.$('tr.choose').removeClass('choose');
        value[1] = table.rows().count() + 1;
        var rowNode = table.row.add(value).draw().node();
        $(rowNode).addClass('choose');
        $(rowNode).css('background-color', 'silver');
        for (let i = 0; i < value.length; i++) {
            if (i == 0)
                $(rowNode).find('td').eq(i).addClass('text_align_font_size');
            else
                $(rowNode).find('td').eq(i).addClass('text-break');
        }
        table.order([1, 'desc']).draw();
    }
}

function ShowAlert(messageAlert, messageText) {
    var html = '<div class="toast text-white bg-' + messageAlert + ' border-0" data-bs-delay="10000"><div class="toast-header bg-' + messageAlert + ' text-white"><strong class="me-auto">Notification!</strong><small>just now</small><button type="button" class="btn-close" data-bs-dismiss="toast"></button></div>';
    html = html + '<div class="toast-body">' + messageText + '</div></div>';
    $("#toast").html(html);
    $(".toast").toast("show");
};

function DisableItem(listItems) {
    for (let i = 0; i < listItems.length; i++) {
        $("#" + listItems[i] + "").attr('disabled', true);
    }
}

function EnableItem(listItems) {
    for (let i = 0; i < listItems.length; i++) {
        $("#" + listItems[i] + "").removeAttr('disabled');
    }
}

function ShowLoadingButton(idItem) {
    var button = '<i class="fa-solid fa-spinner fa-pulse" style="font-size: 20px;"></i>';
    $("#" + idItem + "").html(button);
}

function RestoreButton(idItem, nameItem) {
    $("#" + idItem + "").html(nameItem);
}

$(function() {
    var url = window.location.pathname,
        urlRegExp = new RegExp(url == '/' ? window.location.origin + '/?$' : url.replace(/\/$/, ''));
    $('.flex-column a').each(function() {
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).parents('li').find('.nav-link').addClass("active");
            $(this).addClass('active');
        }
    });
});

function CleanData() {
    $("#tarData").val('');
}

function TypePassword() {
    var typePassword = $("#cbbTypePassword :selected").val();
    if (typePassword == 'ramdom') {
        $("#tbxPassword").attr('disabled', true);
    }
    else {
        $("#tbxPassword").removeAttr('disabled');
    }
}

function AddRowDataTable(table_id, id_row_update, value) {
    var table = $('#' + table_id).DataTable();
    table.$('tr.choose').removeAttr('style');
    table.$('tr.choose').removeClass('choose');
    //value[1] = table.rows().count() + 1;
    var rowNode = table.row.add(value).draw().node();
    $(rowNode).addClass('choose');
    $(rowNode).css('background-color', 'silver');
    for (let i = 0; i < value.length; i++) {
        $(rowNode).find('td').eq(i).addClass('text-break');
    }
    table.order([0, 'asc']).draw();
}

function FormatNumber(number) {
    var num = parseFloat(number);
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
} 