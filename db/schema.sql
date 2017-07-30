-- USE auth_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
	pw varchar(100) NOT NULL,
	firstname varchar(100) NOT NULL,
	lastname varchar(100) NOT NULL,
	PRIMARY KEY (id)
);
