DROP DATABASE IF EXISTS test_cs;

CREATE DATABASE test_cs;

use test_cs;

CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  due_date VARCHAR(255),
  todo_text VARCHAR(255),
  reminder BIT
);