create database network_mayo;
use network_mayo;
CREATE TABLE accounts(
   username   varchar(255)              NOT NULL,
   password varchar(255)     NOT NULL,
   PRIMARY KEY (username)
);
CREATE TABLE posts(
   username   varchar(255)              NOT NULL,
   post varchar(1000)     NOT NULL,
   datetime datetime not null
);
CREATE TABLE followers(
   username   varchar(255)              NOT NULL,
   follow varchar(255)     NOT NULL
);

