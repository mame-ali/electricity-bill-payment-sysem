DROP DATABASE IF EXISTS `utility`;
CREATE DATABASE `utility`;
USE `utility`;

DROP TABLE USERS;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_email` VARCHAR(45) NOT NULL,
  `user_active_status` int NOT NULL,
  `user_registration_data` Datetime not null,
   UNIQUE KEY (user_email));

CREATE TABLE IF NOT EXISTS `users_password`(
`user_password_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`user_id` INT NOT NULL,
`user_password` VARCHAR(45) NOT NULL,
`user_password_created_date` datetime not null,
 FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `users_info` (
  `user_info_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `m_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(13) NOT NULL,
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
);

CREATE TABLE IF NOT EXISTS `org_role` (
`org_role_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`org_rol_name`  VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS `users_role` (
`user_role_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`org_role_id` INT NOT NULL,
`user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`),
      FOREIGN KEY (`org_role_id`)
    REFERENCES `org_role` (`org_role_id`)
);

CREATE TABLE IF NOT EXISTS `users_profile` (
`user_profile_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`user_id` INT NOT NULL,
`user_profile_image` varchar(255),
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
);


CREATE TABLE IF NOT EXISTS `electric_meter`(
`electric_meter_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`account_number` varchar(15) not null,
`user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
);
CREATE TABLE IF NOT EXISTS `electric_meter_address`(
`electric_meter_address_id`  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`electric_meter_id` INT NOT NULL,
`region` varchar(255) not null,
`zone` varchar(255) not null,
`wereda` varchar(255) not null,
`subcity` varchar(255) not null,
`kebele` varchar(255) not null,
`house_number` varchar(255) not null,
  FOREIGN KEY (`electric_meter_id`)
    REFERENCES `electric_meter` (`electric_meter_id`)
);

CREATE TABLE IF NOT EXISTS `meter_read`(
`meter_reads_id`  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`electric_meter_id` INT NOT NULL,
`user_id` INT NOT NULL,
`read_data`  varchar(10) not null,
`month`  varchar(255) not null,
`read_data` Datetime not null,
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`),
     FOREIGN KEY (`electric_meter_id`)
    REFERENCES `electric_meter` (`electric_meter_id`)
);

CREATE TABLE IF NOT EXISTS `biils`(
`bill_id`  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`electric_meter_id` INT NOT NULL,
`bill_month`  varchar(255) not null,
`bill_status`  int not null,
`ec_range`  int not null,
`bill_amount` double(10,2) not null,
  FOREIGN KEY (`electric_meter_id`)
    REFERENCES `electric_meter` (`electric_meter_id`)
);


