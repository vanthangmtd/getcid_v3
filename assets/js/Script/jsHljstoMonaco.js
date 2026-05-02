const HLJS_TO_MONACO = { plaintext: "plaintext", text: "plaintext", html: "html", xml: "xml", css: "css", scss: "scss", less: "less", javascript: "javascript", js: "javascript", typescript: "typescript", ts: "typescript", json: "json", yaml: "yaml", yml: "yaml", markdown: "markdown", md: "markdown", csharp: "csharp", cs: "csharp", java: "java", kotlin: "kotlin", scala: "scala", python: "python", ruby: "ruby", php: "php", "php-template": "php", go: "go", rust: "rust", dart: "dart", swift: "swift", c: "c", cpp: "cpp", "c++": "cpp", "objective-c": "objective-c", shell: "shell", bash: "shell", powershell: "powershell", ps: "powershell", bat: "bat", sql: "sql", mysql: "mysql", pgsql: "pgsql", postgres: "pgsql", redshift: "redshift", ini: "ini", dockerfile: "dockerfile", handlebars: "handlebars", hbs: "handlebars", pug: "pug", twig: "twig", liquid: "liquid", clojure: "clojure", fsharp: "fsharp", elixir: "elixir", graphql: "graphql", lua: "lua", perl: "perl", r: "r", scheme: "scheme", tcl: "tcl", vb: "vb", "powerquery": "powerquery", solidity: "sol", sol: "sol", mips: "mips", asm: "mips", sparql: "sparql", verilog: "verilog", systemverilog: "systemverilog", razor: "razor", freemarker: "freemarker2", hcl: "hcl", redis: "redis", proto: "proto", pascal: "pascal", apex: "apex", abap: "abap", cypher: "cypher", default: "plaintext" }

function detectByPattern(code) {
    const t = code.trim();

    if (!t) return "plaintext";

    // ===== VERY STRONG SIGNALS =====

    // JSON
    if (/^[\{\[]/.test(t) && /:\s*/.test(t) && !/[;<>]/.test(t))
        return "json";

    // XML
    if (/^<\?xml/.test(t))
        return "xml";

    // HTML
    if (/<(!DOCTYPE|html|head|body|div|span|script|style|form|input)/i.test(t))
        return "html";

    // YAML
    if (/^(\s*[\w-]+:\s+.+\n)+/.test(t) && !/[{};]/.test(t))
        return "yaml";

    // ===== BACKEND LANGUAGES =====

    // C#
    if (/\b(using\s+System|namespace|class\s+\w+|public\s+(class|void|int|string)|Console\.Write(Line)?|async\s+Task|DbContext|ExecuteDelete)\b/i.test(t))
        return "csharp";

    // Java
    if (/\b(public\s+class|System\.out\.println|import\s+java\.)\b/.test(t))
        return "java";

    // Python
    if (/def\s+\w+\(|import\s+\w+|print\(|:\s*\n/.test(t))
        return "python";

    // PHP
    if (/<\?php|\$\w+->|\$\w+\s*=/.test(t))
        return "php";

    // Go
    if (/package\s+main|fmt\.Println|func\s+\w+\(/.test(t))
        return "go";

    // Rust
    if (/fn\s+\w+\(|let\s+mut|println!/.test(t))
        return "rust";

    // Kotlin
    if (/fun\s+\w+\(|val\s+\w+\s*=/.test(t))
        return "kotlin";

    // Swift
    if (/import\s+UIKit|let\s+\w+\s*:\s*\w+/.test(t))
        return "swift";

    // Ruby
    if (/def\s+\w+|puts\s+|end/.test(t))
        return "ruby";

    // ===== DATABASE =====

    if (/\bSELECT\b[\s\S]+\bFROM\b/i.test(t)) return "sql";
    if (/\bINSERT\s+INTO\b/i.test(t)) return "sql";
    if (/\bUPDATE\s+\w+\s+SET\b/i.test(t)) return "sql";
    if (/\bDELETE\s+FROM\b/i.test(t)) return "sql";

    // ===== WEB SCRIPT =====

    // TypeScript (trước JS)
    if (/\binterface\s+\w+|:\s*(string|number|boolean|any)\b/.test(t))
        return "typescript";

    // JavaScript
    if (/\b(function|const|let|var|import|export|console\.log|document\.|window\.)\b/.test(t))
        return "javascript";

    // ===== STYLE =====

    // SCSS
    if (/\$\w+\s*:|@mixin|@include/.test(t))
        return "scss";

    // CSS
    if (/\{[^}]+:\s*[^}]+\}/.test(t))
        return "css";

    // ===== SHELL =====

    if (/^#!\/bin\/(bash|sh)|echo\s+|cd\s+/.test(t))
        return "shell";

    // PowerShell
    if (/\$\w+\s*=|Write-Host|Get-Item/.test(t))
        return "powershell";

    // ===== CONFIG =====

    if (/^\[\w+\]/.test(t))
        return "ini";

    if (/FROM\s+\w+|RUN\s+|CMD\s+/.test(t))
        return "dockerfile";

    // ===== DATA / QUERY =====

    if (/type\s+\w+\s*\{|query\s*\{/.test(t))
        return "graphql";

    // ===== SCRIPT / OTHER =====

    if (/function\s+\w+\(|local\s+\w+\s*=/.test(t))
        return "lua";

    if (/use\s+\w+;|mod\s+\w+;/.test(t))
        return "rust";

    if (isMarkdown(t))
        return "markdown";

    return null;
} 

function isMarkdown(t) {
    let score = 0;

    // heading thực sự (đầu dòng)
    if (/^#{1,6}\s+\w+/m.test(t)) score++;

    // list markdown
    if (/^\s*[-*+]\s+\w+/m.test(t)) score++;

    // blockquote
    if (/^\s*>\s+/m.test(t)) score++;

    // code block chuẩn
    if (/```[\s\S]*```/.test(t)) score += 2;

    // link markdown
    if (/\[[^\]]+\]\([^)]+\)/.test(t)) score++;

    return score >= 2; // phải đủ 2 tín hiệu trở lên
}


(function() {
    let editor, editor2;
    // Monaco init
    require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs" } });
    require(["vs/editor/editor.main"], function() {
        editor = monaco.editor.create(document.getElementById("editor"), {
            value: '',
            language: "plaintext",
            theme: "vs-light",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",            // quan trọng: tắt wrap -> mới có scroll ngang đúng nghĩa
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
        editor2 = monaco.editor.create(document.getElementById("editor2"), {
            value: '',
            language: "plaintext",
            theme: "vs-light",
            automaticLayout: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: "on",            // quan trọng: tắt wrap -> mới có scroll ngang đúng nghĩa
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
            
        editor.updateOptions({
            renderValidationDecorations: "off"
        });
        editor2.updateOptions({
            renderValidationDecorations: "off"
        });

        let detectTimer;
        let detectTimer2;
        editor.onDidChangeModelContent(() => {
            const code = editor.getValue();
            if (code.length < 20) return;
            clearTimeout(detectTimer);
            detectTimer = setTimeout(() => {
                const hlLang = detectLanguageHL(code);
                const monoLang = mapToMonaco(hlLang);
                //console.log('hlLang: ' + hlLang + ' monoLang: ' + monoLang);
                const current = editor.getModel().getLanguageId();
                if (current !== monoLang) {
                    monaco.editor.setModelLanguage(editor.getModel(), monoLang);
                }
            }, 500);
        });

        editor2.onDidChangeModelContent(() => {
            const code = editor2.getValue();
            if (code.length < 20) return;
            clearTimeout(detectTimer2);
            detectTimer2 = setTimeout(() => {
                const hlLang = detectLanguageHL(code);
                const monoLang = mapToMonaco(hlLang);
                //console.log('hlLang: ' + hlLang + ' monoLang: ' + monoLang);
                const current = editor2.getModel().getLanguageId();
                if (current !== monoLang) {
                    monaco.editor.setModelLanguage(editor2.getModel(), monoLang);
                }
            }, 500);
        });
        window.editor = editor;
        window.editor2 = editor2;
    });

    // Resize/orientation
    window.addEventListener("resize", () => {
        if (editor) editor.layout();
        if (editor2) editor2.layout();
    });
})();

function setEditorValueSafe(value) {
    const wait = setInterval(() => {
        if (window.editor2 && typeof window.editor.setValue === "function") {
            clearInterval(wait);
            window.editor2.setValue(value);
        }
    }, 50);
}

function getEditorValueSafe() {
    if (window.editor && window.editor.getValue) {
        return window.editor.getValue();
    }
    return "";
}

function detectLanguageHL(code) {
    try {
        const manual = detectByPattern(code);
        console.log(manual);
        if (manual != null)
            return manual;
        else {
            const result = hljs.highlightAuto(code);
            return result.language || "plaintext";
        }
    } catch {
        return "plaintext";
    }
}

function mapToMonaco(lang) {
    if (!lang) return "plaintext";
    lang = lang.toLowerCase();
    return HLJS_TO_MONACO[lang] || "plaintext";
} 