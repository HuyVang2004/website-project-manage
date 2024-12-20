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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `task_id` varchar(36) NOT NULL,
  `created_by` varchar(36) NOT NULL,
  `content` text NOT NULL,
  `created_time` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`comment_id`),
  KEY `task_id` (`task_id`),
  KEY `created_by` (`created_by`),
  KEY `ix_comments_comment_id` (`comment_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('392d6bb9-4b3c-46fc-b67f-8bb828743d01','9a3f5172-d72b-4a1e-b7f7-d25b91f7f674','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','Đã hoàn thành các thử nghiệm gameplay ban đầu.','2024-12-19 11:15:00'),('3c8be560-3ff4-4b95-9d5b-d7e9b5f37b9e','8e983db6-b3de-47b5-8a30-5c1b3469b56f','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','Chuẩn bị vật liệu và nhân lực cho công tác xây dựng cầu mới.','2024-12-19 10:20:00'),('5b4d61cc-37ba-4385-94ae-98c8555976a0','7f0165d4-b2b9-42c6-b9fa-2276f34773a7','94cc80b2-ec3c-4747-b1d7-2d53f0db697f','Đang chuẩn bị vật liệu và thiết bị cho thi công móng cầu.','2024-12-19 09:50:00'),('5caa9f6f-735d-4a64-b6e6-6d7f9a4a2c2b','5d070f7f-40d9-4b0d-8579-0ff859b8c52f','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','Đang chuẩn bị thuốc men và các vật tư y tế cho việc cung cấp.','2024-12-19 09:42:00'),('7ad8d7ae-1234-4567-abcd-5678ef90ab12','abcd1234-5678-9abc-def0-1234567890ab','c91d95e4-907f-4a53-9266-d803dd2abdf7','Chương trình đào tạo kỹ năng mềm cho học viên đã bắt đầu và đang tiến hành.','2024-12-18 13:05:13'),('91b1188d-3b63-4ea0-b7b3-d1e51c83a6c3','aeb2c9ff-1583-41ff-9243-1bcd41c7c913','7c8f6a5f-8740-46bb-91bc-b57e9c4ac045','Chuẩn bị tài liệu cho chức năng quản lý môn học.','2024-12-19 11:40:00'),('a5f456d2-16d0-4a2a-8b57-184efdb9bde4','be1e1a32-5427-4c89-90fc-687a40e5b7d0','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','Đã hoàn thành việc kiểm tra và thay thế đường ray tại khu vực Hà Nội.','2024-12-19 14:20:00'),('a8f17b3a-4ea5-43f7-a915-e328ffbbbc74','b7e34729-7e82-4530-a3da-eec13976454b','d98a612b-9d76-4d5c-901f-d730f0e4e6c1','Sửa chữa nhà cho các gia đình bị thiệt hại trong lũ.','2024-12-19 09:44:00'),('ab53bcb7-6d43-4782-bd64-e3f49f1f5c5e','c3b4f56e-28f9-4e0f-9d2a-27692b7565e3','d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','Đang thiết kế giao diện web cho hệ thống quản lý sinh viên.','2024-12-19 11:18:00'),('ad7eae51-c8f7-485f-bb8b-e4048a38a423','9a4d5172-c28a-4e2c-bb7f-96d086efb974','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','Đã hoàn thành việc khảo sát địa hình cho cầu.','2024-12-19 09:45:00'),('b24bc0c0-72ac-44a9-8d16-5ef5f3ffeb2f','7c1b5e94-dc38-4001-a351-02b508f89722','d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','Chuẩn bị tài liệu và vật liệu cho công tác sửa chữa công trình phụ trợ.','2024-12-19 14:22:00'),('b268ef1c-64c9-4c6a-bd98-cf431c179350','8e4e2a56-2833-4a6b-b66d-8c98e70d0e6b','e38a45b1-f1e4-4edb-bde1-4264749b72c1','Chờ kết quả phân tích yêu cầu để bắt đầu phát triển hệ thống quản lý khóa học.','2024-12-18 13:25:00'),('b5f8ed9a-91bb-4d7f-8f3a-30acb5402a5d','dcba4321-6789-abc0-fed1-9876543210ab','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','Đang chuẩn bị tài liệu học cho nền tảng học trực tuyến.','2024-12-18 13:06:43'),('b93434a6-b7f9-4a56-8a16-e6a6d41b98d1','c12e917a-48d7-4422-bf01-4e35bc3cfb07','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','Đang hoàn thiện bản thiết kế giao diện người dùng và phân tích yêu cầu.','2024-12-18 13:20:00'),('bacf077a-7022-4e93-9881-310eed02d368','1e806e26-3705-4b21-a360-34aba7b2869e','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','Đang hoàn thiện thiết kế và chuẩn bị vật tư cho hệ thống chiếu sáng.','2024-12-18 13:13:45'),('c5035b97-29ae-4a3b-bb72-fb10c431731b','b45235d1-54e2-457e-a9e3-e3d694b9e404','57b1c906-8889-477b-b1f2-0e4dba82d8b5','Đang làm việc với mô hình 3D cho nhân vật chính.','2024-12-19 11:20:00'),('c635cbf7-c7b1-4f09-a0b6-09e67f858e2b','946d3781-79e0-4db5-b684-d195c6a4ea4d','b517d10d-c88a-4e56-b019-e67f6a3d1b58','Đang nghiên cứu các giải pháp tích hợp thanh toán và hệ thống đánh giá.','2024-12-18 13:30:00'),('c8abf2ab-db92-4aa7-aa7c-ac505a133ee6','1d937942-e4c8-4e6a-8bd1-271a2fc284bd','07e4797a-9cab-463b-8938-75a00bc2fde9','Đang chuẩn bị vật liệu và các thiết bị cho dải phân cách.','2024-12-18 13:11:53'),('cdf54d4d-9840-4cd7-938d-4ce039faa347','2838bfa3-c846-4a5e-bea1-151674d0b89c','07e4797a-9cab-463b-8938-75a00bc2fde9','Đã hoàn thành việc giải phóng mặt bằng, chuẩn bị thi công.','2024-12-18 13:10:15'),('d50f6f43-784d-4d2d-b43d-c8a4d549efae','c0a7e1b7-6ac9-4e2f-b93c-51cfa91d453b','b78c9edb-0ad2-43f6-94f0-746bed8a0106','Đang lên kế hoạch cho công tác tháo dỡ cầu cũ.','2024-12-19 10:18:00'),('dcb6df5f-bc44-4f9b-bb65-32075ab8d1c7','47b2ab83-5e77-42bb-b939-e47b894cded1','c27d52b8-c6d7-437d-85a0-452a330dbb35','Đã phân phối thực phẩm cứu trợ tới một số khu vực. Tiến hành tiếp tục.','2024-12-19 09:40:00'),('fe9cc21b-cad3-4f99-a7b5-2e015440e03a','7a2f549d-cb87-4d58-9b96-1fdfc4ae98f2','b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','Đang xây dựng cơ sở dữ liệu và cấu trúc bảng cho thông tin sinh viên.','2024-12-19 11:20:00');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
