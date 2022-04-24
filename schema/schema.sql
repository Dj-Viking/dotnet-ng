DROP DATABASE IF EXISTS test_cs;

CREATE DATABASE test_cs;

use test_cs;

CREATE TABLE todos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  day_date datetime,
  todo_text VARCHAR(255),
  reminder BIT,
);