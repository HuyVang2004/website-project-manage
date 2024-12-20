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
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_log` (
  `log_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `activity_type` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_activity_log_log_id` (`log_id`),
  CONSTRAINT `activity_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_log`
--

LOCK TABLES `activity_log` WRITE;
/*!40000 ALTER TABLE `activity_log` DISABLE KEYS */;
INSERT INTO `activity_log` VALUES ('35c7d12e-5d58-4a2d-b1b0-6ac0ae489573','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','cập nhật tiến độ','Cập nhật kế hoạch tháo dỡ cầu cũ cho dự án','2024-12-19 10:25:00'),('4a5d3c2b-80bb-46e2-bb93-d2c33e5ad2db','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','cập nhật nhiệm vụ','Bắt đầu xây dựng hệ thống quản lý khóa học','2024-12-18 13:41:00'),('52d3f6c3-37a6-4d79-876b-bb3b1a3484d6','b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','cập nhật tiến độ','Cập nhật kế hoạch thiết kế giao diện web.','2024-12-19 11:25:00'),('5d7c8b62-689d-4d6f-8b9d-5a74b49723d0','a1b2c3d4-e5f6-7890-gh12-34i567j89kl0','cập nhật tiến độ','Cập nhật tiến độ chương trình đào tạo kỹ năng mềm cho học viên','2024-12-18 13:10:00'),('62d1f9bc-40c2-47ff-a1e3-b63e1d68e4a1','ba87ab63-2f54-4a88-8d94-938d3a8d9b92','cập nhật tiến độ','Cập nhật tiến độ phân tích yêu cầu và thiết kế giao diện','2024-12-18 13:40:00'),('74e961ae-3f74-42ac-be25-54dbce701d09','eaf3ab63-de54-48ff-8ff6-230473b64b94','cập nhật tiến độ','Cập nhật tiến độ chuẩn bị mặt bằng cho dự án','2024-12-18 13:21:54'),('7d881b67-fd5f-4a6d-bf66-d75d8b1f06b3','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','cập nhật nhiệm vụ','Bắt đầu thi công móng cầu','2024-12-19 10:05:00'),('85f5c0b3-b292-44d9-a50b-30efb14f8f16','f3a1bc62-01a7-4d82-b9f9-daff8d8f77fd','cập nhật tiến độ','Cập nhật tiến độ phân phối thực phẩm cứu trợ cho các khu vực bị ảnh hưởng.','2024-12-19 09:58:00'),('87c3c116-69a7-4e23-b561-b61db7adf85b','d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','cập nhật tiến độ','Cập nhật tiến độ thay thế đường ray tại khu vực Hà Nội','2024-12-19 14:30:00'),('88cf4516-2c89-4c7c-99b0-153b11d34d3f','d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','thêm nhiệm vụ','Thêm nhiệm vụ xây dựng cơ sở dữ liệu sinh viên.','2024-12-19 11:26:00'),('8ba0aaa7-9537-4fef-a13d-5ba95d7806f1','eaf3ab63-de54-48ff-8ff6-230473b64b94','cập nhật nhiệm vụ','Bắt đầu thi công công tác xây dựng dải phân cách','2024-12-18 13:22:31'),('a58a4297-c3a5-4a1a-bf1f-dedb295b64c2','acfb67b9-b6f5-47ad-a44a-f01eae46db69','cập nhật tiến độ','Cập nhật tiến độ phát triển gameplay cho dự án Black Myth Wukong','2024-12-19 11:40:00'),('a9d5f64d-45f7-490a-99f0-706a5d8f72cd','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','cập nhật nhiệm vụ','Bắt đầu chuẩn bị vật liệu xây dựng cầu mới','2024-12-19 10:26:00'),('b1a2ff21-62e5-42f7-93da-1c5e70562f83','c27d52b8-c6d7-437d-85a0-452a330dbb35','cập nhật nhiệm vụ','Đang tiếp tục phân phối thực phẩm cho bà con.','2024-12-19 10:00:00'),('b9340f80-fc7d-4b16-9e9b-72e68a1c3fbd','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','cập nhật nhiệm vụ','Đã hoàn thành mô hình nhân vật chính cho game','2024-12-19 11:45:00'),('c298d8a3-3f7f-4c45-bd67-ec537ffb0837','a1d826e7-01d7-44c8-a9e6-f4e71e7d2415','cập nhật tiến độ','Cập nhật tiến độ khảo sát địa hình cho cầu nối huyện A và huyện B','2024-12-19 10:00:00'),('d07a1c8a-45d3-47e2-8087-46595d8d9d75','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','cập nhật nhiệm vụ','Bắt đầu công tác sửa chữa công trình phụ trợ','2024-12-19 14:32:00'),('fbc7d290-bfa4-49d0-8f89-bcfb72d713a9','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','cập nhật nhiệm vụ','Hoàn thành việc chuẩn bị tài liệu học trực tuyến','2024-12-18 13:11:15');
/*!40000 ALTER TABLE `activity_log` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-19 23:46:18
