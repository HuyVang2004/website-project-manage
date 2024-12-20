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
-- Table structure for table `project_teams`
--

DROP TABLE IF EXISTS `project_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_teams` (
  `project_team_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `project_id` varchar(36) NOT NULL,
  `role` varchar(100) NOT NULL,
  `join_time` datetime NOT NULL DEFAULT (now()),
  PRIMARY KEY (`project_team_id`),
  KEY `user_id` (`user_id`),
  KEY `project_id` (`project_id`),
  KEY `ix_project_teams_project_team_id` (`project_team_id`),
  CONSTRAINT `project_teams_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `project_teams_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_teams`
--

LOCK TABLES `project_teams` WRITE;
/*!40000 ALTER TABLE `project_teams` DISABLE KEYS */;
INSERT INTO `project_teams` VALUES ('0f1a8a1e-e1ad-4c16-8c7a-5b6b4c6a5ff0','d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','quản lý','2024-12-19 14:15:00'),('12b8e9d9-8f55-4063-91e7-fd78c35e167d','e5d7f0b7-7596-4c0c-b928-b6f83c432bc9','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','thành viên','2024-12-19 11:32:00'),('20c0ac6e-3caf-4b94-8411-0758038085d4','07e4797a-9cab-463b-8938-75a00bc2fde9','343a8766-9ac2-4d28-9504-16c85d3ac700','thành viên','2024-12-18 13:02:00'),('2345ac6e-3caf-4b94-8411-0758038085d5','c27d52b8-c6d7-437d-85a0-452a330dbb35','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','thành viên','2024-12-19 09:32:00'),('3456ac7f-72a2-4db1-97c6-bd59f93a098f','cc71ffb7-d08c-4632-bb3a-66f423fc91d4','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','thành viên','2024-12-19 09:34:00'),('378d602d-9a7e-4c3d-a45f-9db5f174617b','b78c9edb-0ad2-43f6-94f0-746bed8a0106','1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','thành viên','2024-12-19 10:16:00'),('4567bc9f-5431-4d87-b39b-4ef7f92a312e','d98a612b-9d76-4d5c-901f-d730f0e4e6c1','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','thành viên','2024-12-19 09:35:00'),('4a1d7e62-15b5-47ad-b029-446c1f62c5f5','7c8f6a5f-8740-46bb-91bc-b57e9c4ac045','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','quản lý','2024-12-19 11:30:00'),('59b790f7-d1db-4932-8e56-d10b3c0fa0f1','a1d826e7-01d7-44c8-a9e6-f4e71e7d2415','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','quản lý','2024-12-19 09:30:00'),('7d8c9b0f-78cd-43b5-8e1c-d1249f81b6d5','a1b2c3d4-e5f6-7890-gh12-34i567j89kl0','a987f236-2e42-429a-b45a-34894d13f32f','quản lý','2024-12-18 12:58:45'),('7e67c09d-52b1-46e5-b37c-b23b013ef3a5','f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','0b64a6e5-3a0f-4555-a6e0-f688cf5bcbb4','thành viên','2024-12-19 14:17:00'),('84cd0f63-81e6-4e3c-bf13-ebc4c613c117','eaf3ab63-de54-48ff-8ff6-230473b64b94','343a8766-9ac2-4d28-9504-16c85d3ac700','quản lý','2024-12-18 12:59:25'),('88c1b6f1-7b08-43e5-b706-949f847e7f65','acfb67b9-b6f5-47ad-a44a-f01eae46db69','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','quản lý','2024-12-19 11:00:00'),('9b31a74d-3309-4bbb-a747-a2ae2faa824f','1ebed2d6-5d0b-43b1-abc7-4b64c062e191','343a8766-9ac2-4d28-9504-16c85d3ac700','thành viên','2024-12-18 13:01:43'),('a12e6f34-c1d2-4a67-9b13-4b38907a7cd4','c91d95e4-907f-4a53-9266-d803dd2abdf7','a987f236-2e42-429a-b45a-34894d13f32f','thành viên','2024-12-18 13:01:01'),('a8b9cc8f-46ad-4e6f-8f67-084e43a26736','b517d10d-c88a-4e56-b019-e67f6a3d1b58','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','thành viên','2024-12-18 13:18:00'),('abcd0f63-81e6-4e3c-bf13-ebc4c613c118','f3a1bc62-01a7-4d82-b9f9-daff8d8f77fd','bb3c8769-a8be-4d75-93a1-00a4f31ecb62','quản lý','2024-12-19 09:30:00'),('ae14e897-4845-40bc-a2a0-dff4516a61fa','13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','thành viên','2024-12-18 13:16:00'),('b3815a35-dc71-4bbd-97ae-0b745cd2b8c4','f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','thành viên','2024-12-19 09:35:00'),('b4c0ae3a-0d24-4bdb-bdb5-06e8329e7b50','ba87ab63-2f54-4a88-8d94-938d3a8d9b92','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','quản lý','2024-12-18 13:15:00'),('b5c8e617-d9cd-44db-96e2-f7986be33850','f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','1f48b0c7-b272-4da1-a29c-c8dbd75c0a92','quản lý','2024-12-19 10:15:00'),('c54fa2d3-810f-4b3a-bd63-28c04552d3f2','e38a45b1-f1e4-4edb-bde1-4264749b72c1','d5fef5ad-e5ab-4a5b-a1ad-4c5ebd038944','thành viên','2024-12-18 13:17:00'),('c7a67b65-1c53-4f3e-8d50-28b1e3ea67b3','57b1c906-8889-477b-b1f2-0e4dba82d8b5','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','thành viên','2024-12-19 11:10:00'),('d23f9b0e-1e5b-4314-bdd5-e59d920f9cc4','d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','a987f236-2e42-429a-b45a-34894d13f32f','thành viên','2024-12-18 13:01:45'),('e2833bc9-e343-490f-bb27-2cd79a94586d','b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','quản lý','2024-12-19 11:15:00'),('ed0097b5-e3ae-4ad2-ae6a-54e7a2e8cd56','94cc80b2-ec3c-4747-b1d7-2d53f0db697f','a7cdde68-104e-4d89-b6bb-b8c5d2f8e324','thành viên','2024-12-19 09:40:00'),('ee4b3511-876a-4b82-a426-e1c7b4c6f98d','d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','4b0f68c0-bf51-4b3f-9d1b-b11e5a20482a','thành viên','2024-12-19 11:16:00'),('f2d837a5-b69d-46b1-a626-88d7097ab30e','fa2e6d73-1b70-4c3a-a24a-983fd120bb49','e5cd7d68-0a7c-48d1-bbc4-0105d9c626b9','thành viên','2024-12-19 11:05:00'),('f3ba201c-1375-4f87-8b2d-f21efa786d3c','75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','343a8766-9ac2-4d28-9504-16c85d3ac700','thành viên','2024-12-18 13:01:22');
/*!40000 ALTER TABLE `project_teams` ENABLE KEYS */;
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
