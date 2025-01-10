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
-- Table structure for table `task_role`
--

DROP TABLE IF EXISTS `task_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task_role` (
  `task_role_id` varchar(36) NOT NULL,
  `task_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `can_read` tinyint(1) NOT NULL,
  `can_change` tinyint(1) NOT NULL,
  PRIMARY KEY (`task_role_id`),
  KEY `task_id` (`task_id`),
  KEY `user_id` (`user_id`),
  KEY `ix_task_role_task_role_id` (`task_role_id`),
  CONSTRAINT `task_role_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`),
  CONSTRAINT `task_role_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task_role`
--

LOCK TABLES `task_role` WRITE;
/*!40000 ALTER TABLE `task_role` DISABLE KEYS */;
INSERT INTO `task_role` VALUES ('13faeb7d-7d30-469b-a850-4b1cf91b6947','7f0165d4-b2b9-42c6-b9fa-2276f34773a7','94cc80b2-ec3c-4747-b1d7-2d53f0db697f',1,1),('1b8cc586-34b1-42de-a533-e13c6b899416','b45235d1-54e2-457e-a9e3-e3d694b9e404','57b1c906-8889-477b-b1f2-0e4dba82d8b5',1,1),('21b32b77-84b4-495f-8a63-6e90b1045e8b','8e983db6-b3de-47b5-8a30-5c1b3469b56f','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4',1,1),('23576e4c-1567-4f74-8265-0bcd205f7053','38b70a1e-1ca9-404e-b93d-ded4dff477b5','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d',1,1),('3f87b68c-5295-45c9-8cd3-3f2bda1e60b2','8e4e2a56-2833-4a6b-b66d-8c98e70d0e6b','e38a45b1-f1e4-4edb-bde1-4264749b72c1',1,1),('45e4cd4f-0815-43ad-8a3d-c123697c7b8a','1e806e26-3705-4b21-a360-34aba7b2869e','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3',1,1),('5ba2c560-b4ed-4855-b36e-57f314b12f3a','946d3781-79e0-4db5-b684-d195c6a4ea4d','b517d10d-c88a-4e56-b019-e67f6a3d1b58',1,1),('68d1d421-8d9d-4297-aef6-828df6c8ab7d','a7e6f5a1-bb84-4d8a-8b7d-b9446d473348','fa2e6d73-1b70-4c3a-a24a-983fd120bb49',1,1),('9f639438-e135-41a7-9ef7-4328073292f6','2838bfa3-c846-4a5e-bea1-151674d0b89c','07e4797a-9cab-463b-8938-75a00bc2fde9',1,1),('a0b89f63-5198-4d52-a18b-f80bc87e39da','9a4d5172-c28a-4e2c-bb7f-96d086efb974','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d',1,1),('a1d8f50f-465e-471b-a973-c18b6fc1ec61','47b2ab83-5e77-42bb-b939-e47b894cded1','c27d52b8-c6d7-437d-85a0-452a330dbb35',1,1),('a9885e2d-013d-4c6e-bd4e-5d034e118c15','abcd1234-5678-9abc-def0-1234567890ab','c91d95e4-907f-4a53-9266-d803dd2abdf7',1,1),('b3e1a12e-9fb0-4a68-9a3a-0f3e52cb7d2f','b7e34729-7e82-4530-a3da-eec13976454b','d98a612b-9d76-4d5c-901f-d730f0e4e6c1',1,1),('c2e56709-c4cf-4774-9e6c-5998f905987f','5d070f7f-40d9-4b0d-8579-0ff859b8c52f','cc71ffb7-d08c-4632-bb3a-66f423fc91d4',1,1),('d0f80398-3cde-41b7-b9f6-56b1b65b5192','9a3f5172-d72b-4a1e-b7f7-d25b91f7f674','fa2e6d73-1b70-4c3a-a24a-983fd120bb49',1,1),('e3e4e9d9-ced5-40e5-bf5f-b3b72458935e','dcba4321-6789-abc0-fed1-9876543210ab','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68',1,1),('e837d3be-eec1-42c3-b689-dcfcb8d91b80','c12e917a-48d7-4422-bf01-4e35bc3cfb07','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d',1,1),('fb719e5d-4e0e-4697-b353-40ea3365d8f8','1d937942-e4c8-4e6a-8bd1-271a2fc284bd','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3',1,1),('fb72062a-e745-4874-a16a-d1d0b5e81ab0','c0a7e1b7-6ac9-4e2f-b93c-51cfa91d453b','b78c9edb-0ad2-43f6-94f0-746bed8a0106',1,1);
/*!40000 ALTER TABLE `task_role` ENABLE KEYS */;
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
