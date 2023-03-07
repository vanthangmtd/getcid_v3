var listItem = new Array("tbxIID", "btnGetcid", "btnCopyCid", "btnCopyCidA_H", "cbbVersion", "btnCopyCMD", "tarCMD");

$(window).on("load",
    function () {
        $("#tbxIID").on("change paste input", function (e) {
            var t = this.value.replace(/\D/g, "");
            54 == t.length || 63 == t.length ? (this.value = t.match(new RegExp(".{1," + t.length / 9 + "}", "g")).join("-")) : (this.value = t);
        });
    });

function ValidateIID(iid) {
    return iid.replace(/\D/g, '').trim();
}

var recaptchaCallback = function () {
    $.post({
        url: "/recaptcha",
        headers: {
            'grecaptcha': grecaptcha.getResponse(),
            'content': content
        }
    });
};

function CleanData() {
    $("#tbxCidA").val('');
    $("#tbxCidB").val('');
    $("#tbxCidC").val('');
    $("#tbxCidD").val('');
    $("#tbxCidE").val('');
    $("#tbxCidF").val('');
    $("#tbxCidG").val('');
    $("#tbxCidH").val('');
    $("#cbbVersion").val('').change;
    $("#tarCMD").val('');
}

function CleanDisableLoading() {
    $("#tbxCid").val("Loadding...");
    CleanData();
    ShowLoadingButton("btnGetcid");
    DisableItem(listItem);
}

function Enable() {
    RestoreButton("btnGetcid", "GET");
    EnableItem(listItem);
}

function GetCid(iid) {
    $.post({
        url: "/getcid",
        data: { 'iid': iid },
        headers: {
            'grecaptcha': grecaptcha.getResponse(),
            'authenToken': content
        }
    })
        .done(function (result, status, xhr) {
            if (result.Status == "Success") {
                var resultCid = result.Result;
                if (resultCid.length == 48) {
                    $("#tbxCid").val(resultCid);
                    $("#tbxCidA").val(resultCid.substring(0, 6));
                    $("#tbxCidB").val(resultCid.substring(6, 12));
                    $("#tbxCidC").val(resultCid.substring(12, 18));
                    $("#tbxCidD").val(resultCid.substring(18, 24));
                    $("#tbxCidE").val(resultCid.substring(24, 30));
                    $("#tbxCidF").val(resultCid.substring(30, 36));
                    $("#tbxCidG").val(resultCid.substring(36, 42));
                    $("#tbxCidH").val(resultCid.substring(42, 48));
                    $("#tarCMD").val('');
                    ShowAlert('success', "Get confirmation id success.");
                }
                else if (resultCid == "Server too busy.") {
                    $('#tbxCid').val("Sorry, the website is currently maintaining getcid, please visit it later.");
                    CleanData();
                    ShowAlert('danger', resultCid);
                }
                else if (resultCid == "Blocked IID." || resultCid == "Exceeded IID.") {
                    var set_value = "Key blocked. Please contact the unit that provided you with the key for assistance";
                    $('#tbxCid').val(set_value);
                    $('#tarCMD').val(set_value);
                    ShowAlert('success', "Get confirmation id success.");
                }
                else {
                    $('#tbxCid').val(resultCid);
                    CleanData();
                    ShowAlert('success', "Get confirmation id success.");
                }
                content = xhr.getResponseHeader("authenToken");
            }
            else {
                $('#tbxCid').val(result.Result);
                CleanData();
                ShowAlert('danger', result.Result);
            }
            clearInterval(interval);
            grecaptcha.reset();
            Enable();
        })
        .fail(function (result) {
            clearInterval(interval);
            grecaptcha.reset();
            Enable();
            $('#tbxCid').val("Unable to connect to the server, please try again later!");
            if (result.status == 403) ShowAlert('danger', "Access denied."); else ShowAlert('danger', "Sorry, cannot connect server.");
        });
}

function GetCommand(cbbVersion, cid) {
    if (cbbVersion == "0") {
        var cmdWindows = "set CID=" + cid + "\ncscript slmgr.vbs /atp %CID%\ncscript slmgr.vbs /ato\n";
        cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n";
        cmdWindows = cmdWindows + "echo DATE: %date% >status.txt\n";
        cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt\n";
        cmdWindows = cmdWindows + "for /f \"tokens=3\" %b in ('cscript.exe %windir%\\system32\\slmgr.vbs /dti') do set IID=%b\n";
        cmdWindows = cmdWindows + "echo IID: %IID% >>status.txt\n";
        cmdWindows = cmdWindows + "echo CID: " + cid + " >>status.txt\n";
        cmdWindows = cmdWindows + "cscript slmgr.vbs /dli >>status.txt\n";
        cmdWindows = cmdWindows + "cscript slmgr.vbs /xpr >>status.txt\n";
        cmdWindows = cmdWindows + "start status.txt\n";;
        return cmdWindows;
    }
    else if (cbbVersion == "1") {
        var cmdAllOffice = "for %a in (4,5,6) do (if exist \"%ProgramFiles%\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office1%a\")\n";
        cmdAllOffice = cmdAllOffice + "if exist \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\\ospp.vbs\" (cd /d \"%ProgramFiles% (x86)\\Microsoft Office\\Office1%a\"))\n";
        cmdAllOffice = cmdAllOffice + "set CID=" + cid + "\n";
        cmdAllOffice = cmdAllOffice + "cscript //nologo OSPP.VBS /actcid:%CID%\n";
        cmdAllOffice = cmdAllOffice + "cscript.exe OSPP.vbs /act\n";
        cmdAllOffice = cmdAllOffice + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n";
        cmdAllOffice = cmdAllOffice + "echo DATE: %date% >status.txt\n";
        cmdAllOffice = cmdAllOffice + "echo TIME: %time% >>status.txt\n";
        cmdAllOffice = cmdAllOffice + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n";
        cmdAllOffice = cmdAllOffice + "echo IID: %IID%>>status.txt\n";;
        cmdAllOffice = cmdAllOffice + "echo CID: " + cid + ">>status.txt\n";
        cmdAllOffice = cmdAllOffice + "cscript ospp.vbs /dstatus >>status.txt\n";
        cmdAllOffice = cmdAllOffice + "start status.txt\n";
        return cmdAllOffice;
    }
    else if (cbbVersion == "2") {
        var Office2010 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office14\")\n";
        Office2010 = Office2010 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office14\")\n";
        Office2010 = Office2010 + "set CID=" + cid + "\n";
        Office2010 = Office2010 + "cscript //nologo OSPP.VBS /actcid:%CID%\n";
        Office2010 = Office2010 + "cscript.exe OSPP.vbs /act\n";
        Office2010 = Office2010 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n";
        Office2010 = Office2010 + "echo DATE: %date% >status.txt\n";
        Office2010 = Office2010 + "echo TIME: %time% >>status.txt\n";
        Office2010 = Office2010 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n";
        Office2010 = Office2010 + "echo IID: %IID%>>status.txt\n";
        Office2010 = Office2010 + "echo CID:" + cid + ">>status.txt\n";
        Office2010 = Office2010 + "cscript ospp.vbs /dstatus >>status.txt\n";
        Office2010 = Office2010 + "start status.txt\n";
        return Office2010;
    }
    else if (cbbVersion == "3") {
        var Office2013 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office15\")\n";
        Office2013 = Office2013 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office15\")\n";
        Office2013 = Office2013 + "set CID=" + cid + "\n";
        Office2013 = Office2013 + "cscript //nologo OSPP.VBS /actcid:%CID%\n";
        Office2013 = Office2013 + "cscript.exe OSPP.vbs /act\n";
        Office2013 = Office2013 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n";
        Office2013 = Office2013 + "echo DATE: %date% >status.txt\n";
        Office2013 = Office2013 + "echo TIME: %time% >>status.txt\n";
        Office2013 = Office2013 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n";
        Office2013 = Office2013 + "echo IID: %IID%>>status.txt\n";
        Office2013 = Office2013 + "echo CID: " + cid + ">>status.txt\n";
        Office2013 = Office2013 + "cscript ospp.vbs /dstatus >>status.txt\n";
        Office2013 = Office2013 + "start status.txt\n";
        return Office2013;
    }
    else if (cbbVersion == "4") {
        var Office2016 = "if exist \"%ProgramFiles%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles%\\Microsoft Office\\Office16\")\n";
        Office2016 = Office2016 + "if exist \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\\ospp.vbs\" (cd /d \"%ProgramFiles(x86)%\\Microsoft Office\\Office16\")\n";
        Office2016 = Office2016 + "set CID=" + cid + "\n";
        Office2016 = Office2016 + "cscript //nologo OSPP.VBS /actcid:%CID%\n";
        Office2016 = Office2016 + "cscript.exe OSPP.vbs /act\n";
        Office2016 = Office2016 + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e\n";
        Office2016 = Office2016 + "echo DATE: %date% >status.txt\n";
        Office2016 = Office2016 + "echo TIME: %time% >>status.txt\n";
        Office2016 = Office2016 + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b\n";
        Office2016 = Office2016 + "echo IID: %IID%>>status.txt\n";
        Office2016 = Office2016 + "echo CID: " + cid + ">>status.txt\n";
        Office2016 = Office2016 + "cscript ospp.vbs /dstatus >>status.txt\n";
        Office2016 = Office2016 + "start status.txt\n";
        return Office2016;
    }
    else {
        return ""
    }
}

function CopyCommand() {
    var cid = $("#tbxCid").val();
    var version = $("#cbbVersion :selected").val();
    if (cid.length == 0 || version == "") {
        $("#tarCMD").val('');
        //ShowAlert('warning', "Please Get Confirmation Id And Select Version.");
    } else {
        if (ValidateIID(cid).length == 0) {
            ShowAlert('warning', "Wrong confirmation id.");
        } else {
            CopyTextToClipboard(GetCommand(version, cid));
            $("#tarCMD").val(GetCommand(version, cid));
        }
    }
}

$(document).ready(function () {
    $("#btnGetcid").click(function () {
        var iid = ValidateIID($("#tbxIID").val());
        var lengthIID = iid.length
        if ((lengthIID === 54) || (lengthIID === 63) && grecaptcha.getResponse().length != 0) {
            CleanDisableLoading();
            Clock();
            GetCid(iid);
        }
        else if (lengthIID != 54 && lengthIID != 63) {
            ShowAlert('warning', "Wrong IID.");
        }
        else if (grecaptcha.getResponse().length === 0) {
            ShowAlert('warning', "Sorry, cannot get confirmation id.");
        }
        else {
            ShowAlert('warning', "Wrong IID.");
        }
    });

});