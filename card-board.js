var cardId = 0;
var noteId = 0;

	function addInteraction( id ) {
		$( id ).draggable();
		$( id ).mouseover( function() {
			$( id ).addClass( "highlight" ) })
			.mouseout( function() {
			$( id ).removeClass( "highlight" ) })
			;
	}

	function addCard( id, top, left, title, description ) {
		cardId++;
		string = "" +
				"<div id='card-" + cardId + "' class='card shadow' style='top: " + top + "px;left: " + left + "px;'>" +
					"<div class='line' style='top: 25px;'>&nbsp;</div>" +
					"<div class='line' style='top: 41px;'>&nbsp;</div>" +
					"<div class='line' style='top: 57px;'>&nbsp;</div>" +
					"<div class='line' style='top: 73px;'>&nbsp;</div>" +
					"<div class='line' style='top: 89px;'>&nbsp;</div>" +
					"<div class='line' style='top: 105px;'>&nbsp;</div>" +
					"<div class='title'>" + title + "</div>" +
					"<div class='body'>" + description + "</div>" +
					"</div>";

		$( '#card-layout' ).append( string );
		addInteraction( "#card-" + cardId );
	}

	function addNote( id, top, left, description ) {
		noteId++;
		string = "" +
				"<div id='note-" + noteId + "' class='note shadow' style='top: " + top + "px;left: " + left + "px;'>" +
					description +
					"</div>";

		$( '#card-layout' ).append( string );
		addInteraction( "#note-" + noteId );
	}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}

		function createDialogs() {
$( "#dialog-form-card" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Create a card": function() {
					var bValid = true;
					var allFields = $( [] ).add( title ).add( description )
					var title = $("#title");
					var description = $("#description");
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( title, "title", 3, 16 );
					bValid = bValid && checkRegexp( title, /^[a-z]([0-9a-z_])+$/i, "Title may consist of a-z, 0-9, underscores, begin with a letter." );

					if ( bValid ) {
						addCard( 4, 250, 250, title.val(), description.val() );
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
		var allFields = $( [] ).add( title ).add( description )
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

$( "#dialog-form-note" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Create a note": function() {
					var bValid = true;
					var noteDescription = $("#note-description");
					var allFields = $( [] ).add( noteDescription )
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( noteDescription, "note-description", 3, 16 );

					if ( bValid ) {
						addNote( 4, 250, 400, noteDescription.val() );
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				var noteDescription = $("#note-description");
				var allFields = $( [] ).add( title ).add( noteDescription )
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#create-card" )
					.button()
					.click(function() {
						$( "#dialog-form-card" ).dialog( "open" );
					});
		$( "#create-note" )
					.button()
					.click(function() {
						$( "#dialog-form-note" ).dialog( "open" );
					});
	}
	