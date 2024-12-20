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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `email` (`email`),
  KEY `ix_users_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('07e4797a-9cab-463b-8938-75a00bc2fde9','AnhPham','$2b$12$f4vQoqpbYG6Qkytie1zi4O.nSVeloUUqJqCE8DbAJpjvgfZwIRH1i','tuananh684@gmail.com','user','2024-12-18 12:39:57',NULL,'Phạm Tuấn Anh','/images/pham_tuan_anh.jpg'),('13c7d2b8-4f2b-4a77-9d47-138e6f99d55d','LanPhuong','$2b$12$GDwyqzr36333k0oNTfA0fuVAUgna.noH8tGmpo8pmdqfWWrXwRMFy','lan.phuong@example.com','user','2024-12-18 12:41:00',NULL,'Phạm Lan Phương','/images/pham_lan_phuong.jpg'),('1ebed2d6-5d0b-43b1-abc7-4b64c062e191','DuongDai','$2b$12$C9KQs5HrjsKjg3RPWAJm5uQp0B52NKozNFHuIo8778Mfco.XhZyIq','duongnguyen682@gmail.com','user','2024-12-18 12:39:59',NULL,'Nguyễn Đại Dương','/images/nguyen_dai_duong.jpg'),('57b1c906-8889-477b-b1f2-0e4dba82d8b5','AnhDuong','$2b$12$Ebh4Mv06sJfaQ65fcZnM9.RBBoNa3cVrYyIWJWpyCwLwt9zbwGHSW','anhduong345@gmail.com','user','2024-12-19 10:40:00',NULL,'Anh Dương','/images/anh_duong.jpg'),('75bc7eb0-bb26-4521-a92a-b5c4a7e9b0f3','LamNhat','$2b$12$F8AeXtTSYn0z5QMf6.s/Ye57ouYWs/mXYDAns95JnhjnYK4xQmyrq','nhatlam2315@gmail.com','user','2024-12-18 12:39:51',NULL,'Nguyễn Nhật Lâm','/images/nguyen_nhat_lam.jpg'),('7c8f6a5f-8740-46bb-91bc-b57e9c4ac045','LanThao','$2b$12$0ik7dtCFjYXS5w8JEpS.m.YQ.al8vSwCTcPeqatWnzuY44DpXUsoi','lanthao789@gmail.com','user','2024-12-19 11:10:00',NULL,'Nguyễn Lan Thảo','/images/lan_thao.jpg'),('94cc80b2-ec3c-4747-b1d7-2d53f0db697f','HieuLong','$2b$12$xO3Cke7fNU7Kug53fzZ6j.jfFqTmIfOOdZnzTabvKLWF96e.F018a','hieulong345@gmail.com','user','2024-12-19 09:10:00',NULL,'Hiếu Long','/images/hieu_long.jpg'),('a1b2c3d4-e5f6-7890-gh12-34i567j89kl0','AnhTraiVua','$2b$12$99DNfPqggtuGlAA3lBi6NuSK4MmWL3f5WRandl9uzCvdDoaBJOrca','hoangvutranh@gmail.com','admin','2024-12-18 12:45:39',NULL,'Hoàng Vũ Tranh','/images/hoang_vu_tranh.jpg'),('a1d826e7-01d7-44c8-a9e6-f4e71e7d2415','HoangNam','$2b$12$IABny/rHSBYxkwiwTL7gpuIOVp7NalS80lWzjKiGHrfSsnld/Hkny','namhoang123@gmail.com','user','2024-12-19 09:00:00',NULL,'Hoàng Nam','/images/hoang_nam.jpg'),('acfb67b9-b6f5-47ad-a44a-f01eae46db69','NguyenBao','$2b$12$.j2x9BOWcaDWcAKbupzGGO9NS7FpRIY5LoiDKXWnEkv9B/4UDvfNq','nguyenbao123@gmail.com','user','2024-12-19 10:30:00',NULL,'Nguyễn Bảo','/images/nguyen_bao.jpg'),('b2a56b8a-ff9c-4b8a-bcb5-dbf32598e2f4','HieuHien','$2b$12$xWYq9CIxAzxJ4eq8wSSYKOGnTNm6F957MTNR6HkgmpUt4oWkogeia','hieuhien123@gmail.com','admin','2024-12-19 11:00:00',NULL,'Nguyễn Hiếu Hiền','/images/hieu_hien.jpg'),('b517d10d-c88a-4e56-b019-e67f6a3d1b58','MaiTrang','$2b$12$5/G825XNv.hQS6cXSOR.4./DGBrbrb2srLh1Et2qollfH69RmddUS','mai.trang@example.com','user','2024-12-18 12:42:30',NULL,'Lê Mai Trang','/images/le_mai_trang.jpg'),('b78c9edb-0ad2-43f6-94f0-746bed8a0106','TuanAnh','$2b$12$wdjohYLUE5SYLur5n7JpCu3WGfdaSOlCSVMK1PX8ruPsb0uvPLtOq','tuananh890@gmail.com','user','2024-12-19 10:05:00',NULL,'Nguyễn Tuấn Anh','/images/nguyen_tuan_anh.jpg'),('ba87ab63-2f54-4a88-8d94-938d3a8d9b92','MinhHieu','$2b$12$Gzd2L5xJgNKKr2SRe3OiXO4LAD2itUJ8c8OjOhcKYxjuDyEmdCGw2','minh.hieu@example.com','admin','2024-12-18 12:40:30',NULL,'Nguyễn Minh Hiếu','/images/nguyen_minh_hieu.jpg'),('c27d52b8-c6d7-437d-85a0-452a330dbb35','BaoQuan','$2b$12$wr907cAP.b/Orml2Dw8bHutVfLJ8dKCz0UfucN2E0RKmTqEsxZmI.','baoquan1234@gmail.com','user','2024-12-19 08:10:00',NULL,'Nguyễn Báo Quân','/images/nguyen_bao_quan.jpg'),('c91d95e4-907f-4a53-9266-d803dd2abdf7','HieuAnh','$2b$12$Jf3jHC.RGKQq8zBZB6KfOO/prGavzIOCSy5.72B.T1bL16PuxgZi.','hieuanh908@gmail.com','user','2024-12-18 12:50:47',NULL,'Hiếu Anh','/images/hieu_anh.jpg'),('cc71ffb7-d08c-4632-bb3a-66f423fc91d4','TuanKhanh','$2b$12$2g4NggMOsYTGWWIa5lCbTe0lf812xDhKympE8JRtdqns/DaIJAO2a','tuan.khanh567@gmail.com','user','2024-12-19 08:20:00',NULL,'Trần Tuấn Khánh','/images/tran_tuan_khanh.jpg'),('d5c1f72f-3f2f-4dff-a707-6f3fe7c1bba2','QuangHoang','$2b$12$hYIN68MjfIJoC6rsIGVG4uLOFIv96FJX7LpDJlm.UfgBeII7IX2P6','quanghoang456@gmail.com','user','2024-12-19 11:05:00',NULL,'Hoàng Quang','/images/hoang_quang.jpg'),('d6f8e3b0-8e32-4abf-b8f9-bf2a572c3e68','MinhTu','$2b$12$tO0oBj/WAzwZsx/bE/LMOeyR.KiBP1scFfGtUlTnM0gsozsGhl5Qy','tuminh1999@gmail.com','user','2024-12-18 12:48:21',NULL,'Minh Tú','/images/minh_tu.jpg'),('d94c50c9-d2b1-42e1-9f4a-028a93e7d7c0','HoangTien','$2b$12$9lElhZ.8p6l5DmEICBmVv.O7hPE010BovZOj4YEf6hbvjf3ar.CA.','tienhoang@gmail.com','user','2024-12-19 14:00:00',NULL,'Hoàng Tiến','/images/hoang_tien.jpg'),('d98a612b-9d76-4d5c-901f-d730f0e4e6c1','BaoDung','$2b$12$1tcZgH5NkuoldNmrghH6a.6zC3sXgiWNsVQuFezfWT2XaywK110be','baodung897@gmail.com','user','2024-12-19 08:30:00',NULL,'Nguyễn Báo Dũng','/images/nguyen_bao_dung.jpg'),('e38a45b1-f1e4-4edb-bde1-4264749b72c1','QuangTung','$2b$12$zVN8W2YMD6WFfkrpLZ/BcuclbmwxAsoVyPZWmx.V1O1WVG.08s67q','quang.tung@example.com','user','2024-12-18 12:42:13',NULL,'Trương Quang Tùng','/images/truong_quang_tung.jpg'),('e5d7f0b7-7596-4c0c-b928-b6f83c432bc9','ThuyMai','$2b$12$EvTd/vWF4N./Icyzc2LFvexBIwVKQXNQCiEmgsB8O/dFKGsDIDynC','thuymai321@gmail.com','user','2024-12-19 11:15:00',NULL,'Trần Thùy Mai','/images/thuy_mai.jpg'),('eaf3ab63-de54-48ff-8ff6-230473b64b94','TuanHoang','$2b$12$W8O40uR7IlMx1hXviMw6meKGmBqnVAoayRvwX03ix5yyuSyrpfBHK','HoangTuan1423@gmail.com','user','2024-12-18 12:39:39',NULL,'Nguyễn Hoàng Tuấn','/images/nguyen_hoang_tuan.jpg'),('f1c8e420-8e5c-4cfe-9f0f-12ecdb6875f7','NgocSon','$2b$12$yjRM9M0LwAJ3iNAqoEDetOmO7BInSaeEyzKdFiZx1MdegbAWPR1Gi','sonngoc2315@gmail.com','user','2024-12-19 14:05:00',NULL,'Ngọc Sơn','/images/ngoc_son.jpg'),('f3a1bc62-01a7-4d82-b9f9-daff8d8f77fd','MinhHoa','$2b$12$vZFEP6p4Fuk/fDRif1scXOdm8ilcl4K0u7ruKVS1BHoGf/mvr.4/O','hoaminh@example.com','admin','2024-12-19 08:00:00',NULL,'Hoàng Minh Hòa','/images/hoang_minh_hoa.jpg'),('f5a14c8f-8c2e-4ea1-8fa1-6a5e45ac572d','MaiLinh','$2b$12$Nyq9x7iXDQfPVyyKW5W2SeJOG/a/yJJ3M2rIKdzvwf6iE77Arvle2','maivl123@gmail.com','user','2024-12-19 09:05:00',NULL,'Mai Linh','/images/mai_linh.jpg'),('f7a27b8e-8b9c-470e-9c3c-1f29d699f5a4','MaiLan','$2b$12$u3pvRfJ6wPYwczsBcbPGDeepeDH.BC8oTP5nccS/tkfxE4/5tl/A6','lanmai567@gmail.com','user','2024-12-19 10:00:00',NULL,'Mai Lan','/images/mai_lan.jpg'),('fa2e6d73-1b70-4c3a-a24a-983fd120bb49','ThiThu','$2b$12$WYkHh0FWufQw5gLoN7Rx7e89rkRP9b8aAu4q7nYnoW1W7M/dKbOPm','thithu123@gmail.com','user','2024-12-19 10:35:00',NULL,'Thị Thu','/images/thi_thu.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
