(function() {
    const defaultHtml = '';
    let editor;
    const previewFrame = document.getElementById("previewFrame");

    function runPreview() {
        if (!editor) return;
        const src = editor.getValue();
        const libs = `<meta charset="utf-8">
                        <meta name="viewport" content="width=device-width,initial-scale=1">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css">
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"><\/script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.9.2/umd/popper.min.js"><\/script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.min.js"><\/script>
                        <style>
                        /* padding nằm ở wrapper, không phụ thuộc body */
                        #__app { min-height: 100vh; }
                        </style>`;

        let html = src;
        const closeBody = '</' + 'body>';
        const closeHtml = '</' + 'html>';
        const hasHtml = /<html[\s>]/i.test(src);
        const hasHead = /<head[\s>]/i.test(src);
        const hasBody = /<body[\s>]/i.test(src);

        // Hàm bọc nội dung vào wrapper p-3
        const wrap = (content) => `<div id="__app" class="p-3">${content}</div>`;

        if (!hasHtml) {
            // Case 1: user nhập fragment
            html = '<!doctype html><html><head>' + libs + '</head><body>' +
                wrap(src) +
                closeBody + closeHtml;
        } else {
            // Case 2: user nhập full document
            // 2.1 inject libs vào <head>
            if (hasHead) {
                html = html.replace(/<head[^>]*>/i, (m) => m + libs);
            } else {
                html = html.replace(/<html[^>]*>/i, (m) => `${m}<head>${libs}</head>`);
            }

            // 2.2 bọc nội dung trong <body>
            if (hasBody) {
                // lấy phần giữa <body> rồi bọc lại
                html = html.replace(/<body([^>]*)>([\s\S]*?)<\/body>/i, (m, attrs, bodyInner) => {
                    return '<body' + attrs + '>' + wrap(bodyInner) + closeBody;
                });
            } else {
                // có <html> nhưng không có <body> -> bọc toàn bộ và thêm body
                html = html.replace(/<\/head>/i, '</head><body>' + wrap('') + closeBody);
                // nếu không có </head> (html lạ), fallback: append body cuối
                if (!/<body[\s>]/i.test(html)) {
                    html = html.replace(/<\/html>/i, `<body>${wrap("")}${closeBody}${closeHtml}`);
                }
            }
        }

        previewFrame.srcdoc = html;
    }

    // Monaco init
    require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
    require(["vs/editor/editor.main"], function() {
        editor = monaco.editor.create(document.getElementById("editor"), {
            value: defaultHtml,
            language: "html",
            theme: "vs-light",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "off",            // quan trọng: tắt wrap -> mới có scroll ngang đúng nghĩa
            wrappingStrategy: "advanced",
            scrollBeyondLastLine: false,
            mouseWheelZoom: false,
            scrollPredominantAxis: true,
            smoothScrolling: true,
            scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                handleMouseWheel: true,
                alwaysConsumeMouseWheel: false,
                useShadows: false,
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12
            }
        });
        window.editor = editor;
        runPreview(); // initial preview
    });

    // Auto-run debounce
    let t = null;
    function debounceRun() {
        clearTimeout(t);
        t = setTimeout(runPreview, 400);
    }

    // Khi bấm Preview -> đảm bảo iframe có content mới nhất
    $("#btnPreview").on("click", runPreview);

    $("#btnRefreshInModal").on("click", runPreview);

    // Khi modal mở, iOS/Android đôi khi làm layout Monaco lệch -> layout lại khi đóng/mở
    const previewModalEl = document.getElementById("previewModal");

    previewModalEl.addEventListener("shown.bs.modal", function() {
        // run lại để chắc iframe render đúng kích thước modal
        runPreview();
    });

    previewModalEl.addEventListener("hidden.bs.modal", function() {
        // quay lại editor, layout lại cho chắc (đặc biệt khi xoay màn hình trong modal)
        if (editor) {
            setTimeout(() => editor.layout(), 0);
            editor.focus();
        }
    });

    // Resize/orientation
    window.addEventListener("resize", () => {
        if (editor) editor.layout();
    });
})();

function setEditorValueSafe(value) {
    const wait = setInterval(() => {
        if (window.editor && typeof window.editor.setValue === "function") {
            clearInterval(wait);
            window.editor.setValue(value);
        }
    }, 50);
}

function getEditorValueSafe() {
    if (window.editor && window.editor.getValue) {
        return window.editor.getValue();
    }
    return "";
} 