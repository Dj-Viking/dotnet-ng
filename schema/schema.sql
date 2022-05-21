DROP DATABASE IF EXISTS test_cs;

CREATE DATABASE test_cs;

use test_cs;

CREATE TABLE todos (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  due_date VARCHAR(255),
  todo_text VARCHAR(255),
  reminder BIT
);

CREATE TABLE users (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  user_pass VARCHAR(1024) NOT NULL,
  user_role VARCHAR(255) NULL,
  todo_id INT UNSIGNED,
  INDEX todo_id (todo_id),
    CONSTRAINT fk_role 
    FOREIGN KEY (todo_id) 
    REFERENCES todos(id) 
    ON DELETE SET NULL,
  salt VARCHAR(255) NOT NULL,
  token VARCHAR(1024) NULL
);