-- MySQL dump 10.13  Distrib 5.7.29, for Win64 (x86_64)
--
-- Host: localhost    Database: stylish
-- ------------------------------------------------------
-- Server version	5.7.29-log

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
-- Table structure for table `campaign`
--

DROP TABLE IF EXISTS `campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `campaign` (
  `product_id` bigint(20) unsigned NOT NULL,
  `picture` varchar(100) NOT NULL,
  `story` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `campaign`
--

LOCK TABLES `campaign` WRITE;
/*!40000 ALTER TABLE `campaign` DISABLE KEYS */;
INSERT INTO `campaign` VALUES (201807202140,'productCampaign.jpg','瞬間\r\n在城市的角落\r\n找到失落多時的記憶。\r\n印象《都會故事集》'),(201807242222,'productCampaign.jpg','永遠\r\n展現自信與專業\r\n無法抵擋的男人魅力。\r\n復古《再經典一次》'),(201807242228,'productCampaign.jpg','於是\r\n我也想要給你\r\n一個那麼美好的自己。\r\n不朽《與自己和好如初》');
/*!40000 ALTER TABLE `campaign` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color` (
  `id` bigint(20) unsigned NOT NULL,
  `code` varchar(100) NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'334455','深藍色'),(2,'FFFFFF','白色'),(3,'DDFFBB','蘋果綠'),(4,'DDF0FF','淺藍色'),(5,'CCCCCC','灰色'),(6,'BB7744','巧克力色'),(7,'FFDDDD','粉紅色');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hots`
--

DROP TABLE IF EXISTS `hots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hots` (
  `title` varchar(100) NOT NULL,
  `product` bigint(20) unsigned NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hots`
--

LOCK TABLES `hots` WRITE;
/*!40000 ALTER TABLE `hots` DISABLE KEYS */;
/*!40000 ALTER TABLE `hots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `shipping` varchar(100) NOT NULL,
  `paymethod` varchar(100) NOT NULL,
  `subtotal` bigint(20) unsigned NOT NULL,
  `freight` bigint(20) unsigned NOT NULL,
  `total` bigint(20) unsigned NOT NULL,
  `ordersUser` varchar(500) CHARACTER SET utf8 NOT NULL,
  `ordersProduct` varchar(500) CHARACTER SET utf8 NOT NULL,
  `paid` varchar(50) NOT NULL,
  `payment` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12272 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (12262,1,'123','123',123,123,166,'123','123','123','123'),(12263,5,'123','123',123,123,992,'123','123','123','123'),(12264,4,'123','123',123,123,271,'123','123','123','123'),(12265,1,'123','123',123,123,507,'123','123','123','123'),(12266,5,'123','123',123,123,266,'123','123','123','123'),(12267,1,'123','123',123,123,445,'123','123','123','123'),(12268,3,'123','123',123,123,124,'123','123','123','123'),(12269,4,'123','123',123,123,662,'123','123','123','123'),(12270,1,'123','123',123,123,784,'123','123','123','123'),(12271,2,'123','123',123,123,836,'123','123','123','123');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` bigint(20) unsigned NOT NULL,
  `title` varchar(100) CHARACTER SET utf8 NOT NULL,
  `description` varchar(100) CHARACTER SET utf8 NOT NULL,
  `price` bigint(20) unsigned NOT NULL,
  `category` varchar(50) NOT NULL,
  `texture` varchar(100) CHARACTER SET utf8 NOT NULL,
  `wash` varchar(100) CHARACTER SET utf8 NOT NULL,
  `place` varchar(100) CHARACTER SET utf8 NOT NULL,
  `note` varchar(100) CHARACTER SET utf8 NOT NULL,
  `story` varchar(4000) CHARACTER SET utf8 NOT NULL,
  `colors` varchar(100) CHARACTER SET utf8 NOT NULL,
  `sizes` varchar(100) NOT NULL,
  `variants` varchar(400) NOT NULL,
  `main_image` varchar(100) NOT NULL,
  `images` varchar(8000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (201807201824,'前開衩扭結洋裝','-',799,'women','棉','手洗（水溫40度,洗衣機洗','台灣','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','2,3,5','S','201807201824','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807202140,'透肌澎澎防曬襯衫','-',599,'women','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','3,5','S,M','201807202140','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807202150,'小扇紋細織上衣','-',599,'women','棉','手洗（水溫40度,洗衣機洗','日本','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','3,5,6','S,M','201807202150','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807202157,'活力花紋長筒牛仔褲','-',1299,'women','棉','洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,3,5','S,M,L','201807202157','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242211,'純色輕薄百搭襯衫','-',799,'men','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,2','S,M','201807242211','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242216,'時尚輕鬆休閒西裝','-',2399,'men','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','2,5','S,M,L','201807242216','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242222,' 經典商務西裝','-',3999,'men','棉','手洗（水溫40度','台灣','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1','S,M,L','201807242222','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242228,'夏日海灘戶外遮陽帽','-',1499,'accessories','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,2','S,M','201807242228','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242230,'經典牛仔帽','-',799,'accessories','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,6','S,M','201807242230','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242232,'卡哇伊多功能隨身包','-',1299,'accessories','棉','手洗（水溫40度,洗衣機洗','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,7','S','201807242232','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201807242234,'柔軟氣質羊毛圍巾','-',1799,'accessories','棉','手洗（水溫40度,洗衣機洗','日本','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,3','S,M','201807242234','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201902191210,'精緻扭結洋裝','-',999,'women','棉','手洗（水溫40度,洗衣機洗','台灣','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,5','S,M','201902191210','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201902191242,'透肌澎澎薄紗襯衫','-',999,'women','棉','洗衣機洗','台灣','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,3','S,M','201902191242','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201902191245,'小扇紋質感上衣','-',999,'women','棉','手洗（水溫40度','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,5','S,M','201902191245','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg'),(201902191247,' 經典修身長筒牛仔褲','-',1999,'women','棉','手洗（水溫40度','韓國','實品顏色依單品照為主','O.N.S is all about options, which is why we took our staple polo shirt and upgraded it with slubby linen jersey, making it even lighter for those who prefer their summer style extra-breezy.','1,2','S,M,L','201902191247','productPhoto.jpg','productImages-1.jpg,productImages-2.jpg');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `access_token` varchar(500) NOT NULL,
  `provider` varchar(100) CHARACTER SET utf8 NOT NULL,
  `name` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `picture` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFhQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjQ0MjQyLCJleHAiOjE1OTA2NDc4NDJ9.3mcKKUwnjduRrGk46bdzqjc-hwqA4_cIaOqp5SnEGxE','native','aa','aa@hotmail.com','3edb0bef34e1110b932df9196659487438c970aaec35011fa83be9c683a6ffc9','http://15.165.60.213/stylish-4.jpg'),(2,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImJiQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjUwMTEwLCJleHAiOjE1OTA2NTM3MTB9.5vuNYDnMEsIkfky6kkAdhN_ep9DI4Odu0Xa-uMzoz3M','native','bb','bb@hotmail.com','54b017bc39f761afc4e7901119ae306ddc4b16dfa76cf5fa67acd20bc835fda6','http://15.165.60.213/stylish-4.jpg'),(3,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImNjQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjQ0NTQxLCJleHAiOjE1OTA2NDgxNDF9.TL2yB4ZbWvT0IzjiF9L6lOZYyg0YNFKbBM16iIh1aWw','native','cc','cc@hotmail.com','89afc2748fecfdb690b3d87379cc821230a61d66aeae293d8e029a2e2baecce9','http://15.165.60.213/stylish-4.jpg'),(4,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImRkQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjUwMjkzLCJleHAiOjE1OTA2NTM4OTN9.deLEsnNdpWxH6h2TU3tOsOoCESeqhnCKLN8DqKs_Yv0','native','dd','dd@hotmail.com','bc8a83857e9a4db05d5db02dd853df292541f8b828c373c684792416ad00f00c','http://15.165.60.213/stylish-4.jpg'),(5,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImVlQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjUwMzI2LCJleHAiOjE1OTA2NTM5MjZ9.AoyyFcDHodVPGxq1Xv0Mie5gX_LuxzzsLFhUAWuX51k','native','ee','ee@hotmail.com','ddd52a1e1bba83fa3a642f67ebeb5f412e73a8e2bd94194f97eebc580d7d6f16','http://15.165.60.213/stylish-4.jpg'),(6,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InpAaG90bWFpbC5jb20iLCJpYXQiOjE1OTA2NTAzNzMsImV4cCI6MTU5MDY1Mzk3M30.1s-Vw-JT5WzmTea-UFjd0duH6Ta824QeGSkOa_CRK-Q','native','z','z@hotmail.com','cb346db424580b758436dc60839f12b959dcada32bbd308feac835f6b9a557af','http://15.165.60.213/stylish-4.jpg'),(7,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImdnQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNjUwNjI0LCJleHAiOjE1OTA2NTQyMjR9.QW3Y8509GT6qawARpf22cSgoBT0RQpKdtoK_u_bPkuo','native','gg','gg@hotmail.com','12864142e04702b7565e3d7ad560d1abfc866c1fa5fdf01afed3d7186ce43f30','http://15.165.60.213/stylish-4.jpg'),(8,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFiY0Bob3RtYWlsLmNvbSIsImlhdCI6MTU5MDcyMDEwOSwiZXhwIjoxNTkwNzIwMTE5fQ.arc598zBhiFxyh0J7pMA6v-qUm0NEJXqCQ_1xqAhS2A','native','abc','abc@hotmail.com','451689abb5dd06ea2799fbf64ddf1b88c2914ed85158f7890582e6eda5741542','http://15.165.60.213/stylish-4.jpg'),(9,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImpvaG5AaG90bWFpbC5jb20iLCJpYXQiOjE1OTA3NTMxMzEsImV4cCI6MTU5MDc1NjczMX0.7LVY5ZDp-MTNQ8kDGu8ZRuej8Eae-DhLdhMInHUYD-w','native','john','john@hotmail.com','a71872fbc95dee3c87d638c0264e64f0ec8d6fc38e7c88c18c500bb722227af5','http://15.165.60.213/stylish-4.jpg'),(10,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImpqQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNzIyNTAyLCJleHAiOjE1OTA3MjI1MTJ9.yFXqXZ7caPYUKIEuJ6RvFETmBxpZk7znb1G6bW3zCwY','native','jj','jj@hotmail.com','78b544082edb75d2f028e40ab4863655ec72dfd1f9bdecfd921697609b0e273c','http://15.165.60.213/stylish-4.jpg'),(11,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImpvaG5ueUBob3RtYWlsLmNvbSIsImlhdCI6MTU5MDcyNDUyMywiZXhwIjoxNTkwNzI4MTIzfQ.OgTfotuDjs8wAFvdkHaEjMA_sgJMBwqXowldclNBPUE','native','johnny','johnny@hotmail.com','eb8b7b0d584ec1b88c469a47a838f12ca85a836a405f656df92b965288166722','http://15.165.60.213/stylish-4.jpg'),(12,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IndoaXRlQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNzI1MzY0LCJleHAiOjE1OTA3MjUzNjV9.bfT7HPYejz5PW7Qg9chAAQqyhCUMsFn87Jq90lPqrRM','native','white','white@hotmail.com','007a03bbc4417ff71c464f958db7587b6c5fcaba485033c4f903784ddd249063','http://15.165.60.213/stylish-4.jpg'),(13,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InBvd2VyQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNzI1Mjc3LCJleHAiOjE1OTA3MjUyNzh9.awRPyuKnB8z9mRDJiMdZ-WBZoE4z-bYiowcVK7xU1BY','native','power','power@hotmail.com','f8dd53d5ff5c76c73abba24d8f086035744f64680c5f949d3d3d015bf8347b58','http://15.165.60.213/stylish-4.jpg'),(14,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Im9oQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNzM1MDAyLCJleHAiOjE1OTA3Mzg2MDJ9.d_n5gUBvkLbBEsg0_YljFyKeJjwrt6QzMIZcbbCYGmM','native','oh','oh@hotmail.com','82c8aed64b94db6682ba35ee75ca431bb8ced17fff81804dc8561b06d609629a','http://15.165.60.213/stylish-4.jpg'),(15,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImtrQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwNzM1MjMxLCJleHAiOjE1OTA3Mzg4MzF9.revBUIJ4SwoUvenQZyA6P0dTpx5uHPwGt2Vs3v9atGU','native','kk','kk@hotmail.com','4a817d3ad280462fc7bb5fcabaaebbf37ad894acbc870966d01303e39577bec4','http://15.165.60.213/stylish-4.jpg'),(16,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImhleUBob3RtYWlsLmNvbSIsImlhdCI6MTU5MDczNTk2MSwiZXhwIjoxNTkwNzM5NTYxfQ._gb2ItWSxYg9nRPFIYkhFOwQ1Ibavq-FxoiirPR4CBQ','native','hey','hey@hotmail.com','e78e067389366f2d6ee0b4b385e85ce5cfeb0781e07801d5f9e0d0c92b88d988','http://15.165.60.213/stylish-4.jpg'),(17,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InBvQGhvdG1haWwuY29tIiwiaWF0IjoxNTkwOTQxNjA0LCJleHAiOjE1OTA5NDUyMDR9.2RxrzS7FumB1MlJmEhDRTpTP94CLLoLc2m5MM88rq9M','native','po','po@hotmail.com','dc5df089453a4e2b7f1d4975c1e7c2063fdedf90d79fbd2ccae29a600568fc5a','http://15.165.60.213/stylish-4.jpg'),(18,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFAaG90bWFpbC5jb20iLCJpYXQiOjE1OTA5Nzk0NjYsImV4cCI6MTU5MDk4MzA2Nn0.4J1jHgXOwZjgCKQ9IOP9AVSjZY_s_bo2UUbToEZwX_M','native','a','a@hotmail.com','e0cbbcf3f349cc347ec6d778b34f74a77b408d118f81ff9336e1755f6ade9b85','http://15.165.60.213/stylish-4.jpg'),(19,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImNjY0Bob3RtYWlsLmNvbSIsImlhdCI6MTU5MTA4MjQwMiwiZXhwIjoxNTkxMDg2MDAyfQ.PDTqj-vd_J23WRRgZWIK3hEx5OFvxOM6pCmZT3aWwso','native','ccc','ccc@hotmail.com','4fe8709804429d75db897c90b0c38961681243f7b3e5f3d183931b6d6b09a3b8','http://15.165.60.213/stylish-4.jpg'),(20,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Im9ra0Bob3RtYWlsLmNvbSIsImlhdCI6MTU5MTA4Mjc5NSwiZXhwIjoxNTkxMDg2Mzk1fQ.lkb4Fdar4VKUzQw8Q9Wv3zde-3quH1eVqWY5YyiL9zQ','native','okk','okk@hotmail.com','de481729a5f2dfdc78bf4db4f8a9c7e09713555b92f75e84987946231084ea3b','http://15.165.60.213/stylish-4.jpg'),(21,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Im9tZ0Bob3RtYWlsLmNvbSIsImlhdCI6MTU5MTA4Mjg2OCwiZXhwIjoxNTkxMDg2NDY4fQ.omh7fxZMcsUTVa_GV8TvfCTZpWehy8h5g9HRZBE3We0','native','omg','omg@hotmail.com','2ad7e306c11b7bf119259babc7038cd6dfe22af5ca2ed3da8f08ceb825d12439','http://15.165.60.213/stylish-4.jpg'),(22,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InJheUBob3RtYWlsLmNvbSIsImlhdCI6MTU5MTA4ODMxNywiZXhwIjoxNTkxMDkxOTE3fQ.vC06-J_K7U2SNri53RSZmG1EB6eFh_AJtrqNlcxVvo8','native','ray','ray@hotmail.com','050b4df8f49207820aa9ee166f4126ec218c51444e12e601b602a519eb7f963f','http://15.165.60.213/stylish-4.jpg'),(23,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFsbEBob3RtYWlsLmNvbSIsImlhdCI6MTU5MTA4NjkzNiwiZXhwIjoxNTkxMDkwNTM2fQ.f0u7aA_4EI25XQ8EsV_aJNxeqQuQKHX5gAOwFm_U_OQ','native','all','all@hotmail.com','c8d67589690868fb66a4fb03330f71ae7896d35e35959561cdebc8ab1f57840f','http://15.165.60.213/stylish-4.jpg'),(24,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjEyMyIsImlhdCI6MTU5MTg2ODI1MSwiZXhwIjoxNTkxODcxODUxfQ.gHV3BO9GnB9o56OaOaNZFjyd-LeSJF6AQH6ca6MVdUc','native','123','123','ffd142fa28e4916be7aea30c8549909965ac95475cbb1fa9e21319863db6da73','stylish-4.jpg'),(25,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjIzNCIsImlhdCI6MTU5MTg2ODQ2OSwiZXhwIjoxNTkxODcyMDY5fQ.9HFyTkwvlkJHV6bXVW_4we_qVv2pAzoF5ozowqiSnSA','native','234','234','a1fed20e20f725ba64c74be6b1747062d1a7b71ebc427ebbb324d5ee138355e2','stylish-4.jpg'),(26,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6IjQ1NiIsImlhdCI6MTU5MTg2ODYwMywiZXhwIjoxNTkxODcyMjAzfQ.wtgJ4Vgq_W-N8lRw77PyL97cvKNFt7em4xzkPgBnBfk','native','456','456','60770fe4395e8d13274aa2559e6b67f5c2f0df9c24a6d3a232e05f3c8edda97b','stylish-4.jpg'),(27,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFjYyIsImlhdCI6MTU5MTg2ODcyMSwiZXhwIjoxNTkxODcyMzIxfQ.6fMyJT8_siw0lhtovQrRZhjyn-gtSo4HIzgFIRfqaug','native','acc','acc','62bd790b8dd8d3a9ffec13f51fc5c03d121cc9a54e3c7ecf3fe14a5fafe503e9','stylish-4.jpg'),(28,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImJjYyIsImlhdCI6MTU5MTg2ODc3NCwiZXhwIjoxNTkxODcyMzc0fQ.NJeMzSx8pOnXUVqzvNvKkgO-KxGAjwe4rF2hDbz9-Wk','native','bcc','bcc','ac4303ed2835213a97126bc4fdc6acf4535918f44dc32cb8b320eaf88437ac89','stylish-4.jpg'),(29,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Inp6IiwiaWF0IjoxNTkxODY4ODcwLCJleHAiOjE1OTE4NzI0NzB9.GDxMNhu8eJ1S7l2J8zQuXnQNfk2si4cmZrvyIcLWWmA','native','zz','zz','21c0a2f5112bee3841849db99053c1a60a203e49ef99ae4eadb667135556b01b','stylish-4.jpg'),(30,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImJuIiwiaWF0IjoxNTkxODY4ODkwLCJleHAiOjE1OTE4NzI0OTB9.NrXyfeiArPOx6oPIxNHMPsGvPyJQ_q22PuHT6DmA-no','native','bn','bn','5561ebd7d418b75b60cf5df0cbca04af212732ecf3c98f1f1c391d8e620f1748','stylish-4.jpg'),(31,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InBwIiwiaWF0IjoxNTkxODY4OTkwLCJleHAiOjE1OTE4NzI1OTB9.jv5-7xpB00YkHxZx07q0qvH7rO7fYVRjSFkbMpnF-cw','native','pp','pp','0a9a51e1a6703b48efcc525147086958664e8f081dbb75617bc3f4eb2153d27c','stylish-4.jpg'),(32,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InBhIiwiaWF0IjoxNTkxODY5MDE2LCJleHAiOjE1OTE4NzI2MTZ9.isTyjdNxUQeQuXyxARA00_NhVCtQEELz55kqM9-Tl7g','native','pa','pa','10075a4fdb689648925448ecf5ee9a9d25e6f5d76c4707b51ce6a23ead025fef','stylish-4.jpg'),(33,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImFkIiwiaWF0IjoxNTkxODY5MDM3LCJleHAiOjE1OTE4NzI2Mzd9.NvbI3m5ACsR1N-jC8Zua2tKFLeukkqzvs7Uw1xYYy2g','native','ad','ad','b14b3e7b891ea90e75858669be4ccb462081007e4e62727346caa2299db4aaf6','stylish-4.jpg'),(34,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6InNhIiwiaWF0IjoxNTkxODY5MDUzLCJleHAiOjE1OTE4NzI2NTN9.a-IweNd48LLeFxaIb5RvXDHOGlBBaKpjuUURGLOyfK4','native','sa','sa','f31118a07259897b18dbd223038151304405ddb24338a9387590dea8043e930d','stylish-4.jpg'),(35,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ImF3IiwiaWF0IjoxNTkxODcwOTg5LCJleHAiOjE1OTE4NzQ1ODl9.LbQBJR_EV-0azTkREwL-vATZm0ukVkZZ9LhYtrlpwfo','native','aw','aw','d74387b8c6bc6a61d9bd52862b7975e7488f8bd1040bcc87ef7e584c79e464cf','stylish-4.jpg'),(36,'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6Inh0cmVtZWJvb3N0QGhvdG1haWwuY29tIiwiaWF0IjoxNTkxODcwOTI0LCJleHAiOjE1OTE4NzQ1MjR9.Hy6iVWPa0xf5ZhUUId0US6fVgHfigGTEyh3o7HJAvSo','facebook','張顯主','xtremeboost@hotmail.com','NaN','http://dltnco5joak65.cloudfront.net/stylish-4.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variant`
--

DROP TABLE IF EXISTS `variant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `variant` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `color_code` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `stock` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variant`
--

LOCK TABLES `variant` WRITE;
/*!40000 ALTER TABLE `variant` DISABLE KEYS */;
INSERT INTO `variant` VALUES (30,201807201824,'FFFFFF','S',12),(31,201807201824,'DDFFBB','S',10),(32,201807201824,'CCCCCC','S',8),(33,201807202140,'DDFFBB','S',15),(34,201807202140,'DDFFBB','M',9),(35,201807202140,'CCCCCC','S',7),(36,201807202140,'CCCCCC','M',12),(37,201807202150,'DDFFBB','S',5),(38,201807202150,'DDFFBB','M',8),(39,201807202150,'CCCCCC','S',10),(40,201807202150,'CCCCCC','M',9),(41,201807202150,'BB7744','S',7),(42,201807202150,'BB7744','M',6),(43,201807202157,'334455','S',12),(44,201807202157,'334455','M',5),(45,201807202157,'334455','L',8),(46,201807202157,'DDFFBB','S',1),(47,201807202157,'DDFFBB','M',9),(48,201807202157,'DDFFBB','L',11),(49,201807202157,'CCCCCC','S',6),(50,201807202157,'CCCCCC','M',8),(51,201807202157,'CCCCCC','L',7),(52,201902191210,'334455','S',0),(53,201902191210,'334455','M',7),(54,201902191210,'CCCCCC','S',0),(55,201902191210,'CCCCCC','M',5),(56,201902191242,'334455','S',5),(57,201902191242,'334455','M',0),(58,201902191242,'DDFFBB','S',0),(59,201902191242,'DDFFBB','M',12),(60,201807242211,'334455','S',12),(61,201807242211,'334455','M',5),(62,201807242211,'FFFFFF','S',6),(63,201807242211,'FFFFFF','M',0),(64,201807242216,'FFFFFF','S',5),(65,201807242216,'FFFFFF','M',4),(66,201807242216,'FFFFFF','L',8),(67,201807242216,'CCCCCC','S',7),(68,201807242216,'CCCCCC','M',0),(69,201807242216,'CCCCCC','L',9),(70,201807242222,'334455','S',5),(71,201807242222,'334455','M',0),(72,201807242222,'334455','L',3),(73,201902191245,'334455','S',5),(74,201902191245,'334455','M',10),(75,201902191245,'CCCCCC','S',0),(76,201902191245,'CCCCCC','M',9),(77,201902191247,'334455','S',2),(78,201902191247,'334455','M',3),(79,201902191247,'334455','L',0),(80,201902191247,'FFFFFF','S',0),(81,201902191247,'FFFFFF','M',6),(82,201902191247,'FFFFFF','L',5),(83,201807242228,'334455','S',12),(84,201807242228,'334455','M',6),(85,201807242228,'FFFFFF','S',0),(86,201807242228,'FFFFFF','M',8),(87,201807242230,'334455','S',12),(88,201807242230,'334455','M',4),(89,201807242230,'BB7744','S',6),(90,201807242230,'BB7744','M',8),(91,201807242232,'334455','S',12),(92,201807242232,'FFDDDD','S',5),(93,201807242234,'334455','S',15),(94,201807242234,'334455','M',9),(95,201807242234,'DDFFBB','S',7),(96,201807242234,'DDFFBB','M',0);
/*!40000 ALTER TABLE `variant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-22 16:17:07
