CREATE SEQUENCE document_seq;
CREATE SEQUENCE card_seq;
CREATE SEQUENCE note_seq;
CREATE SEQUENCE split_seq;

CREATE TABLE document_tbl (
	id BIGINT NOT NULL,
	title VARCHAR(1024) NOT NULL,
	CONSTRAINT document_pk PRIMARY KEY ( id ) );

CREATE TABLE card_tbl (
	id BIGINT NOT NULL,
	document_id BIGINT NOT NULL,
	top BIGINT NOT NULL,
	left_ BIGINT NOT NULL,
	title VARCHAR(1024) NOT NULL,
	description VARCHAR(5096),
	CONSTRAINT card_pk PRIMARY KEY ( id ),
	CONSTRAINT card_document_fk FOREIGN KEY (document_id) REFERENCES document_tbl( id ) );

CREATE TABLE note_tbl (
	id BIGINT NOT NULL,
	document_id BIGINT NOT NULL,
	top BIGINT NOT NULL,
	left_ BIGINT NOT NULL,
	description VARCHAR(5096),
	CONSTRAINT note_pk PRIMARY KEY ( id ),
	CONSTRAINT card_document_fk FOREIGN KEY (document_id) REFERENCES document_tbl( id ) );

CREATE TABLE split_tbl (
	id BIGINT NOT NULL,
	document_id BIGINT NOT NULL,
	top BIGINT NOT NULL,
	upper VARCHAR(1024),
	lower VARCHAR(1024),
	CONSTRAINT split_pk PRIMARY KEY ( id ),
	CONSTRAINT card_document_fk FOREIGN KEY (document_id) REFERENCES document_tbl( id ) );
