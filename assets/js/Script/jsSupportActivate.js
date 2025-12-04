function ValidateKey(key) {
    if (key.length == 0)
        return false;
    var regexKey = new RegExp("^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$");
    return regexKey.test(key);
}

function CheckKeySPTActivate(key) {
    if (ValidateKey(key) == false) {
        $('#tbxKeySPTActivate').val('');
    }
}

function CommandSPTActivate(cbbVersion, key) {
    var cmdWindows = "";
    switch (cbbVersion) {
        case "1":
            cmdWindows = "cd %windir%\\system32" + "\r\n";
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms" + "\r\n";
            cmdWindows = cmdWindows + "sc config Winmgmt start=demand & net start Winmgmt" + "\r\n";
            cmdWindows = cmdWindows + "sc config LicenseManager start= auto & net start LicenseManager" + "\r\n";
            cmdWindows = cmdWindows + "sc config wuauserv start= auto & net start wuauserv" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "clipup -v -o -altto c:\\" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs -ato" + "\r\n";
            cmdWindows = cmdWindows + "start ms-settings:activation" + "\r\n";
            break;
        case "2":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n";
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky" + "\r\n";
            cmdWindows = cmdWindows + "sc config Winmgmt start=demand & net start Winmgmt" + "\r\n";
            cmdWindows = cmdWindows + "sc config LicenseManager start=auto & net start LicenseManager" + "\r\n";
            cmdWindows = cmdWindows + "sc config wuauserv start=auto & sc start wuauserv" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dti>C:\\IID.txt" + "\r\n";
            cmdWindows = cmdWindows + "start C:\\IID.txt" + "\r\n";
            break;
        case "3":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n";
            cmdWindows = cmdWindows + "set key=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=6 delims=[.] \" %a in ('ver') do set ver=%a" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /rilc >nul 2>&1" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /upk >nul 2>&1" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ckms >nul 2>&1" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /cpky >nul 2>&1" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /ipk %key%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dti>C:\\IID.txt" + "\r\n";
            cmdWindows = cmdWindows + "start C:\\IID.txt" + "\r\n";
            break;
        case "4":
            cmdWindows = cmdWindows + "sc config LicenseManager start= auto & net start LicenseManager" + "\r\n";
            cmdWindows = cmdWindows + "sc config wuauserv start= auto & net start wuauserv" + "\r\n";
            cmdWindows = cmdWindows + "changepk.exe /productkey VK7JG-NPHTM-C97JM-9MPGT-3V66T" + "\r\n";
            cmdWindows = cmdWindows + "exit" + "\r\n";
            break;
        case "5":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n";
            break;
        case "6":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt " + "\r\n";
            cmdWindows = cmdWindows + "start id.txt" + "\r\n";
            break;
        case "7":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt" + "\r\n";
            cmdWindows = cmdWindows + "start id.txt" + "\r\n";
            break;
        case "8":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dinstid>id.txt " + "\r\n";
            cmdWindows = cmdWindows + "start id.txt" + "\r\n";
            break;
        case "9":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b /ad \"%ProgramFiles(x86)%\\Microsoft Office\\Licenses16\" 2^>nul ^|^| dir /s /b /ad \"%ProgramFiles%\\Microsoft Office\\Licenses16\" 2^>nul') do set \"P=%a\"" + "\r\n";
            cmdWindows = cmdWindows + "For /f %i in ('dir /b \"%P%\\ProPlus2019VL_MAK_AE*.xrm-ms\"') do cscript ospp.vbs /inslic:\"%P%\\%i\"" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n";
            break;
        case "10":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b /ad \"%ProgramFiles(x86)%\\Microsoft Office\\Licenses16\" 2^>nul ^|^| dir /s /b /ad \"%ProgramFiles%\\Microsoft Office\\Licenses16\" 2^>nul') do set \"P=%a\"" + "\r\n";
            cmdWindows = cmdWindows + "For /f %i in ('dir /b \"%P%\\ProPlus2021VL_MAK_AE*.xrm-ms\"') do cscript ospp.vbs /inslic:\"%P%\\%i\"" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n";
            break;
        case "11":
            cmdWindows = cmdWindows + "set k1=" + key + "" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b /ad \"%ProgramFiles(x86)%\\Microsoft Office\\Licenses16\" 2^>nul ^|^| dir /s /b /ad \"%ProgramFiles%\\Microsoft Office\\Licenses16\" 2^>nul') do set \"P=%a\"" + "\r\n";
            cmdWindows = cmdWindows + "For /f %i in ('dir /b \"%P%\\ProPlus2024VL_MAK_AE*.xrm-ms\"') do cscript ospp.vbs /inslic:\"%P%\\%i\"" + "\r\n";
            cmdWindows = cmdWindows + "@echo on&mode con: cols=20 lines=2" + "\r\n";
            cmdWindows = cmdWindows + "cscript OSPP.VBS /inpkey:%k1%" + "\r\n";
            cmdWindows = cmdWindows + "@mode con: cols=100 lines=30" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /act" + "\r\n";
            break;
        default:
            cmdWindows = "";
    }
    return cmdWindows;
}

function GetCommandSPTActivate(cbbVersion, key) {
    if (cbbVersion == '4') {
        $('#tarCommandSPTActivate').val(CommandSPTActivate(cbbVersion, ''));
        CopyTextToClipboard($('#tarCommandSPTActivate').val());
    }
    else {
        if (ValidateKey(key)) {
            $('#tarCommandSPTActivate').val(CommandSPTActivate(cbbVersion, key));
            CopyTextToClipboard($('#tarCommandSPTActivate').val());
        }
        else {
            ShowAlert('warning', "Key Incorrect");
        }
    }
}

function CommandCheckRemove(cbbVersion) {
    var cmdWindows = "";
    switch (cbbVersion) {
        case "1":
            cmdWindows = cmdWindows + "cd %windir%\\system32" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=: / \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n";
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n";
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=3\" %b in ('cscript.exe %windir%\\system32\\slmgr.vbs /dti') do set IID=%b" + "\r\n";
            cmdWindows = cmdWindows + "echo IID: %IID% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /dli >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript slmgr.vbs /xpr >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "start status.txt" + "\r\n";
            break;
        case "2":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "cls" + "\r\n";
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n";
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n";
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n";
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "start status.txt" + "\r\n";
            break;
        case "3":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n";
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n";
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n";
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "start status.txt" + "\r\n";
            break;
        case "4":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n";
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n";
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n";
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "start status.txt" + "\r\n";
            break;
        case "5":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "start WINWORD" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=2,3,4,5,6 usebackq delims=:/ \" %%a in ('%date% %time%') do echo %%c-%%a-%%b %%d%%e" + "\r\n";
            cmdWindows = cmdWindows + "echo DATE: %date% >status.txt" + "\r\n";
            cmdWindows = cmdWindows + "echo TIME: %time% >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens=8\" %b in ('cscript ospp.vbs /dinstid ^| findstr /b /c:\"Installation ID\"') do set IID=%b" + "\r\n";
            cmdWindows = cmdWindows + "echo IID: %IID%>>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "cscript ospp.vbs /dstatus >>status.txt" + "\r\n";
            cmdWindows = cmdWindows + "start status.txt" + "\r\n";
            break;
        case "6":
            cmdWindows = cmdWindows + "For /f \"delims=\" %a in ('dir /s /b \"%ProgramFiles(x86)%\\Microsoft Office\\ospp.vbs\" 2^>nul ^|^| dir /s /b \"%ProgramFiles%\\Microsoft Office\\ospp.vbs\" 2^>nul') do cd /d %~dpa" + "\r\n";
            cmdWindows = cmdWindows + "for /f \"tokens= 8\" %b in ('cscript //nologo OSPP.VBS /dstatus ^| findstr /b /c:\"Last 5\"') do (cscript //nologo ospp.vbs /unpkey:%b)" + "\r\n";
            break;
        case "7":
            cmdWindows = "cscript ospp.vbs /unpkey:";
            break;
        default:
            cmdWindows = "";
            break;
    }
    return cmdWindows;
}

function GetCommandCheckRemove(cbbVersion) {
    $('#tarCommandCheckRemove').val(CommandCheckRemove(cbbVersion));
    CopyTextToClipboard($('#tarCommandCheckRemove').val());
}

function FindKey(listKey) {
    var arrTemp = new Array();
    for (const value of listKey) {
        var result = KeyIdentification(value);
        if (result.length > 0) {
            for (let i = 0; i <= result.length - 1; i++) {
                if (arrTemp.length == 0)
                    arrTemp.push(result[i]);
                else if (arrTemp.includes(result[i]) == false)
                    arrTemp.push(result[i]);
            }
        }
    }
    return arrTemp;
}

function KeyIdentification(key) {
    var arrTemp = new Array();
    var resultMatch = new Array();
    var regexKey = /[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}-[A-Za-z0-9]{5}/gi;
    var resultMatch = key.match(regexKey);
    if (resultMatch != null) {
        for (let i = 0; i <= resultMatch.length - 1; i++) {
            if (ValidateKey(resultMatch[i]))
                arrTemp.push(resultMatch[i]);
        }
        if (arrTemp.length > 0)
            return arrTemp;
        else
            return new Array();
    }
    else
        return new Array();
}

function KeySame(listKey1, listKey2) {
    var listKeySame = new Array();
    for (const value of listKey1) {
        if (listKey2.includes(value)) {
            const textarea = document.getElementById('tarOut1');
            textarea.value += value.trim() + "\r\n";
            listKeySame.push(value);
        }
        else {
            const textarea = document.getElementById('tarOut2');
            textarea.value += value.trim() + "\r\n";
        }
    }
    for (const value of listKey2) {
        if (listKeySame.includes(value) == false) {
            const textarea = document.getElementById('tarOut3');
            textarea.value += value.trim() + "\r\n";
        }
    }
}

function CheckKeySame() {
    $("#tarOut1").val('');
    $("#tarOut3").val('');
    $("#tarOut2").val('');
    var listKey1 = new Array();
    var listKey2 = new Array();
    var items = $("#tarIn1").val().toUpperCase().split('\n');
    for (let i = 0; i <= items.length - 1; i++) {
        var elems = items[i].split('\n');
        listKey1.push(elems[0].trim());
    }
    listKey1 = FindKey(listKey1);

    items = $("#tarIn2").val().toUpperCase().split('\n');
    for (let i = 0; i <= items.length - 1; i++) {
        var elems = items[i].split('\n');
        listKey2.push(elems[0].trim());
    }
    listKey2 = FindKey(listKey2);
    KeySame(listKey1, listKey2);
}

function Refresh() {
    $("#tarIn1").val('');
    $("#tarIn2").val('');
    $("#tarOut1").val('');
    $("#tarOut2").val('');
    $("#tarOut3").val('');
}

function CleanItem(idItem) {
    $("#" + idItem + "").val('');
}

function CopyItem(idItem) {
    CopyTextToClipboard($('#' + idItem + '').val());
}