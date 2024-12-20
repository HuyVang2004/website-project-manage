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
-- Table structure for table `project_documents`
--

DROP TABLE IF EXISTS `project_documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_documents` (
  `document_id` varchar(36) NOT NULL,
  `project_id` varchar(36) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_by` varchar(36) NOT NULL,
  `uploaded_time` datetime NOT NULL DEFAULT (now()),
  `description` text,
  PRIMARY KEY (`document_id`),
  KEY `project_id` (`project_id`),
  KEY `uploaded_by` (`uploaded_by`),
  KEY `ix_project_documents_document_id` (`document_id`),
  CONSTRAINT `project_documents_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `project_documents_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_documents`
--

LOCK TABLES `project_documents` WRITE;
/*!40000 ALTER TABLE `project_documents` DISABLE KEYS */;
INSERT INTO `project_documents` VALUES ('1cf9b597-8a9f-49d5-8482-50d946a6e7fe','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','Thiết kế cầu nối huyện A và huyện B.pdf','/documents/thiet_ke_cau.pdf','94cc80b2-ec3c-4747-b1d7-2d53f0db697f','2024-12-19 10:10:00','Thiết kế cầu nối giữa huyện A và huyện B'),('2ab5b9a4-2d72-4b7e-8cd6-ec2a62a8e251','1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','CauBenLuc_ThiếtKế.pdf','/documents/cau_ben_luc_thiet_ke.pdf','b78c9edb-0ad2-43f6-94f0-746bed8a0106','2024-12-19 10:28:00','Thiết kế cải tạo cầu Bến Lức'),('38d6e2c0-61b2-4a1f-9009-82f6e6c12b9c','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','game_design_document.pdf','/documents/game_design_black_myth.pdf','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','2024-12-19 11:50:00','Tài liệu thiết kế game Black Myth Wukong'),('78d45c17-d98d-4c7c-b104-b0efc6b5f248','0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','Kế hoạch bảo trì đường sắt.pdf','/documents/ke_hoach_bao_tri.pdf','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','2024-12-19 14:35:00','Kế hoạch bảo trì và nâng cấp tuyến đường sắt Hà Nội - Lào Cai'),('ba06f4f7-c98e-4798-82b9-cfc9715d08b1','a987f236-2e42-429a-b45a-34894d13f32f','Chuong_trinh_hoc_truc_tuyen.pdf','/documents/chuong_trinh_hoc_truc_tuyen.pdf','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','2024-12-18 13:13:45','Chương trình học trực tuyến'),('ce2c1d4f-e55e-4aec-9dac-d8bd3967efe7','343a8766-9ac2-4d28-9504-16c85d3ac700','Thiet_ke_quy_hoach_duong.pdf','/documents/thiet_ke_quy_hoach.pdf','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','2024-12-18 13:24:43','Thiết kế quy hoạch mở rộng tỉnh lộ 166'),('dbf5b227-7c89-4b16-b315-e3e51534ab89','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','Thiet_ke_ho_tro_lu_lut.pdf','/documents/ho_tro_lu_lut.pdf','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','2024-12-19 10:05:00','Thiết kế hỗ trợ cứu trợ lũ lụt Miền Bắc'),('e12b4c3d-8f32-43f7-b7d8-4adf22738f29','a987f236-2e42-429a-b45a-34894d13f32f','Ke_hoach_dao_tao_ky_nang.pdf','/documents/ke_hoach_dao_tao.pdf','c91d95e4-907f-4a53-9266-d803dd2abdf7','2024-12-18 13:12:20','Kế hoạch đào tạo kỹ năng mềm cho học viên'),('f0abcb79-f2e4-46c5-933f-2497b5db064b','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','Design_Requirement_LMS.pdf','/documents/design_requirement_lms.pdf','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','2024-12-18 13:45:00','Tài liệu yêu cầu thiết kế phần mềm LMS');
/*!40000 ALTER TABLE `project_documents` ENABLE KEYS */;
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
