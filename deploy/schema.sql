-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: lights_db
-- ------------------------------------------------------
-- Server version	5.7.28

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
-- Table structure for table `light_states`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_states`
--

/*!40000 ALTER TABLE `light_states` DISABLE KEYS */;
INSERT INTO `light_states` VALUES (1,'On');
INSERT INTO `light_states` VALUES (2,'Off');
/*!40000 ALTER TABLE `light_states` ENABLE KEYS */;

--
-- Table structure for table `light_switch_state`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_switch_state` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `state_id` int(11) NOT NULL,
  `light_id` int(11) NOT NULL,
  `access_user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `light_switch_state_light_states_id_fk` (`state_id`),
  KEY `light_switch_state_lights_id_fk` (`light_id`),
  KEY `light_switch_state_users_id_fk` (`access_user_id`),
  CONSTRAINT `light_switch_state_light_states_id_fk` FOREIGN KEY (`state_id`) REFERENCES `light_states` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `light_switch_state_lights_id_fk` FOREIGN KEY (`light_id`) REFERENCES `lights` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `light_switch_state_users_id_fk` FOREIGN KEY (`access_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_switch_state`
--

/*!40000 ALTER TABLE `light_switch_state` DISABLE KEYS */;
INSERT INTO `light_switch_state` VALUES (1,2,8,1);
INSERT INTO `light_switch_state` VALUES (2,2,9,1);
INSERT INTO `light_switch_state` VALUES (3,1,10,1);
INSERT INTO `light_switch_state` VALUES (4,2,11,1);
INSERT INTO `light_switch_state` VALUES (5,1,13,1);
INSERT INTO `light_switch_state` VALUES (6,2,16,1);
INSERT INTO `light_switch_state` VALUES (7,2,17,2);
INSERT INTO `light_switch_state` VALUES (8,2,18,2);
INSERT INTO `light_switch_state` VALUES (9,2,19,2);
/*!40000 ALTER TABLE `light_switch_state` ENABLE KEYS */;

--
-- Table structure for table `lights`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lights` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  `manufacturer_id` int(11) NOT NULL,
  `address` mediumtext NOT NULL,
  `initial_state` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lights_name_uindex` (`name`),
  KEY `lights_manufacturares_id_fk` (`manufacturer_id`),
  KEY `lights_light_states_id_fk` (`initial_state`),
  CONSTRAINT `lights_light_states_id_fk` FOREIGN KEY (`initial_state`) REFERENCES `light_states` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `lights_manufacturares_id_fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturares` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lights`
--

/*!40000 ALTER TABLE `lights` DISABLE KEYS */;
INSERT INTO `lights` VALUES (1,'svetilnik1',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (5,'svetilnik22',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (8,'svetilnik23',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (9,'svetilnik24',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (10,'svetilnik25',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (11,'svetilnik26',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (13,'svetilnik27',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (16,'svetilnik29',1,'Cialkovskogo 4',1);
INSERT INTO `lights` VALUES (17,'tovar 123',1,'kaluga 1',2);
INSERT INTO `lights` VALUES (18,'toovar2',1,'kasdkaslda',2);
INSERT INTO `lights` VALUES (19,'tovar3',1,'dasdas',2);
/*!40000 ALTER TABLE `lights` ENABLE KEYS */;

--
-- Table structure for table `manufacturares`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `manufacturares` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturares`
--

/*!40000 ALTER TABLE `manufacturares` DISABLE KEYS */;
INSERT INTO `manufacturares` VALUES (1,'Kaluga Astral');
INSERT INTO `manufacturares` VALUES (2,'Pandora');
/*!40000 ALTER TABLE `manufacturares` ENABLE KEYS */;

--
-- Table structure for table `roles`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Администратор');
INSERT INTO `roles` VALUES (2,'Менеджер');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;

--
-- Table structure for table `users`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` char(255) NOT NULL,
  `login` char(255) NOT NULL,
  `password` char(64) NOT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_login_uindex` (`login`),
  KEY `users_roles_id_fk` (`role_id`),
  CONSTRAINT `users_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'faker_nickname','faker','b340ffd07e2b8538727eb2fd78c2dda8915bb7388774a83c3694648e246c9112',1);
INSERT INTO `users` VALUES (2,'Петя','user1','590723609fa552658d3fc7aad1d720245b3e5bd904e6d59b0e4433b4b5c749b4',2);
INSERT INTO `users` VALUES (3,'Admin','admin','1fd849baf9cc24c3c13f83005d8c2072c844e426458480e8e9d47aea721a748c',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-21 22:16:05
