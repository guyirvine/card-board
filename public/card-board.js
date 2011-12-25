function sendMsgToServer( verbType, msg ) {
	$.ajax({
			url: 'note/13',
			contentType: 'application/json',
			data: msg,
			type: verbType,
			success: function( data, status ) {
				alert( data );
			}
		});
	}

function postMsgToServer( msg ) {
	sendMsgToServer( "POST", msg );
	}
function putMsgToServer( msg ) {
	sendMsgToServer( "PUT", msg );
	}

function updateCardToServer( id, top, left, title, description ) {
	msg = '{ "top": "' + top + '", "left": "' + left + '", "title": "' + title + '", "description": "' + description + '"  }'

	$.ajax({
			url: 'card/' + id,
			contentType: 'application/json',
			data: msg,
			type: "PUT",
			success: function( data, status ) {
				alert( data );
			}
		});

	}

function addInteraction( id ) {
	$( id ).draggable({
		stop: function( event, ui ) {
			alert( ui.position.left );
		}
	});
	$( id ).mouseover( function() {
		$( id ).addClass( "highlight" ) })
		.mouseout( function() {
		$( id ).removeClass( "highlight" ) })
	;
}

function updateTips( tipControl, t ) {
	tipControl
		.text( t )
		.addClass( "ui-state-highlight" );
	setTimeout(function() {
		tipControl.removeClass( "ui-state-highlight", 1500 );
	}, 500 );
}

function checkLength( tipControl, o, n, min, max ) {
	if ( o.val().length > max || o.val().length < min ) {
		o.addClass( "ui-state-error" );
		updateTips( tipControl, "Length of " + n + " must be between " +
			min + " and " + max + "." );
		return false;
	} else {
		return true;
	}
}

function checkRegexp( tipControl, o, regexp, n ) {
	if ( !( regexp.test( o.val() ) ) ) {
		o.addClass( "ui-state-error" );
		updateTips( tipControl, n );
		return false;
	} else {
		return true;
	}
}

/*********************************************************************************************/
/* Split */
var nextSplitId = 0;
var currentSplitId = null;

function createSplitDialog() {
	$( "#dialog-form-split" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Create a split": function() {
					var bValid = true;
					var splitUpper = $("#split-upper");
					var splitLower = $("#split-lower");
					var allFields = $( [] ).add( splitUpper ).add( splitLower )
					allFields.removeClass( "ui-state-error" );

					if ( bValid ) {
						if ( currentSplitId == null ) {
							addSplit( 4, 250, splitUpper.val(), splitLower.val() );
						} else {
							$("#split-" + currentSplitId + "-upper").text($( "#split-upper" ).val() );
							$("#split-" + currentSplitId + "-lower").text($( "#split-lower" ).val( ) );	
						}
							
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				var splitUpper = $("#split-upper");
				var splitLower= $("#split-lower");
				var allFields = $( [] ).add( splitUpper ).add( splitLower )
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
}	


function addSplit( id, top, upper, lower ) {
	var splitId = nextSplitId++;
	string = "" +
			"<div id='split-" + splitId + "' class='split' style='top: " + top + "px;'>" +
				"<div class='upper'id='split-" + splitId + "-upper'>" + upper + "</div>" +
				"<div class='lower'id='split-" + splitId + "-lower'>" + lower + "</div>" +
			"</div>";
	
	$( '#split-layout' ).append( string );
	$( "#split-" + splitId ).draggable( { axis: 'y' });
	$( "#split-" + splitId ).mouseover( function() {
		$( id ).addClass( "highlight" ) })
		.mouseout( function() {
		$( id ).removeClass( "highlight" ) })
	;

	$( "#split-" + splitId )
				.click(function() {
					currentSplitId = splitId;
					$( "#split-upper" ).val( $("#split-" + splitId + "-upper").text() );	
					$( "#split-lower" ).val( $("#split-" + splitId + "-lower").text() );	
					$( "#ui-dialog-title-dialog-form-split" ).text( "Update split" );
					$( "#dialog-form-split" ).dialog( "open" );
				});
}
/*********************************************************************************************/

/*********************************************************************************************/
/* Card */
var nextCardId = 0;
var currentCardId = null;

function createCardDialog() {
	$( "#dialog-form-card" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Create a card": function() {
					var bValid = true;
					var cardTitle = $("#card-title");
					var cardDescription = $("#card-description");
					var allFields = $( [] ).add( cardTitle ).add( cardDescription )
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkLength( $( ".validateCardTips" ), cardTitle, "card-title", 3, 16 );
					bValid = bValid && checkRegexp( $( ".validateCardTips" ), cardTitle, /^[a-z]([0-9a-z_ ])+$/i, "Title may consist of a-z, 0-9, underscores, begin with a letter." );

					if ( bValid ) {
						if ( currentCardId == null ) {
							addCard( 4, 250, 250, cardTitle.val(), cardDescription.val() );
						} else {
							$("#card-" + currentCardId + "-title").text($( "#card-title" ).val() );
							$("#card-" + currentCardId + "-description").text($( "#card-description" ).val( ) );	
						}
							
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				var cardTitle = $("#card-title");
				var cardDescription = $("#card-description");
				var allFields = $( [] ).add( cardTitle ).add( cardDescription )
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
}	

function addCard( id, top, left, title, description ) {
	var cardId = nextCardId++;
	string = "" +
			"<div id='card-" + cardId + "' class='card shadow' style='top: " + top + "px;left: " + left + "px;'>" +
				"<div class='line' style='top: 25px;'>&nbsp;</div>" +
				"<div class='line' style='top: 41px;'>&nbsp;</div>" +
				"<div class='line' style='top: 57px;'>&nbsp;</div>" +
				"<div class='line' style='top: 73px;'>&nbsp;</div>" +
				"<div class='line' style='top: 89px;'>&nbsp;</div>" +
				"<div class='line' style='top: 105px;'>&nbsp;</div>" +
				"<div class='title' id='card-" + cardId + "-title'>" + title + "</div>" +
				"<div class='body' id='card-" + cardId + "-description'>" + description + "</div>" +
				"</div>";

	$( '#card-layout' ).append( string );
	var cardId = "#card-" + cardId;
	$( cardId ).draggable({
		stop: function( event, ui ) {
			alert( $(cardId + "-title").text() );
			updateCardToServer( 16, ui.position.top, ui.position.left, $(cardId + "-title").text(), $(cardId + "-description").text() );
		}
	});
	$( cardId ).mouseover( function() {
		$( cardId ).addClass( "highlight" ) })
		.mouseout( function() {
		$( cardId ).removeClass( "highlight" ) })
	;


	$( "#card-" + cardId )
				.click(function() {
					currentCardId = cardId;
					$( "#card-title" ).val( $("#card-" + cardId + "-title").text() );	
					$( "#card-description" ).val( $("#card-" + cardId + "-description").text() );	
					$( "#ui-dialog-title-dialog-form-card" ).text( "Update Card" );
					$( "#dialog-form-card" ).dialog( "open" );
				});
}

/*********************************************************************************************/

/*********************************************************************************************/
/* Note */
var nextNoteId = 0;
var currentNoteId = null;

function createNoteDialog() {
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

					bValid = bValid && checkLength( $( ".validateNoteTips" ), noteDescription, "note-description", 1, 2000 );

					if ( bValid ) {
						if ( currentNoteId == null ) {
							addNote( 4, 250, 400, noteDescription.val() );
						} else {
							$("#note-" + currentNoteId).text( noteDescription.val() );
							putMsgToServer( '{ "description": "' + noteDescription.val() + '" }' );
						}
						$( this ).dialog( "close" );
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				var noteDescription = $("#note-description");
				var allFields = $( [] ).add( noteDescription )
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});
	}
	
function addNote( id, top, left, description ) {
	var noteId = nextNoteId++;
	string = "" +
			"<div id='note-" + noteId + "' class='note shadow' style='top: " + top + "px;left: " + left + "px;'>" +
				description +
				"</div>";

	$( '#card-layout' ).append( string );
	addInteraction( "#note-" + noteId );

	$( "#note-" + noteId )
				.click(function() {
					currentNoteId = noteId;
					$( "#note-description" ).val( $("#note-" + noteId).text() );	
					$( "#ui-dialog-title-dialog-form-note" ).text( "Update Note" );
					$( "#dialog-form-note" ).dialog( "open" );
				});
}
/*********************************************************************************************/
function createDialogs() {
	createCardDialog();
	createNoteDialog();
	createSplitDialog();

	$( "#create-card" )
				.button()
				.click(function() {
					$( "#ui-dialog-title-dialog-form-card" ).text( "Create a Card" );
					$( "#dialog-form-card" ).dialog( "open" );
				});
	$( "#create-note" )
				.button()
				.click(function() {
					currentNoteId = null;
					$( "#ui-dialog-title-dialog-form-note" ).text( "Create a Note" );
					$( "#dialog-form-note" ).dialog( "open" );
				});
	$( "#create-split" )
				.button()
				.click(function() {
					currentSplitId = null;
					$( "#ui-dialog-title-dialog-form-split" ).text( "Create a Split" );
					$( "#dialog-form-split" ).dialog( "open" );
				});
	}
	