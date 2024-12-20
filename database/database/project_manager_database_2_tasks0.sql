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
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `task_id` varchar(36) NOT NULL,
  `project_id` varchar(36) NOT NULL,
  `task_name` varchar(100) NOT NULL,
  `assigned_to` varchar(36) DEFAULT NULL,
  `status` varchar(100) NOT NULL,
  `due_date` datetime NOT NULL,
  `priority` varchar(50) NOT NULL,
  `budget` int NOT NULL,
  `create_time` datetime NOT NULL DEFAULT (now()),
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `project_id` (`project_id`),
  KEY `assigned_to` (`assigned_to`),
  KEY `ix_tasks_task_id` (`task_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES ('1d937942-e4c8-4e6a-8bd1-271a2fc284bd','343a8766-9ac2-4d28-9504-16c85d3ac700','Xây dựng dải phân cách và làn đường','07e4797a-9cab-463b-8938-75a00bc2fde9','chưa bắt đầu','2025-06-20 05:49:51','cao',1000,'2024-12-18 12:54:23',NULL),('1e806e26-3705-4b21-a360-34aba7b2869e','343a8766-9ac2-4d28-9504-16c85d3ac700','Lắp đặt biển báo và hệ thống chiếu sáng','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','chưa bắt đầu','2025-10-20 05:49:51','trung bình',1300,'2024-12-18 12:55:44',NULL),('2838bfa3-c846-4a5e-bea1-151674d0b89c','343a8766-9ac2-4d28-9504-16c85d3ac700','chuẩn bị mặt bằng thi công','07e4797a-9cab-463b-8938-75a00bc2fde9','đang tiến hành','2025-02-18 05:49:51','cao',2000,'2024-12-18 12:52:21',NULL),('38b70a1e-1ca9-404e-b93d-ded4dff477b5','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','Hoàn thiện cầu và kiểm tra chất lượng','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','chưa bắt đầu','2025-12-15 05:49:51','trung bình',3000,'2024-12-19 09:25:00',NULL),('47b2ab83-5e77-42bb-b939-e47b894cded1','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','Phân phối thực phẩm cứu trợ','c27d52b8-c6d7-437d-85a0-452a330dbb35','đang tiến hành','2025-01-05 10:00:00','cao',5000,'2024-12-19 09:20:00',NULL),('5d070f7f-40d9-4b0d-8579-0ff859b8c52f','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','Cung cấp thuốc men và vật tư y tế','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','chưa bắt đầu','2025-01-15 10:00:00','trung bình',4000,'2024-12-19 09:22:10',NULL),('7a2f549d-cb87-4d58-9b96-1fdfc4ae98f2','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','Xây dựng cơ sở dữ liệu sinh viên','b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','chưa bắt đầu','2025-03-01 08:00:00','cao',1500,'2024-12-19 11:12:00',NULL),('7c1b5e94-dc38-4001-a351-02b508f89722','0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','Sửa chữa các công trình phụ trợ (cầu, hầm)','d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','chưa bắt đầu','2025-04-30 10:00:00','trung bình',3000,'2024-12-19 14:12:00',NULL),('7f0165d4-b2b9-42c6-b9fa-2276f34773a7','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','Thi công móng cầu','94cc80b2-ec3c-4747-b1d7-2d53f0db697f','chưa bắt đầu','2025-03-01 05:49:51','cao',2000,'2024-12-19 09:20:00',NULL),('8e4e2a56-2833-4a6b-b66d-8c98e70d0e6b','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','Xây dựng hệ thống quản lý khóa học','e38a45b1-f1e4-4edb-bde1-4264749b72c1','chưa bắt đầu','2025-03-15 08:30:00','cao',5000,'2024-12-18 13:05:00',NULL),('8e983db6-b3de-47b5-8a30-5c1b3469b56f','1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','Xây dựng cầu mới','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','chưa bắt đầu','2025-04-30 08:00:00','cao',3000,'2024-12-19 10:12:00',NULL),('946d3781-79e0-4db5-b684-d195c6a4ea4d','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','Tích hợp hệ thống thanh toán và đánh giá','b517d10d-c88a-4e56-b019-e67f6a3d1b58','chưa bắt đầu','2025-05-01 08:30:00','trung bình',3500,'2024-12-18 13:10:00',NULL),('9a3f5172-d72b-4a1e-b7f7-d25b91f7f674','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','Phát triển gameplay cơ bản','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','đang tiến hành','2025-03-01 05:49:51','cao',3000,'2024-12-19 10:45:00',NULL),('9a4d5172-c28a-4e2c-bb7f-96d086efb974','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','Khảo sát địa hình','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','đang tiến hành','2025-01-15 05:49:51','cao',1500,'2024-12-19 09:15:00',NULL),('a7e6f5a1-bb84-4d8a-8b7d-b9446d473348','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','Tạo môi trường và cấp độ trong game','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','chưa bắt đầu','2025-09-01 05:49:51','thấp',1500,'2024-12-19 10:55:00',NULL),('abcd1234-5678-9abc-def0-1234567890ab','a987f236-2e42-429a-b45a-34894d13f32f','Tổ chức chương trình đào tạo kỹ năng mềm','c91d95e4-907f-4a53-9266-d803dd2abdf7','đang tiến hành','2025-05-10 09:00:00','cao',1500,'2024-12-18 12:55:01',NULL),('aeb2c9ff-1583-41ff-9243-1bcd41c7c913','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','Phát triển chức năng quản lý môn học','7c8f6a5f-8740-46bb-91bc-b57e9c4ac045','chưa bắt đầu','2025-04-01 08:00:00','cao',800,'2024-12-19 11:20:00',NULL),('b45235d1-54e2-457e-a9e3-e3d694b9e404','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','Tạo mô hình nhân vật chính','57b1c906-8889-477b-b1f2-0e4dba82d8b5','chưa bắt đầu','2025-06-01 05:49:51','trung bình',2000,'2024-12-19 10:50:00',NULL),('b7e34729-7e82-4530-a3da-eec13976454b','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','Sửa chữa nhà cửa cho bà con','d98a612b-9d76-4d5c-901f-d730f0e4e6c1','chưa bắt đầu','2025-01-25 10:00:00','thấp',3000,'2024-12-19 09:23:25',NULL),('be1e1a32-5427-4c89-90fc-687a40e5b7d0','0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','Kiểm tra và thay thế đường ray cũ','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','đang tiến hành','2025-01-31 10:00:00','cao',5000,'2024-12-19 14:10:00',NULL),('c0a7e1b7-6ac9-4e2f-b93c-51cfa91d453b','1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','Tháo dỡ cầu cũ','b78c9edb-0ad2-43f6-94f0-746bed8a0106','chưa bắt đầu','2025-01-15 08:00:00','cao',1500,'2024-12-19 10:10:00',NULL),('c12e917a-48d7-4422-bf01-4e35bc3cfb07','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','Phân tích yêu cầu và thiết kế giao diện','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','đang tiến hành','2025-01-31 08:30:00','cao',2500,'2024-12-18 13:00:00',NULL),('c3b4f56e-28f9-4e0f-9d2a-27692b7565e3','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','Thiết kế giao diện web','d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','chưa bắt đầu','2025-02-01 08:00:00','cao',1000,'2024-12-19 11:10:00',NULL),('dcba4321-6789-abc0-fed1-9876543210ab','a987f236-2e42-429a-b45a-34894d13f32f','Tạo nền tảng học trực tuyến','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','chưa bắt đầu','2025-06-20 10:00:00','trung bình',2500,'2024-12-18 12:56:23',NULL),('e8af431c-49fc-4f92-9023-7deff1ac5999','343a8766-9ac2-4d28-9504-16c85d3ac700','Kiểm tra chất lượng thi công và nghiệm thu','1ebed2d6-5d0b-43b1-abc7-4b64c062e191','chưa bắt đầu','2025-12-29 05:49:51','thấp',700,'2024-12-18 12:56:58',NULL);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
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
