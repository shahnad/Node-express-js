-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: awesome-pen
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(30) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `profile_pic` text,
  `gender` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `user_type` varchar(100) DEFAULT NULL,
  `bio` longtext,
  `coverPic` text,
  `created_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updated_at` text,
  `starWriters` varchar(15) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sabithariyas@yopmail.com','സബിതാ റിയാസ് ','$2b$12$lgYm9T/4jN66rYqLRFbUu.LHVwukq0sLLLdU6fzvHioApfyImzwZW','http://localhost:4000/images/1643049011258-574813527-images (1).jpg','male','8592932234',NULL,'\nകഥകൾ കേൾക്കാനും  വായിക്കാനും  ഇഷ്ടമില്ലാത്തവരായി ആരുണ്ട് ഇവിടെ.... നമ്മുടെ കഥ തീരും വരെ നമ്മൾ കഥകൾക്കായി കാത്തിരിക്കുന്നു.. കഥയില്ലാത്തവർ എന്നു മുദ്ര കുത്തപ്പെട്ടവർക്ക് പോലും ആ കഥയില്ലായ്മയ്ക്കുള്ളിൽ ഒരു കഥ പറയാനുണ്ടാകും .... കഥകൾ ഇഷ്ടമുള്ളവർക്കായി  ഞാൻ ഈ ചുവരിൽ   എഴുതുന്നു,,... ','http://localhost:4000/images/1643049011260-390966290-905c519c8f410cf18f5e6c6ef57a789b.jpg','2022-01-24 18:30:13.406605','2022-01-25 00:00:13','0'),(2,'nshahnad90@gmail.com','shahnad','$2b$12$22DhgV7wvWdYnI16.i84MOmEJwyTWSTx7OEcWwuC1LsTZKlWfw7oC','http://localhost:4000/images/1643027170240-222944057-images (1).jpg',NULL,NULL,NULL,NULL,NULL,'2022-01-24 12:26:12.450000','2022-01-24 17:56:12','0');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-25  0:04:51
