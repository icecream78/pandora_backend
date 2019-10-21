-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database:
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
-- Current Database: `lights_db`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lights_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `lights_db`;

--
-- Table structure for table `light_states`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `light_states` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `light_switch_state`
--

/*!40000 ALTER TABLE `light_switch_state` DISABLE KEYS */;
INSERT INTO `light_switch_state` VALUES (1,1,8,1);
INSERT INTO `light_switch_state` VALUES (2,1,9,1);
INSERT INTO `light_switch_state` VALUES (3,1,10,1);
INSERT INTO `light_switch_state` VALUES (4,1,11,1);
INSERT INTO `light_switch_state` VALUES (5,1,13,1);
INSERT INTO `light_switch_state` VALUES (6,1,16,1);
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
  `address` text NOT NULL,
  `initial_state` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lights_name_uindex` (`name`),
  KEY `lights_manufacturares_id_fk` (`manufacturer_id`),
  KEY `lights_light_states_id_fk` (`initial_state`),
  CONSTRAINT `lights_light_states_id_fk` FOREIGN KEY (`initial_state`) REFERENCES `light_states` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `lights_manufacturares_id_fk` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturares` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturares`
--

/*!40000 ALTER TABLE `manufacturares` DISABLE KEYS */;
INSERT INTO `manufacturares` VALUES (1,'Kaluga Astral');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'God');
INSERT INTO `roles` VALUES (2,'Man');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'faker_nickname','faker','b340ffd07e2b8538727eb2fd78c2dda8915bb7388774a83c3694648e246c9112',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-19 22:18:45
