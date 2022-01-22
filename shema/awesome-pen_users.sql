CREATE DATABASE  IF NOT EXISTS `awesome-pen` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `awesome-pen`;
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
  `email` varchar(30) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `profile_pic` text NOT NULL,
  `gender` varchar(10) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `user_type` varchar(100) NOT NULL,
  `bio` longtext,
  `coverPic` text,
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `updated_at` text NOT NULL,
  `starWriters` varchar(15) DEFAULT '0',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'sajeena@yopmail.com','','$2b$12$LMlCsxvFQP0Xck9L.cKLMu8/ZDiJ6hj9IinreOPb8EmUq4u3Wchlu','','male','','1',NULL,NULL,'2022-01-22 08:57:00.759350','2021-10-27 12:52:59.044000','1'),(5,'Thasni@yopmail.com','','123123','','male','','1',NULL,NULL,'2022-01-22 08:57:00.766353','','1'),(7,'aazmi@yopmail.com','','123123','','male','','1',NULL,NULL,'2022-01-22 08:57:00.767680','1','1'),(11,'dhanya@yopmail.com','','$2b$12$Vj0heufsDjQqbU/aQ1nYbOg','','female','','1',NULL,NULL,'2021-11-25 12:30:43.487437','2021-10-27 11:45:03.147000','0'),(14,'maya@yopmail.com','','$2b$12$T1FNwh9RdmsqYaml8emdkOI1jQijlOBeFeTDIEgklc3','','female','','1',NULL,NULL,'2022-01-22 08:57:00.768696','2021-10-27 12:38:26.497000','1'),(15,'arya1@yopmail.com','','$2b$12$B2GmpqGv/aXzadOBHPSt9uTuzysQTJ/WS2D.XtckVQYEYlaYakdcK','','female','','1',NULL,NULL,'2022-01-22 08:57:00.770206','2021-10-27 12:40:23.316000','1'),(16,'jani`@yopmail.com','','$2b$12$oDFKKHAZgPXP2IoYYatrhO1XurTHh4K3qTfgQYsdhenODV45fd94C','','male','','1',NULL,NULL,'2021-11-25 12:30:43.489245','2021-10-28 16:18:48.372000','0'),(17,'jmayaanil@yopmail.com','','$2b$12$5k9W5c5uK7XWvl7B8nNmJuY1cXZ2ephcf26daERXaNLoPBHEmLl7C','./images/1635419144297-870223738-image01.jpg','male','','1',NULL,NULL,'2022-01-22 08:57:00.771457','2021-10-28 16:35:44.640000','1'),(18,'jayanthi@yopmail.com','','$2b$12$NzpaLaP9fu8XSDf8Gz33quJPwLEeZOvEDroCsv/OKbdyoRd1pYEH2','./images/1635420365688-296610135-image01.jpg','male','','1',NULL,NULL,'2022-01-22 08:57:00.773042','2021-10-28 16:56:06.074000','1'),(19,'mina@yopmail.com','','$2b$12$30vXl8VjHQvTMhVRZham9e0BGh7Kp0E6qaknLMC3CYKn9NsDG0gma','./images/1635420411047-758391848-image01.jpg','male','','1',NULL,NULL,'2022-01-22 08:57:00.772420','2021-10-28 16:56:51.396000','1'),(20,'veena@yopmail.com','','$2b$12$U.Nj0FFuCMyxKFR3tnmPD.i./cTdnlMEcVtc7xyrXJcgU3mWZUe2m','./images/1635420454390-744113180-image01.jpg','male','','1',NULL,NULL,'2021-11-25 12:30:43.492207','2021-10-28 16:57:34.729000','0'),(23,'sheena@yopmail.com','','$2b$12$X7oeG5jK/QtS45BwpxIJou8g4QV4XafQwrdmqMQEDousyp4KEgUbS','/images/1635428938893-956580648-image01.jpg','male','','1',NULL,NULL,'2021-11-25 12:30:43.491633','2021-10-28 19:18:59.708000','0'),(24,'nshahnad90@gmail.com','SHAHNAD S','','https://lh3.googleusercontent.com/a-/AOh14GjRTJLu3qGFJXs2IuJHLpVJ4m0Z2M7kaa02zsnihw=s96-c','','','1',NULL,NULL,'2021-11-25 12:30:43.492787','2021-11-16 19:10:28.691000','0'),(25,'thamara@yopmail.com','jmjayanthi','$2b$12$LsBjsfzJsOXpnWzeN8kNYe3Zpl60whUugAr9A7Bl291lH.7HBMCia','/images/undefined','','','1',NULL,NULL,'2021-11-25 12:30:43.494153','2021-11-17 16:07:10.760000','0'),(26,'thanka@yopmail.com','jmjayanthi','$2b$12$djTP2MQju0v8D5VTTGpNJ.7hXn7Ep1483JZ8R6xR6C.bBCUON4Uaq','/images/undefined','','','1',NULL,NULL,'2021-11-25 12:30:43.493507','2021-11-17 16:07:45.993000','0'),(27,'mina44@yopmail.com','jmjayanthi','$2b$12$lOHUeNrFfdk4PFUtK19ZFeQfrA9xLQWrgXoL/Df.GNsDEtm0B0V6W','/images/','','','1',NULL,NULL,'2021-11-25 12:30:43.494720','2021-11-17 16:09:28.795000','0'),(28,'anju@yopmail.com','dcsc','$2b$12$hWpxqEnygSTQgeTGvhWLt.rL4jNy7mtxfqnOePJBFthJ67P49IOK6','/images/','','','1',NULL,NULL,'2021-11-25 12:30:43.495363','2021-11-17 16:13:36.481000','0'),(29,'suku@yopmail.com','dcsc','$2b$12$ZnUvqGairuMUamR7bUCgjeesuaqqmQmptnLXqQkmdvMnHbun.MlGK','/images/','','','1',NULL,NULL,'2021-11-25 12:30:43.495955','2021-11-17 16:14:14.393000','0'),(30,'sharaf@kulakkada.com','shahnad','$2b$12$YPJoG7wWXlVibgSFIfIxUO0O7BYa9V6KSToEpV4T.jAoMR4NzRkzy','','','','1',NULL,NULL,'2021-11-25 12:30:43.496585','2021-11-17 17:47:32.477000','0'),(31,'thampuran@yopmail.com','root','$2b$12$..DHNHifoduk7W7gGmXECO2cuB8jxTNvX6s23bn6yZl9rgWJxZJSe','','','','1',NULL,NULL,'2021-11-25 12:30:43.497760','2021-11-17 18:01:43.819000','0'),(32,'radha@yopmail.com','radha','$2b$12$/mIP62Mcf1ZQvhS.oo1NQ.Fg30UMCHJdUIXes.wk0nOf8UwLG02Fm','','','','1',NULL,NULL,'2021-11-25 12:30:43.499774','2021-11-17 18:08:53.911000','0'),(33,'radha01@yopmail.com','radha','$2b$12$AfI/cEtSWIeTuIAkNlhjueFl57f357KMsQ80OO9bzUdJAVTJ7xMZi','','','','1',NULL,NULL,'2021-11-25 12:30:43.501812','2021-11-17 18:11:28.468000','0'),(34,'mashu@yopmail.com','root','$2b$12$OxfLHSlklj1Y6uJpjb2oreGIbQS8djU0wPatcEPVfimDkdPEZjkKO','','','','1',NULL,NULL,'2021-11-25 12:30:43.504078','2021-11-17 18:16:34.268000','0'),(35,'mad@yopmail.com','root','$2b$12$ANwvNAoyvSvBODMGUYNQpO1c/fgo0A63/ZJyGJr6OpeCqtMOlXnLa','','','','1',NULL,NULL,'2021-11-25 12:30:43.503360','2021-11-17 18:18:56.368000','0'),(36,'jaya@yopmail.com','jaya','$2b$12$irfilti0PdRLLFfOIwywHeoYT7H7Kw7nX16D3fV4ocVcCSjIlI1fa','','','','1',NULL,NULL,'2021-11-25 12:30:43.505192','2021-11-17 18:23:59.381000','0'),(37,'sradha@yopmail.com','sradha','$2b$12$sFYQlMLP6q35EDBAlzbb7ugAM9Wcrne7Vhfy9lZvZZW.qSia6biq6','','','','1',NULL,NULL,'2021-11-25 12:30:43.507332','2021-11-17 19:09:25.772000','0'),(38,'ramesh@yopmail.com','ramesh','$2b$12$1KJDOCp9iraPUTeGkTJh0..yzb8do2I/KSFnFoR0TTx0Ntn6dxbGS','','','','1',NULL,NULL,'2021-11-25 12:30:43.509325','2021-11-17 21:47:22.504000','0'),(39,'meera@yopmail.com','meera','$2b$12$69jYk.j5nzXtoEqZtjD78O.hndJCSBtcUGZ6w18ud.LXXA/qyH2Ry','','','','1',NULL,NULL,'2021-11-25 12:30:43.511083','2021-11-17 22:00:01.474000','0'),(40,'krmeera@yopmail.com','meera','$2b$12$sRj5PCnIs6PpTUavw/A2A.YFo7jtsWwIkiTe1TSac0LbY4uf4uR6m','','','','1',NULL,NULL,'2021-11-25 12:30:43.511781','2021-11-17 22:15:55.533000','0'),(41,'kalpana@yopmail.com','kalpana','$2b$12$ilVyEB5rbPaRrMt/RVRV8.WDnw1YVU3sngvUDE0.r.Zbb20Wi5dW2','','','','1',NULL,NULL,'2021-11-25 12:30:43.512415','2021-11-17 22:40:55.820000','0'),(42,'sharada@yopmail.com','sarada','$2b$12$3g3fJyPU0p8BwRBX15/DjeMMSGzBsqBFIkcJoxm9.RWa4T9SBjWFe','','','','1',NULL,NULL,'2021-11-25 12:30:43.513240','2021-11-17 22:42:23.303000','0'),(43,'charu@yopmail.com','charu`','$2b$12$2q8ZhJ0RVq6lFFFrKOSs6./etNciF8dlbHEflwlteOwas4M1s6Bge','','','','1',NULL,NULL,'2021-11-25 12:30:43.513949','2021-11-17 22:51:07.725000','0'),(44,'thanuj@yopmail.com','thanuj','$2b$12$mADuJIkOH9x8kh/QbFyJsu1NAZ4hoa97bbmuUBeSux8CNzTRTgkgm','','','','1',NULL,NULL,'2021-11-25 12:30:43.514769','2021-11-17 22:53:49.961000','0'),(45,'thanuj11@yopmail.com','thanuj','$2b$12$jvpGgIaOicrrH9QYEDxU6uaqkH5AcJJUDPi5hfWwhhloqHJzCpWbq','','','','1',NULL,NULL,'2021-11-25 12:30:43.516160','2021-11-17 22:54:11.031000','0'),(46,'thanuj131@yopmail.com','thanuj','$2b$12$hDXqeXKd1f0Q5GyYiIg9V.8xQr0TxSD/p7o/cxUC/ZARiU0lfsLJq','','','','1',NULL,NULL,'2021-11-25 12:30:43.517556','2021-11-17 22:54:52.262000','0'),(47,'maneesh@yopmail.com','maneesh','$2b$12$LkI3k.9z3yGtZUyd2GazuOiuvzd3t.VTJDTMYtrzQ0WJ8ytn8SqOi','','','','1',NULL,NULL,'2021-11-25 12:30:43.518444','2021-11-17 22:56:47.746000','0'),(48,'maneeshs@yopmail.com','maneesh','$2b$12$lk5.VGuYA8v89x7LcDtYkOm.ujHWcqHGW1s0.VYiCy/hXYOssDqA6','','','','1',NULL,NULL,'2021-11-25 12:30:43.519193','2021-11-17 22:57:03.980000','0'),(49,'maneeshs22@yopmail.com','maneesh','$2b$12$dcFsB.KC6UJHQ42ZT3VXKehvnSIEYH05CHnNwHQaeYBlcMIxe7Zqi','','','','1',NULL,NULL,'2021-11-25 12:30:43.519913','2021-11-17 22:58:48.788000','0'),(50,'manoharan@yopmail.com','manoharan','$2b$12$27JzpTF8BUeLbxnjdJhK..cD2aGzw7ETbTJO929j0P55Qfa8rDwz2','','','','1',NULL,NULL,'2021-11-25 12:30:43.520432','2021-11-17 23:12:02.802000','0');
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

-- Dump completed on 2022-01-23  0:29:15
