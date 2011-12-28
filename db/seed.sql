INSERT INTO document_tbl( id, title )
	VALUES ( NEXTVAL( 'document_seq' ), 'Repro Hub' );

INSERT INTO card_tbl( id, document_id, top, left_, title, description )
	VALUES ( NEXTVAL( 'card_seq' ), CURRVAL( 'document_seq' ), 100, 100, 'Repro Hub', 'This is some blurb about Repro hub that will cut across multiple lines which is good.<br><br>List' );
INSERT INTO card_tbl( id, document_id, top, left_, title, description )
	VALUES ( NEXTVAL( 'card_seq' ), CURRVAL( 'document_seq' ), 200, 200, 'New ONE', 'Description' );

INSERT INTO note_tbl( id, document_id, top, left_, description )
	VALUES ( NEXTVAL( 'note_seq' ), CURRVAL( 'document_seq' ), 50, 50, 'This is a note which is also quite handy dandy' );
INSERT INTO note_tbl( id, document_id, top, left_, description )
	VALUES ( NEXTVAL( 'note_seq' ), CURRVAL( 'document_seq' ), 150, 250, 'This is another note' );

INSERT INTO split_tbl( id, document_id, top, upper, lower )
	VALUES ( NEXTVAL( 'split_seq' ), CURRVAL( 'document_seq' ), 300, 'Existing', 'New' );
