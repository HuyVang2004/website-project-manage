-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: project_manager_database_2
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Table structure for table `help`
--

DROP TABLE IF EXISTS `help`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `help` (
  `help_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `help_type` varchar(100) NOT NULL,
  `create_time` datetime NOT NULL,
  PRIMARY KEY (`help_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_help_help_id` (`help_id`),
  CONSTRAINT `help_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `help`
--

LOCK TABLES `help` WRITE;
/*!40000 ALTER TABLE `help` DISABLE KEYS */;
INSERT INTO `help` VALUES ('65d3fcaf-34ae-423f-bbe1-cffb1cc9a0a6','b78c9edb-0ad2-43f6-94f0-746bed8a0106','Cần hỗ trợ về thay đổi thiết kế cầu.','hỗ trợ thiết kế','2025-02-15 08:00:00'),('66f688b1-4645-4c8a-add7-cfec95034d28','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','quên mật khẩu, không thể đăng nhập lại qua email.','hỗ trợ đăng nhập','2025-01-18 06:30:09'),('6e03f913-b2cf-400d-bb9d-bbd735be739d','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','Không thể tải tài liệu từ hệ thống, cần hỗ trợ tải tài liệu.','hỗ trợ tài liệu','2025-01-15 09:30:15'),('7ed8e987-97ad-4cd5-93ad-d685d8fca0e9','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','Cần hỗ trợ về quy trình tối ưu hóa đồ họa cho game.','hỗ trợ kỹ thuật','2025-03-01 10:00:00'),('9c6ad9d7-d26b-4f60-8c7b-90f93c7048df','c91d95e4-907f-4a53-9266-d803dd2abdf7','Không thể truy cập nền tảng học trực tuyến, cần hỗ trợ đăng nhập lại.','hỗ trợ đăng nhập','2025-01-10 08:45:00'),('ce18fbe3-b073-4602-8205-8126e0641f96','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','quên mật khẩu, không thể đăng nhập vào hệ thống.','hỗ trợ đăng nhập','2025-02-18 10:00:00'),('d8872a99-b26d-46d4-849f-d3b4de5e8b82','e38a45b1-f1e4-4edb-bde1-4264749b72c1','Không thể đăng nhập vì quên mật khẩu','hỗ trợ đăng nhập','2025-02-20 08:00:00'),('e0fe99b1-e214-4f72-94f4-76a2d8d13e54','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','trang web không thể hiện thị trên firefox','hỗ trợ giao diện','2025-01-10 11:00:00'),('eafbc847-b62a-4b73-b437-1eafc07fcf3a','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','Không thể tìm thấy tài liệu thiết kế cầu nối huyện A và huyện B.','hỗ trợ tài liệu','2025-03-01 08:30:00');
/*!40000 ALTER TABLE `help` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19 23:53:37
