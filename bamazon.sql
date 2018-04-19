DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INTEGER(10),
  stock_quantity INTEGER(10),
  PRIMARY KEY (id)
  
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beer", "Grocery", 10, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wine", "Grocery", 20, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rum", "Grocery", 30, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone", "Electronics", 500, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 1000, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Computer", "Electronics", 850, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shirts", "Clothing", 5, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 25, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socks", "Clothing", 8, 45);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Shoes", "Clothing", 60, 30);

SELECT * FROM products; 