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
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `notification_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `message` text NOT NULL,
  `created_time` datetime NOT NULL DEFAULT (now()),
  `is_read` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_notifications_notification_id` (`notification_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('2cfe5855-cd4b-4771-b8d2-3a334d432189','b78c9edb-0ad2-43f6-94f0-746bed8a0106','Cập nhật tiến độ xây dựng cầu mới.','2024-12-19 10:23:00',0),('3e28a57b-f563-465b-a449-719903f2871b','1ebed2d6-5d0b-43b1-abc7-4b64c062e191','Nhắc nhở về thời gian nghiệm thu và kiểm tra chất lượng thi công.','2024-12-18 13:19:12',1),('3ec58a33-58b1-4c76-8f91-e35017a1bb7e','94cc80b2-ec3c-4747-b1d7-2d53f0db697f','Nhắc nhở về kiểm tra chất lượng thi công cầu.','2024-12-19 09:59:00',1),('4f9e6f36-7c55-474d-bbc7-59922e5ab2d4','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','Cập nhật tiến độ xây dựng hệ thống quản lý khóa học','2024-12-18 13:33:00',0),('5b0b29ab-1e9d-47fc-bbc1-55c3502a2ac2','ba87ab63-2f54-4a88-8d94-938d3a8d9b92','Cập nhật tiến độ phân tích yêu cầu và thiết kế giao diện','2024-12-18 13:32:00',0),('63e017c4-482d-4429-b7c9-66013cbb1a5a','d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','Cập nhật tiến độ công tác thay thế đường ray.','2024-12-19 14:24:00',0),('9eddc0e2-c394-4e84-b408-8d64aaa657b6','eaf3ab63-de54-48ff-8ff6-230473b64b94','Cập nhật tiến độ công tác chuẩn bị mặt bằng.','2024-12-18 13:16:42',0),('a1f3f112-8237-4562-8e4e-05120bb6d1ed','f3a1bc62-01a7-4d82-b9f9-daff8d8f77fd','Cập nhật tiến độ phân phối thực phẩm cứu trợ.','2024-12-19 09:50:00',0),('abc75e0a-d057-4fa7-98bb-4327bfc9b902','e38a45b1-f1e4-4edb-bde1-4264749b72c1','Nhắc nhở về tiến độ tích hợp thanh toán và đánh giá.','2024-12-18 13:35:00',1),('b2a1f317-6e1f-43a4-a9f5-1eb2e5995c7e','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','Cập nhật tình hình cung cấp thuốc men và vật tư y tế.','2024-12-19 09:52:00',0),('b325d7da-7364-4523-82d8-0ab628e20c6a','b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','Thông báo tiến độ thiết kế giao diện web.','2024-12-19 11:22:00',0),('c3b41e7f-8369-479b-b9f6-2769b3dfb618','d98a612b-9d76-4d5c-901f-d730f0e4e6c1','Thông báo tiến độ sửa chữa nhà cửa cho bà con.','2024-12-19 09:55:00',1),('c3eaa853-abe6-48db-9f56-03fae05cf3c9','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','Hoàn thành mô hình nhân vật chính và đang thử nghiệm.','2024-12-19 11:30:00',0),('c3f1223b-8039-47f2-8d22-bd3d56d5194f','d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','Cập nhật tiến độ xây dựng cơ sở dữ liệu sinh viên.','2024-12-19 11:23:00',0),('cc44f01d-4d82-44f6-869b-d42c43ec2352','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','Cập nhật công tác sửa chữa công trình phụ trợ.','2024-12-19 14:25:30',0),('d8956d99-b41b-4792-a3f6-fdcb9a602946','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','Thông báo kế hoạch tháo dỡ cầu cũ.','2024-12-19 10:22:00',0),('d9cf66d3-2b76-4a62-83fa-df5e8ffbdfbe','acfb67b9-b6f5-47ad-a44a-f01eae46db69','Cập nhật tiến độ phát triển gameplay.','2024-12-19 11:25:00',0),('dd9d4e25-9c76-4e1c-bc45-d89cb1a7d30a','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','Cập nhật tiến độ thi công móng cầu.','2024-12-19 09:57:00',0),('e1c7f18d-2921-4c4b-a48d-25b5e5c57e02','a1b2c3d4-e5f6-7890-gh12-34i567j89kl0','Cập nhật tiến độ tổ chức chương trình đào tạo kỹ năng mềm.','2024-12-18 13:07:32',0),('e5cf47bc-b19a-45ff-a46b-3b84c5d83cfb','57b1c906-8889-477b-b1f2-0e4dba82d8b5','Thông báo cập nhật tiến độ môi trường game.','2024-12-19 11:35:00',1),('f2a5d28b-4c56-4b9b-80f9-9cb5d10f2135','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','Đã hoàn thành bước chuẩn bị tài liệu nền tảng học trực tuyến.','2024-12-18 13:08:45',0),('f2eefa4c-3b99-4136-aa5d-5332d24655c6','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','Cập nhật thiết kế dải phân cách và làn đường.','2024-12-18 13:17:30',0),('f3517b82-2d6e-46c7-a081-e72e0f17180c','a1d826e7-01d7-44c8-a9e6-f4e71e7d2415','Cập nhật tiến độ khảo sát địa hình.','2024-12-19 09:55:00',0);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
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
