	function addCard( id, top, left, title, description ) {
		string = "" +
				"<div id='card-" + id + "' class='card' style='top: " + top + "px;left: " + left + "px;'>" +
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
		$( "#card-" + id ).draggable( { handle: '.title' } );
	}

	function addNote( id, top, left, description ) {
		string = "" +
				"<div id='note-" + id + "' class='note' style='top: " + top + "px;left: " + left + "px;'>" +
					description +
					"</div>";

		$( '#card-layout' ).append( string );
		$( "#note-" + id ).draggable();		
	}

