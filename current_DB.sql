-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: shul
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `CustomerId` int NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255) NOT NULL,
  `Phone` varchar(255) NOT NULL,
  `FirstName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `UserType` int NOT NULL,
  `Password` varchar(45) NOT NULL,
  PRIMARY KEY (`CustomerId`),
  KEY `UserType` (`UserType`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`UserType`) REFERENCES `usertype` (`Id`),
  CONSTRAINT `customers_ibfk_2` FOREIGN KEY (`UserType`) REFERENCES `usertype` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'כהן','0583265341','חיים','haim@gmail.com',1,'123AAaa'),(2,'לוי','0526746532','משה','moshe@gmail.com',2,'123AAaa'),(3,'בן משה','12345','משה','qq',1,'123456'),(4,'רוזנבלט','12345','אריה','qq',1,'123456'),(5,'רקנאטי','44444','יהודה','uuuuu}',1,'234'),(6,'פרנק','0551','מאיר','ee',1,'123'),(7,'מונסונגו','0551','אליהו','ee',1,'123'),(8,'חסון','0829909','דן','rjhuig',1,'32345'),(9,'קליין','0829909','גד','rjhuig',1,'32345'),(10,'שרעבני','2345','חיים','jjsa',2,'32345'),(11,'ווינגרטן','2345','משה','jjsa',2,'32345'),(12,'קאזין','2345','ראובן','jjsa',2,'32345'),(13,'מלכה','32456','אסתר','vdg ',2,'3245'),(14,'רוזנר','2345','שרה','w',2,'23'),(15,'רטנר','123','שירה','AAAA',2,'1111'),(16,'פוקס','1234567','שמעון','111',1,'111'),(17,'שפיגלמן','123456','מיכאל','2',1,'2'),(18,'בירנבוים','543','רפאל','33',1,'33'),(19,'לוי','3458','ישי','444',1,'444'),(20,'לוי','2345','שלמה','5',1,'5'),(21,'מואדב','3657','זבולון','qqww',1,'1234356'),(22,'שמלה','1234','יעקב','pp',1,'0'),(23,'בן אדיבה','3','אברהם','34',1,'34'),(24,'שטריכר','123','לוי','123',1,'123'),(25,'כהן','87','מאיר','00',1,'0'),(26,'כהן','34567890','מאיר','99',1,'99'),(27,'לוי','546','ישי','0000',1,'0'),(28,'לוי','44','יצחק','44',1,'44'),(29,'לוי','23','יעקב','88',1,'88'),(30,'בלוי','3456','משה','777',1,'777'),(31,'בויאר','2345','דו','66',1,'66'),(32,'לינקר','23456789','ראובן','888',1,'888'),(33,'בן עמרם','34567','גד','oooo',1,'0'),(34,'אמיניאן','1234','שמעון','tyty',1,'33'),(35,'רוטמן','2345678','רפאל','שדגכעיח1342',1,'1234567'),(36,'סויסה','23456','בנימין','bbbb',1,'56789'),(37,'מהרשל','2345678','יוסף','dfg',1,'45678'),(38,'איבגי','345678','אהרון',' sdfg',1,'34567'),(39,'פרחים','0987654','יוסי','גכעיח',1,'4568790'),(40,'קלימן','345678','בני','כעיח',2,'34567'),(41,'ספטנר','234','קובי','torem',2,'1234'),(42,'פורוש','050124542','בני','wwww',2,'123456'),(43,'פורוש','021200021','דן','ccccc',1,'12345'),(44,'חסון','0583279290','גד','dvorah@gmail.com',1,'1234'),(45,'כהן','1112223334','דוד','a@abc.com',1,'aaabbb5'),(46,'יונה','12343','חיים','a2DDD',1,'1111'),(47,'לוי','457897','לוי','wqwqwqwq',1,'hghghghhgh'),(48,'לוי','11111111111','יהודה','qqq',1,'1111111');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donations`
--

DROP TABLE IF EXISTS `donations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ItemToDonate` int NOT NULL,
  `Amount` int NOT NULL DEFAULT '0',
  `Customer` int NOT NULL,
  `Dedication` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `ItemToDonate` (`ItemToDonate`),
  KEY `Customer` (`Customer`),
  CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`ItemToDonate`) REFERENCES `itemstodonate` (`Id`),
  CONSTRAINT `donations_ibfk_2` FOREIGN KEY (`ItemToDonate`) REFERENCES `itemstodonate` (`Id`),
  CONSTRAINT `donations_ibfk_3` FOREIGN KEY (`ItemToDonate`) REFERENCES `itemstodonate` (`Id`),
  CONSTRAINT `donations_ibfk_4` FOREIGN KEY (`Customer`) REFERENCES `customers` (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donations`
--

LOCK TABLES `donations` WRITE;
/*!40000 ALTER TABLE `donations` DISABLE KEYS */;
INSERT INTO `donations` VALUES (1,8,6,6,'lllllllllllllllllllllllllllllll'),(2,25,6,7,NULL),(3,23,30,10,NULL),(4,23,10,1,NULL),(14,8,1,2,'qqqqqqqqqqqqqqq');
/*!40000 ALTER TABLE `donations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `freedonation`
--

DROP TABLE IF EXISTS `freedonation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `freedonation` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Sum` varchar(255) NOT NULL,
  `Dedication` varchar(255) DEFAULT NULL,
  `Customer` int NOT NULL,
  `Shul` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `Customer` (`Customer`),
  KEY `Shul` (`Shul`),
  CONSTRAINT `freedonation_ibfk_1` FOREIGN KEY (`Customer`) REFERENCES `customers` (`CustomerId`),
  CONSTRAINT `freedonation_ibfk_2` FOREIGN KEY (`Shul`) REFERENCES `shuls` (`ShulId`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `freedonation`
--

LOCK TABLES `freedonation` WRITE;
/*!40000 ALTER TABLE `freedonation` DISABLE KEYS */;
INSERT INTO `freedonation` VALUES (1,'240','qqqqqqqqqq',1,3),(2,'300','fv',2,3),(3,'3544',NULL,1,2),(4,'33333','frhtuyerf',3,4),(5,'343','fbthugy',4,2),(7,'33333','eeeeeeee',4,4),(8,'333333333333',NULL,2,2),(9,'99999999999','4',2,2);
/*!40000 ALTER TABLE `freedonation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `Img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'נברשת','http://localhost:6200/nivreshet.jpg'),(2,'לוח דיגיטלי ','http://localhost:6200/louachDigitaly.jpg'),(3,'פרוכת','http://localhost:6200/parochet.jpg'),(4,'סידורים','http://localhost:6200/sidourim.jpg'),(5,'ארון קודש','http://localhost:6200/aronKodesh.jpg'),(6,'ספריה','http://localhost:6200/sifriya.jpg'),(7,'שולחנות','http://localhost:6200/shoulhanot.jpg'),(8,'מטבחון','http://localhost:6200/mitbah.jpg'),(9,'וילון','http://localhost:6200/vilon.jpg'),(10,'מנורה','http://localhost:6200/menora.jpg'),(11,'ספר תורה','http://localhost:6200/sefertora.jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemstodonate`
--

DROP TABLE IF EXISTS `itemstodonate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemstodonate` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ItemId` int NOT NULL,
  `Amount` double DEFAULT NULL,
  `Shul` int NOT NULL,
  `Price` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `ItemId` (`ItemId`),
  KEY `Shul` (`Shul`),
  CONSTRAINT `itemstodonate_ibfk_1` FOREIGN KEY (`Shul`) REFERENCES `shuls` (`ShulId`),
  CONSTRAINT `itemstodonate_ibfk_2` FOREIGN KEY (`ItemId`) REFERENCES `items` (`Id`),
  CONSTRAINT `itemstodonate_ibfk_3` FOREIGN KEY (`ItemId`) REFERENCES `items` (`Id`),
  CONSTRAINT `itemstodonate_ibfk_4` FOREIGN KEY (`Shul`) REFERENCES `shuls` (`ShulId`),
  CONSTRAINT `itemstodonate_chk_2` CHECK ((`Amount` >= 0)),
  CONSTRAINT `itemstodonate_chk_3` CHECK ((`Amount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemstodonate`
--

LOCK TABLES `itemstodonate` WRITE;
/*!40000 ALTER TABLE `itemstodonate` DISABLE KEYS */;
INSERT INTO `itemstodonate` VALUES (8,5,7,3,100),(23,3,2343,2,4000),(25,2,6,2,200),(26,4,4,2,123),(27,4,12,3,120),(28,1,2,2,234),(29,2,3,3,132),(38,5,123,2,123),(39,2,11111,4,1111111);
/*!40000 ALTER TABLE `itemstodonate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shuls`
--

DROP TABLE IF EXISTS `shuls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shuls` (
  `ShulId` int NOT NULL AUTO_INCREMENT,
  `NameShul` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8_general_ci NOT NULL,
  `Customer` int NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ShulId`),
  KEY `Customer` (`Customer`),
  KEY `shuls_ibfk_1` (`Address`),
  CONSTRAINT `shuls_ibfk_2` FOREIGN KEY (`Customer`) REFERENCES `customers` (`CustomerId`),
  CONSTRAINT `shuls_ibfk_3` FOREIGN KEY (`Customer`) REFERENCES `customers` (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shuls`
--

LOCK TABLES `shuls` WRITE;
/*!40000 ALTER TABLE `shuls` DISABLE KEYS */;
INSERT INTO `shuls` VALUES (2,'שפתי חיים',1,' ירושלים רחוב הרב אלישיב 12','http://localhost:6200/shul1.jpg'),(3,'קרעטשנף',3,'טבריה רחוב אחוה6','http://localhost:6200/shul2.jpg'),(4,'מאקווא',4,'בני ברק רחוב כהנמן 4','http://localhost:6200/shul3.jpg'),(5,'אוהל תמר',5,'ירושלים רחוב ירמיהו 3','http://localhost:6200/shul4.jpg'),(6,'קהילות יעקב',6,'ירושלים רחוב רוזנבלט 2','http://localhost:6200/shul5.jpg'),(7,'החורבה',17,'ירושלים הרובע היהודי 3','http://localhost:6200/shul7.jpg'),(8,'הדרת מלך',21,'ירושלים הרב פרנק 45','http://localhost:6200/shul9.jpg'),(9,'בעלזא',25,'ירושלים שמואל הנביא 23','http://localhost:6200/shul10.jpg'),(10,'תולדות אהרון',27,'טבריה אחוה 3','http://localhost:6200/toldotAaron.jpg'),(11,'זוהר התורה',29,'ירושלים כלנית 3','http://localhost:6200/zoaratorah.jpg'),(12,'קהילות ישראל',30,'ירושלים הגפן 5','http://localhost:6200/keilotIsrael.jpg');
/*!40000 ALTER TABLE `shuls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,'gabay'),(2,'donate');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25 13:34:03
