/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    config.toolbar = [
        { name: 'basicstyles', items: ['Undo', 'Redo', '-', 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
        { name: 'colors', items: ['TextColor', 'BGColor'] },
        { name: 'paragraph', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
        { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
        { name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
        { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
        { name: 'styles', items: ['Font', 'FontSize', 'Format', 'Styles'] },
        { name: 'clipboard', items: ['Cut', 'Copy', 'Paste', '-', 'PasteText', 'PasteFromWord',  ] },
        { name: 'document', items: ['Save', 'NewPage', 'ExportPdf', 'Preview', 'Print', '-', 'Templates'] },
    ];
    config.enterMode = CKEDITOR.ENTER_DIV;
    config.shiftEnterMode = CKEDITOR.ENTER_BR;
};
