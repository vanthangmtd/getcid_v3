const configDisplayDataTable = {
    scrollX: true,
    responsive: true,
    colReorder: true,
    fixedHeader: true,
    searchBuilder: true,
    lengthMenu: [
        [10, 25, 50, -1],
        [10, 25, 50, 'All'],
    ]
};

$(document).ready(function () {
    $("#layout_login").show();
    $("#layout_register").hide();
})

function Get_category_preview(product_id, category_id) {
    $.post("/category/category_preview", {
        product_id: product_id,
        category_id: category_id
    })
        .done(function (resp) {
            $("#modal_box .modal_body").html(resp);
            $("#modal_box").modal("show");
        })
        .fail(function (result) {
            if(result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        })
}

function ValidateEmail(inputText) {
    var mailformat = /^([0-9a-zA-Z]([-\._\w]*[0-9a-zA-Z]*[-\._\w])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})+$/;
    if (inputText.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}

function validatePhone(txtPhone) {
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
    if (filter.test(txtPhone)) {
        return true;
    }
    else {
        return false;
    }
}

function ShowAlert(messageAlert, messageText) {
    var html = '<div class="toast text-white bg-' + messageAlert + ' border-0" data-bs-delay="15000"><div class="toast-header bg-' + messageAlert + ' text-white"><strong class="me-auto">Notification!</strong><small>just now</small><button type="button" class="btn-close" data-bs-dismiss="toast"></button></div>';
    html = html + '<div class="toast-body">' + messageText + '</div></div>';
    $("#toast").html(html);
    $(".toast").toast("show");
};

function CopyTextToClipboard(text) {
    if (!navigator.clipboard) {
        FallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
        ShowAlert('success', "Copy success.");
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function FallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
}

function CopyText(text) {
    if (text.length == 0) {
        ShowAlert('warning', "Text empty, Please get text.");
    }
    else {
        CopyTextToClipboard(text);
    }
}

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

function ReCaptchaOnFocus() {
    var script_load = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    var loaded = $('script[src="' + script_load + '"]').length;
    if (loaded == 0) {
        var head = document.getElementsByTagName('head')[0]
        var script = document.createElement('script')
        script.type = 'text/javascript';
        script.src = script_load;
        head.appendChild(script);
        // remove focus to avoid js error:
        //document.getElementById(item).removeEventListener('focus', ReCaptchaOnFocus(item))
        document.getElementById('block_grecaptcha').setAttribute('style', 'float: left; width: 304px; height: 78px');
    }
};

function DataTableOnLoad() {
    var style_load = 'https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.12.1/af-2.4.0/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/cr-1.5.6/date-1.1.2/fc-4.1.0/fh-3.2.4/kt-2.7.0/r-2.3.0/rg-1.2.0/rr-1.2.8/sc-2.0.7/sb-1.3.4/sp-2.0.2/sl-1.4.0/sr-1.1.1/datatables.min.css';
    var script_load = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/pdfmake.min.js';
    var script1_load = 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.36/vfs_fonts.js';
    var script2_load = 'https://cdn.datatables.net/v/bs5/jszip-2.5.0/dt-1.12.1/af-2.4.0/b-2.2.3/b-colvis-2.2.3/b-html5-2.2.3/b-print-2.2.3/cr-1.5.6/date-1.1.2/fc-4.1.0/fh-3.2.4/kt-2.7.0/r-2.3.0/rg-1.2.0/rr-1.2.8/sc-2.0.7/sb-1.3.4/sp-2.0.2/sl-1.4.0/sr-1.1.1/datatables.min.js';
    var loaded = $('script[src="' + script2_load + '"]').length;
    if (loaded == 0) {
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');
        var script = document.createElement('script');
        var script1 = document.createElement('script');
        var script2 = document.createElement('script');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.href = style_load;

        var script = document.createElement('script')
        script.type = 'text/javascript';
        script.src = script_load;
        var script1 = document.createElement('script')
        script1.type = 'text/javascript';
        script1.src = script1_load;
        var script2 = document.createElement('script')
        script2.type = 'text/javascript';
        script2.src = script2_load
        head.appendChild(style);
        head.appendChild(script);
        head.appendChild(script1);
        head.appendChild(script2);
        //document.getElementById(item).removeEventListener('focus', DataTableOnLoad(item))
    }
}

function ShowPassword(element1, element2) {
    if ($('#' + element1).attr("type") == "password") {
        $('#' + element1).attr("type", "text");
        $('#' + element2).html('<i class="fa-solid fa-eye-slash"></i>');
    } else {
        $('#' + element1).attr("type", "password");
        $('#' + element2).html('<i class="fa-solid fa-eye"></i>');
    }
}

var interval;
function Clock() {
    clearInterval(interval);
    var startTime = Date.now();
    interval = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        $('#timer').html((elapsedTime / 1000).toFixed(3));
    }, 100);
}

function SettingDatatable(table_id) {
    $('#' + table_id).DataTable({
        destroy: true,
        lengthMenu: configDisplayDataTable.lengthMenu,
        scrollX: configDisplayDataTable.scrollX,
        responsive: configDisplayDataTable.responsive,
        colReorder: configDisplayDataTable.colReorder,
        searchBuilder: configDisplayDataTable.searchBuilder,
        buttons: [
            'copy', 'csv', 'excel', 'pdf'
        ],
        dom: "<'row'<'col-sm-12 col-md-8'Q><'col-sm-12 col-md-4 text-end'B>>" +
            "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
    });
    var table = $('#' + table_id).DataTable();
    table.order([1, 'desc']).draw();
    $('#' + table_id + '_wrapper thead tr th').each(function () { $(this).removeClass('text-break text_align_font_size') });
}

function ConfigSettingDatatable(table_id) {
    $('#' + table_id).DataTable({
        destroy: true,
        lengthMenu: configDisplayDataTable.lengthMenu,
        scrollX: configDisplayDataTable.scrollX,
        responsive: configDisplayDataTable.responsive,
        colReorder: configDisplayDataTable.colReorder,
        searchBuilder: configDisplayDataTable.searchBuilder,
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
    $('#' + table_id + '_wrapper thead tr th').each(function () { $(this).removeClass('text-break text_align_font_size') });
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

function AddRowDataTable(table_id, id_row_update, value) {
    var table = $('#' + table_id).DataTable();
    table.$('tr.choose').removeAttr('style');
    table.$('tr.choose').removeClass('choose');
    value[1] = table.rows().count() + 1;
    var rowNode = table.row.add(value).draw().node();
    $(rowNode).addClass('choose');
    $(rowNode).css('background-color', 'silver');
    for (let i = 0; i < value.length; i++) {
        $(rowNode).find('td').eq(i).addClass('text-break');
    }
    table.order([0, 'asc']).draw();
}

(function () {
    /**
     * Tinh chỉ số thập phân của một con số.
     *
     * @@param {String}  type  Loại điều chỉnh.
     * @@param {Number}  value Số liệu.
     * @@param {Integer} exp   Số mũ (the 10 logarithm of the adjustment base).
     * @@returns {Number} Giá trị đã chỉnh sửa.
     */
    function decimalAdjust(type, value, exp) {
        // Nếu exp có giá trị undefined hoặc bằng không thì...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Nếu value không phải là ố hoặc exp không phải là số nguyên thì...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Làm tròn số thập phân (ra xa giá trị 0)
    if (!Math.ceil10) {
        Math.ceil10 = function (value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

$(function () {
    var url = window.location.pathname,
        urlRegExp = new RegExp(url == '/' ? window.location.origin + '/?$' : url.replace(/\/$/, ''));
    $('.main_menu a').each(function () {
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).parents('li').find('.menu-down').addClass("active");
            $(this).addClass('active');
        }
    });
    $('.offcanvas_main_menu a').each(function () {
        var uri = this.href.replace(/\/$/, '');
        if (uri.includes('#'))
            uri = 'avascript:void(0);';
        if (urlRegExp.test(uri)) {
            $(this).parents('li').find('.menu-down').addClass("active");
            var childNodes = $(this).parents('.menu-item-has-children')[0].childNodes;
            childNodes[2].className = "active";
            $(this).addClass('active');
        }
    });
    $('.categories_menu_toggle a').each(function () {
        if (urlRegExp.test(this.href.replace(/\/$/, ''))) {
            $(this).parents('li').find('.menu-down').addClass("active");
            var childNodes = $(this).parents('.menu_item_children')[0].childNodes;
            childNodes[1].className = "active";
            $(this).addClass('active');
        }
    });
});