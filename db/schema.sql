USE hx7hw1d9o9yvnc7h;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	username varchar(100),
    email varchar(100) NOT NULL,
	pw varchar(100) NOT NULL,
	firstname varchar(100),
	lastname varchar(100),
	PRIMARY KEY (id)
);
