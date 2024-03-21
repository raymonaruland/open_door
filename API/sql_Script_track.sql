
-- Sesuraj 24.05.2023
CREATE TABLE `m_projects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(20) NOT NULL,
  `product_id` varchar(20) DEFAULT NULL,
  `client` varchar(20) DEFAULT NULL,
  `description` text,
  `created_dt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastupdate_ts` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ;