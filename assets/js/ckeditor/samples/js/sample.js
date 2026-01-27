/**
 * Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* exported initSample */

if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
	CKEDITOR.tools.enableHtml5Elements( document );

// The trick to keep the editor in the sample quite small
// unless user specified own height.
CKEDITOR.config.height = 700;
CKEDITOR.config.width = 'auto';

var initSampleEncode = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

	return function() {
		var editorElement = CKEDITOR.document.getById( 'editorEncode' );

		// :(((
		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml();
		}

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			CKEDITOR.replace( 'editorEncode' );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			CKEDITOR.inline( 'editorEncode' );

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}

		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
})();


var initSampleDecode = (function () {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

	return function () {
		var editorElement = CKEDITOR.document.getById('editorDecode');

		// :(((
		if (isBBCodeBuiltIn) {
			editorElement.setHtml();
		}

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if (wysiwygareaAvailable) {
			CKEDITOR.replace('editorDecode');
		} else {
			editorElement.setAttribute('contenteditable', 'true');
			CKEDITOR.inline('editorDecode');

			// TODO we can consider displaying some info box that
			// without wysiwygarea the classic editor may not work.
		}
	};

	function isWysiwygareaAvailable() {
		// If in development mode, then the wysiwygarea must be available.
		// Split REV into two strings so builder does not replace it :D.
		if (CKEDITOR.revision == ('%RE' + 'V%')) {
			return true;
		}

		return !!CKEDITOR.plugins.get('wysiwygarea');
	}
})();


var initSampleSourceMode = ( function() {
	var wysiwygareaAvailable = isWysiwygareaAvailable(),
		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

	// helper: ép editor ở Source mode, kể cả lúc chưa ready
	function forceSourceMode( editor ) {
		// Nếu instance chưa ready thì chờ instanceReady
		if ( editor.status !== 'ready' ) {
			editor.on( 'instanceReady', function() {
				editor.setMode( 'source' );
			}, null, null, 999 );
			return;
		}

		// Ready rồi thì set luôn
		editor.setMode( 'source' );
	}

	return function() {
		var editorElement = CKEDITOR.document.getById('editorSourceMode');

		if ( isBBCodeBuiltIn ) {
			editorElement.setHtml();
		}

		var editor;

		// Depending on the wysiwygarea plugin availability initialize classic or inline editor.
		if ( wysiwygareaAvailable ) {
			editor = CKEDITOR.replace( 'editor' );
		} else {
			editorElement.setAttribute( 'contenteditable', 'true' );
			editor = CKEDITOR.inline( 'editor' );
		}

		// ✅ Mặc định vào Source mode khi load web
		forceSourceMode( editor );

		// (Tuỳ chọn) Expose ra global để bạn gọi sau khi initSample chạy xong
		window.editorDecode = editor;
	};

	function isWysiwygareaAvailable() {
		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
			return true;
		}
		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
	}
})();
