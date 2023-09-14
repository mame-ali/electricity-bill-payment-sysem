-- Active: 1692948525383@@127.0.0.1@3333@evangadiforem2
DROP DATABASE IF EXISTS `enate`;
CREATE DATABASE `enate`;
USE `enate`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` ENUM('super', 'casher', 'operator', 'guest') NOT NULL
);

CREATE TABLE IF NOT EXISTS `profile` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT NOT NULL,
  `f_name` VARCHAR(45) NOT NULL,
  `m_name` VARCHAR(45) NOT NULL,
  `l_name` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(13) NOT NULL,
  `image_url` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
);