drop database if exists employ_db;
create database employ_db;
use employ_db;

create table department (

id INT auto_increment KEY,
dept_name  VARCHAR(30)
);

create table emplrole (

id INT auto_increment PRIMARY KEY,
title  VARCHAR(30),  -- to hold role title
salary DECIMAL, -- to hold role salary 
department_id INT -- to hold reference to department role belongs to 
);

create table employee (

id  INT auto_increment PRIMARY KEY,
emp_name  VARCHAR(30), -- to hold employee first name

role_id  INT, -- to hold reference to role employee has
manager_id  INT -- to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
);