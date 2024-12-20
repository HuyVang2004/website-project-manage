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
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` varchar(36) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `description` text,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` varchar(100) NOT NULL,
  `budget` int NOT NULL,
  `created_by` varchar(36) NOT NULL,
  `update_time` datetime DEFAULT NULL,
  `target` text,
  PRIMARY KEY (`project_id`),
  KEY `created_by` (`created_by`),
  KEY `ix_projects_project_id` (`project_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','Bảo trì đường sắt Hà Nội - Lào Cai','Tiến hành bảo trì và nâng cấp tuyến đường sắt Hà Nội - Lào Cai, thay thế các đường ray cũ và sửa chữa các công trình phụ trợ.','2024-01-01 08:00:00','2024-12-31 17:00:00','đang tiến hành',10000,'d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0',NULL,'nâng cao chất lượng giao thông đường sắt'),('1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','Cải tạo cầu Bến Lức','Cải tạo, nâng cấp cầu Bến Lức để tăng tải trọng và an toàn giao thông','2024-01-01 08:00:00','2025-06-30 17:00:00','chưa bắt đầu',8000,'f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4',NULL,'tăng cường khả năng lưu thông'),('343a8766-9ac2-4d28-9504-16c85d3ac700','Mở rộng tỉnh lộ 166','Tiến hành mở rộng đường tỉnh lộ 166 2 làn thành đường đôi có dải phân cách','2023-02-01 08:00:00','2024-01-31 17:00:00','đang tiến hành',5000,'eaf3ab63-de54-48ff-8ff6-230473b64b94',NULL,'giảm ùn tắc giao thông'),('4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','Phát triển web quản lý sinh viên','Phát triển hệ thống web để quản lý thông tin sinh viên, điểm số, và các hoạt động liên quan.','2025-01-01 08:00:00','2025-12-31 17:00:00','chưa bắt đầu',5000,'b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4',NULL,'tăng cường quản lý sinh viên'),('a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','Xây dựng cầu nối huyện A và huyện B','Dự án xây dựng cầu nối giữa huyện A và huyện B nhằm giảm tải giao thông và phát triển kinh tế khu vực.','2024-01-01 08:00:00','2025-12-31 17:00:00','đang tiến hành',10000,'a1d826e7-01d7-44c8-a9e6-f4e71e7d2415',NULL,'giảm ùn tắc giao thông và thúc đẩy phát triển kinh tế'),('a987f236-2e42-429a-b45a-34894d13f32f','Chương trình Anh Trai Vượt Ngàn Chông Gai','Hỗ trợ các học viên rèn luyện kỹ năng vượt qua các thử thách trong học tập và cuộc sống','2024-01-01 09:00:00','2025-12-31 17:00:00','đang tiến hành',10000,'a1b2c3d4-e5f6-7890-gh12-34i567j89kl0',NULL,'hỗ trợ học sinh vượt khó'),('bb3c8769-a8be-4d75-93a1-00a4f31ecb62','Hỗ trợ bà con vùng lũ Miền Bắc','Tiến hành cứu trợ lũ lụt cho các khu vực bị ảnh hưởng tại miền Bắc, bao gồm cung cấp thực phẩm, thuốc men và hỗ trợ nhà ở','2024-12-19 09:00:00','2025-01-31 17:00:00','đang tiến hành',15000,'f3a1bc62-01a7-4d82-b9f9-daff8d8f77fd',NULL,'hỗ trợ cộng đồng trong thiên tai'),('d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','Phát triển phần mềm LMS','Xây dựng phần mềm học trực tuyến hỗ trợ quản lý khóa học, bài giảng, và theo dõi tiến độ học tập.','2024-01-01 08:00:00','2025-06-30 17:00:00','đang tiến hành',15000,'ba87ab63-2f54-4a88-8d94-938d3a8d9b92',NULL,'tạo nền tảng học trực tuyến chất lượng cao'),('e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','Phát triển game: Black Myth Wukong','Dự án phát triển game Black Myth Wukong, trò chơi hành động phiêu lưu, dựa trên truyền thuyết Tây Du Ký.','2025-01-01 08:00:00','2026-12-31 17:00:00','đang tiến hành',20000,'acfb67b9-b6f5-47ad-a44a-f01eae46db69',NULL,'tạo ra một trải nghiệm game đột phá với cốt truyện hấp dẫn và đồ họa ấn tượng');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
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
