-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: biogarden
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) unsigned NOT NULL,
  `id_user` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_cart_UNIQUE` (`id`),
  KEY `fk_carts_users1_idx` (`id_user`),
  CONSTRAINT `fk_carts_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts_details`
--

DROP TABLE IF EXISTS `carts_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_cart` int(11) unsigned NOT NULL,
  `quantity` int(11) unsigned NOT NULL,
  `partial_amount` decimal(10,0) unsigned NOT NULL,
  `id_product` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`,`id_cart`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_carts_details_carts1_idx` (`id_cart`),
  KEY `fk_carts_details_products1_idx` (`id_product`),
  CONSTRAINT `fk_carts_details_carts1` FOREIGN KEY (`id_cart`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_details_products1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts_details`
--

LOCK TABLES `carts_details` WRITE;
/*!40000 ALTER TABLE `carts_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cities` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_state` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_cities_states1_idx` (`id_state`),
  CONSTRAINT `fk_cities_states1` FOREIGN KEY (`id_state`) REFERENCES `states` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Palermo',2),(2,'Quilmes',1),(3,'Berazategui',1),(4,'Villa Urquiza',2),(5,'Córdoba Capital',3),(6,'Monte Cristo',3);
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colours`
--

DROP TABLE IF EXISTS `colours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `colours` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `hexadecimal` char(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colours`
--

LOCK TABLES `colours` WRITE;
/*!40000 ALTER TABLE `colours` DISABLE KEYS */;
INSERT INTO `colours` VALUES (1,'Rojo','FF0000'),(2,'Verde','00FF00'),(3,'Amarillo','FFFF00'),(4,'Negro','000000'),(5,'Blanco','FFFFFF'),(6,'Azul','0000FF'),(7,'no aplica','no apl');
/*!40000 ALTER TABLE `colours` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `comment` text NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacts` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `comment` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `countries`
--

DROP TABLE IF EXISTS `countries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `countries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_country_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='	';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `countries`
--

LOCK TABLES `countries` WRITE;
/*!40000 ALTER TABLE `countries` DISABLE KEYS */;
INSERT INTO `countries` VALUES (1,'Argentina'),(2,'Brasil'),(3,'Chile'),(4,'Uruguay');
/*!40000 ALTER TABLE `countries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) unsigned NOT NULL,
  `address` varchar(45) NOT NULL,
  `id_user` int(11) unsigned NOT NULL,
  `id_payment_method` int(11) unsigned NOT NULL,
  `id_city` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_orders_users1_idx` (`id_user`),
  KEY `fk_orders_payments_methods1_idx` (`id_payment_method`),
  KEY `fk_orders_cities1_idx` (`id_city`),
  CONSTRAINT `fk_orders_cities1` FOREIGN KEY (`id_city`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_payments_methods1` FOREIGN KEY (`id_payment_method`) REFERENCES `payments_methods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_users1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders_details`
--

DROP TABLE IF EXISTS `orders_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_order` int(11) unsigned NOT NULL,
  `quantity` int(11) unsigned NOT NULL,
  `partial_amount` decimal(10,2) unsigned NOT NULL,
  `id_product` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`,`id_order`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_orders_details_orders1_idx` (`id_order`),
  KEY `fk_orders_details_products1_idx` (`id_product`),
  CONSTRAINT `fk_orders_details_orders1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_orders_details_products1` FOREIGN KEY (`id_product`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders_details`
--

LOCK TABLES `orders_details` WRITE;
/*!40000 ALTER TABLE `orders_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments_methods`
--

DROP TABLE IF EXISTS `payments_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments_methods` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_methods`
--

LOCK TABLES `payments_methods` WRITE;
/*!40000 ALTER TABLE `payments_methods` DISABLE KEYS */;
INSERT INTO `payments_methods` VALUES (1,'Efectivo'),(2,'Tarjeta de débito'),(3,'Tarjeta de crédito'),(4,'Mercado Pago');
/*!40000 ALTER TABLE `payments_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_permission_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'CREATE_PRODUCT'),(2,'EDIT_PRODUCT'),(3,'SET_ADMIN_USER'),(4,'BUY_PRODUCT');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `price` decimal(10,2) unsigned NOT NULL,
  `image` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `id_category` int(11) unsigned NOT NULL,
  `id_colour` int(11) unsigned DEFAULT NULL,
  `id_size` int(11) unsigned DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `status` tinyint(1) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_products_products_categories1_idx` (`id_category`),
  KEY `fk_products_colours1_idx` (`id_colour`),
  KEY `fk_products_sizes1_idx` (`id_size`),
  CONSTRAINT `fk_products_colours1` FOREIGN KEY (`id_colour`) REFERENCES `colours` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_products_categories1` FOREIGN KEY (`id_category`) REFERENCES `products_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_sizes1` FOREIGN KEY (`id_size`) REFERENCES `sizes` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Suculentas variadas',759.99,'product_1.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,7,6,10,1),(2,'Suculenta chica',599.99,'product_2.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,NULL,1,10,1),(3,'Planta de interior',1299.99,'product_3.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,NULL,3,10,1),(4,'Planta acuática',1400.00,'product_4.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,NULL,3,10,1),(5,'Planta acuática',899.99,'product_5.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,NULL,2,10,1),(6,'Planta de exterior',1799.99,'product_6.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',1,NULL,4,10,1),(7,'Suculentas deco',849.99,'product_7.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',2,5,2,10,1),(8,'Maceta estilo terrario',1299.99,'product_8.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',2,5,3,10,1),(9,'Taller de suculentas - Principiantes',1500.00,'product_9.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',3,NULL,NULL,10,1),(10,'Taller de decoración - Principiantes',2000.00,'product_10.jpg','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec leo lacus, consequat dictum volutpat nec, feugiat quis lorem. Maecenas ornare arcu in massa tincidunt, in scelerisque nisl venenatis. Proin augue orci, convallis quis accumsan eget, euismod quis mi. Donec tristique porttitor laoreet. Etiam efficitur, leo sed condimentum blandit, massa purus.',3,NULL,NULL,10,1),(11,'Bandeja Arce',1000.00,'product_11.jpg','DESCRIPCIÓN:\r\nBandeja de fibras naturales con agarraderas. Producto importado.\r\nMEDIDAS:\r\nCHICA: 40x8cm\r\nGRANDE: 45X9cm',2,5,3,2,1),(12,'Home spray botanico',400.00,'product_12.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 250cc. Vienen en bolsita de tela.',2,5,3,4,1),(13,'Home spray botanico',300.00,'product_1611706607181.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 350cc. Vienen en bolsita de tela.',2,6,3,2,0),(14,'Home spray botanico',400.00,'product_1611706716894.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 550cc. Vienen en bolsita de tela.',2,5,2,2,0),(15,'Home spray botanico',300.00,'product_1611706879638.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 650cc. Vienen en bolsita de tela.',2,5,1,2,0),(16,'Home spray botanico',300.00,'product_1611707199759.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 750cc. Vienen en bolsita de tela.',2,5,1,2,0),(17,'Home spray botanico',300.00,'product_1611707516377.jpg','Difusor home spray ideal para ambientes y textiles. Envase pet de 850cc. Vienen en bolsita de tela.',2,5,2,2,0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_categories`
--

DROP TABLE IF EXISTS `products_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_categories`
--

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;
INSERT INTO `products_categories` VALUES (1,'Plantas'),(2,'Decoración'),(3,'Workshops');
/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sizes`
--

DROP TABLE IF EXISTS `sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sizes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_size_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sizes`
--

LOCK TABLES `sizes` WRITE;
/*!40000 ALTER TABLE `sizes` DISABLE KEYS */;
INSERT INTO `sizes` VALUES (1,'XS'),(2,'S'),(3,'M'),(4,'L'),(5,'XL'),(6,'no aplica');
/*!40000 ALTER TABLE `sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `states`
--

DROP TABLE IF EXISTS `states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `states` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `id_country` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_states_countries1_idx` (`id_country`),
  CONSTRAINT `fk_states_countries1` FOREIGN KEY (`id_country`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `states`
--

LOCK TABLES `states` WRITE;
/*!40000 ALTER TABLE `states` DISABLE KEYS */;
INSERT INTO `states` VALUES (1,'Buenos Aires',1),(2,'Capital Federal',1),(3,'Córdoba',1);
/*!40000 ALTER TABLE `states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `id_category` int(11) unsigned NOT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_user_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_user_categories1_idx` (`id_category`),
  CONSTRAINT `fk_users_user_categories1` FOREIGN KEY (`id_category`) REFERENCES `users_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','Biogarden','admin@biogarden.com','$2b$12$UQYWx.n4nGJ6xsuI51pdguuFjtdw4RM1Mp6t0698xuSoKJ6KncqYu',2,'admin@biogarden.com.jpg'),(2,'Roberto','Gomez','rgomez@gmail.com','$2b$12$sURo4ZfiBkN6uZ6rDSBRFeymn/MuFT1m7Aw2so7vSLybz9U3/.peO',1,'rgomez@gmail.com.jpg'),(3,'Martina','Torres','mtorres@gmail.com','$2b$12$RD9Mg13/2CGyD9DrpMjBLewEskVrOYxHO1SER8hvGmQnK3KlFt5dW',1,'mtorres@gmail.com.jpg'),(4,'florencia','bornancini','fbornancini@hotmail.com','$2b$12$ftiE2NgXaE7UeayefI46U.66E6B6IjZVyh15vht55quCQHko.WqWu',1,'fbornancini@hotmail.com.svg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories`
--

DROP TABLE IF EXISTS `users_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_category_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories`
--

LOCK TABLES `users_categories` WRITE;
/*!40000 ALTER TABLE `users_categories` DISABLE KEYS */;
INSERT INTO `users_categories` VALUES (1,'customer'),(2,'admin');
/*!40000 ALTER TABLE `users_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_categories_permissions`
--

DROP TABLE IF EXISTS `users_categories_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_categories_permissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `id_category` int(11) unsigned NOT NULL,
  `id_permission` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_category_permission_UNIQUE` (`id`),
  KEY `fk_users_categories_permissions_permissions1_idx` (`id_permission`),
  KEY `fk_users_categories_permissions_users_categories1_idx` (`id_category`),
  CONSTRAINT `fk_users_categories_permissions_permissions1` FOREIGN KEY (`id_permission`) REFERENCES `permissions` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_categories_permissions_user_categories1` FOREIGN KEY (`id_category`) REFERENCES `users_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_categories_permissions`
--

LOCK TABLES `users_categories_permissions` WRITE;
/*!40000 ALTER TABLE `users_categories_permissions` DISABLE KEYS */;
INSERT INTO `users_categories_permissions` VALUES (1,1,4),(2,2,1),(3,2,2),(4,2,3);
/*!40000 ALTER TABLE `users_categories_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-29  0:26:53
