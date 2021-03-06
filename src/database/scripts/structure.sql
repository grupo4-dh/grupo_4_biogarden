-- MySQL Script generated by MySQL Workbench
-- Fri Jan 29 00:27:43 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema biogarden
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `biogarden` ;

-- -----------------------------------------------------
-- Schema biogarden
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `biogarden` DEFAULT CHARACTER SET utf8 ;
USE `biogarden` ;

-- -----------------------------------------------------
-- Table `biogarden`.`users_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`users_categories` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`users_categories` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_category_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`users` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`users` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `id_category` INT(11) UNSIGNED NOT NULL,
  `avatar` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_user_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_user_categories1_idx` (`id_category` ASC),
  CONSTRAINT `fk_users_user_categories1`
    FOREIGN KEY (`id_category`)
    REFERENCES `biogarden`.`users_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`carts` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`carts` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `create_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `total_amount` DECIMAL(10,2) UNSIGNED NOT NULL,
  `id_user` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_cart_UNIQUE` (`id` ASC),
  INDEX `fk_carts_users1_idx` (`id_user` ASC),
  CONSTRAINT `fk_carts_users1`
    FOREIGN KEY (`id_user`)
    REFERENCES `biogarden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`colours`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`colours` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`colours` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `hexadecimal` CHAR(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`products_categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`products_categories` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`products_categories` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`sizes` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`sizes` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_size_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`products` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`products` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `price` DECIMAL(10,2) UNSIGNED NOT NULL,
  `image` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `id_category` INT(11) UNSIGNED NOT NULL,
  `id_colour` INT(11) UNSIGNED NULL DEFAULT NULL,
  `id_size` INT(11) UNSIGNED NULL DEFAULT NULL,
  `quantity` INT(11) NOT NULL,
  `status` TINYINT(1) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_products_products_categories1_idx` (`id_category` ASC),
  INDEX `fk_products_colours1_idx` (`id_colour` ASC),
  INDEX `fk_products_sizes1_idx` (`id_size` ASC),
  CONSTRAINT `fk_products_colours1`
    FOREIGN KEY (`id_colour`)
    REFERENCES `biogarden`.`colours` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_products_categories1`
    FOREIGN KEY (`id_category`)
    REFERENCES `biogarden`.`products_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_sizes1`
    FOREIGN KEY (`id_size`)
    REFERENCES `biogarden`.`sizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 19
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`carts_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`carts_details` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`carts_details` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_cart` INT(11) UNSIGNED NOT NULL,
  `quantity` INT(11) UNSIGNED NOT NULL,
  `partial_amount` DECIMAL(10,0) UNSIGNED NOT NULL,
  `id_product` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `id_cart`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_carts_details_carts1_idx` (`id_cart` ASC),
  INDEX `fk_carts_details_products1_idx` (`id_product` ASC),
  CONSTRAINT `fk_carts_details_carts1`
    FOREIGN KEY (`id_cart`)
    REFERENCES `biogarden`.`carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_details_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `biogarden`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`countries`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`countries` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`countries` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_country_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COMMENT = '	';


-- -----------------------------------------------------
-- Table `biogarden`.`states`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`states` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`states` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `id_country` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_states_countries1_idx` (`id_country` ASC),
  CONSTRAINT `fk_states_countries1`
    FOREIGN KEY (`id_country`)
    REFERENCES `biogarden`.`countries` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`cities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`cities` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`cities` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `id_state` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_cities_states1_idx` (`id_state` ASC),
  CONSTRAINT `fk_cities_states1`
    FOREIGN KEY (`id_state`)
    REFERENCES `biogarden`.`states` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`comments` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`comments` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `comment` TEXT NOT NULL,
  `email` VARCHAR(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `biogarden`.`contacts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`contacts` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`contacts` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `biogarden`.`payments_methods`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`payments_methods` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`payments_methods` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`orders` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`orders` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `create_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `total_amount` DECIMAL(10,2) UNSIGNED NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `id_user` INT(11) UNSIGNED NOT NULL,
  `id_payment_method` INT(11) UNSIGNED NOT NULL,
  `id_city` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_orders_users1_idx` (`id_user` ASC),
  INDEX `fk_orders_payments_methods1_idx` (`id_payment_method` ASC),
  INDEX `fk_orders_cities1_idx` (`id_city` ASC),
  CONSTRAINT `fk_orders_cities1`
    FOREIGN KEY (`id_city`)
    REFERENCES `biogarden`.`cities` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_payments_methods1`
    FOREIGN KEY (`id_payment_method`)
    REFERENCES `biogarden`.`payments_methods` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users1`
    FOREIGN KEY (`id_user`)
    REFERENCES `biogarden`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`orders_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`orders_details` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`orders_details` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_order` INT(11) UNSIGNED NOT NULL,
  `quantity` INT(11) UNSIGNED NOT NULL,
  `partial_amount` DECIMAL(10,2) UNSIGNED NOT NULL,
  `id_product` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `id_order`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_orders_details_orders1_idx` (`id_order` ASC),
  INDEX `fk_orders_details_products1_idx` (`id_product` ASC),
  CONSTRAINT `fk_orders_details_orders1`
    FOREIGN KEY (`id_order`)
    REFERENCES `biogarden`.`orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_details_products1`
    FOREIGN KEY (`id_product`)
    REFERENCES `biogarden`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`permissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`permissions` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`permissions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_permission_UNIQUE` (`id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `biogarden`.`users_categories_permissions`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `biogarden`.`users_categories_permissions` ;

CREATE TABLE IF NOT EXISTS `biogarden`.`users_categories_permissions` (
  `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_category` INT(11) UNSIGNED NOT NULL,
  `id_permission` INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_category_permission_UNIQUE` (`id` ASC),
  INDEX `fk_users_categories_permissions_permissions1_idx` (`id_permission` ASC),
  INDEX `fk_users_categories_permissions_users_categories1_idx` (`id_category` ASC),
  CONSTRAINT `fk_users_categories_permissions_permissions1`
    FOREIGN KEY (`id_permission`)
    REFERENCES `biogarden`.`permissions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_categories_permissions_user_categories1`
    FOREIGN KEY (`id_category`)
    REFERENCES `biogarden`.`users_categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
