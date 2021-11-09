CREATE TABLE `material_logs` (
                               `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                               `project_location_structure_item_id` BIGINT(20) UNSIGNED NOT NULL,
                               `material_id` BIGINT(20) UNSIGNED NOT NULL,
                               `price` DECIMAL(20,2) NOT NULL,
                               `in` DECIMAL(20,2) NULL DEFAULT NULL,
                               `out` DECIMAL(20,2) NULL DEFAULT NULL,
                               `balance` DECIMAL(20,2) NOT NULL,
                               `remarks` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
                               `reference_id` BIGINT(20) NULL DEFAULT NULL,
                               `reference_type_id` BIGINT(20) NULL DEFAULT NULL,
                               `created_by` BIGINT(20) UNSIGNED NOT NULL,
                               `updated_by` BIGINT(20) UNSIGNED NOT NULL,
                               `deleted_at` TIMESTAMP NULL DEFAULT NULL,
                               `created_at` TIMESTAMP NULL DEFAULT NULL,
                               `updated_at` TIMESTAMP NULL DEFAULT NULL,
                               PRIMARY KEY (`id`)
)
  COLLATE='utf8mb4_unicode_ci'
  ENGINE=InnoDB
  ROW_FORMAT=DYNAMIC
  AUTO_INCREMENT=1
;
ALTER TABLE `material_requests`
  CHANGE COLUMN `starting_inventory_id` `project_location_structure_item_id` BIGINT(20) UNSIGNED NOT NULL AFTER `id`;
ALTER TABLE `material_purchases`
  CHANGE COLUMN `starting_inventory_id` `project_location_structure_item_id` BIGINT(20) UNSIGNED NOT NULL AFTER `id`;
ALTER TABLE `material_deliveries`
  CHANGE COLUMN `starting_inventory_id` `project_location_structure_item_id` BIGINT(20) UNSIGNED NOT NULL AFTER `id`;
ALTER TABLE `material_receivings`
  CHANGE COLUMN `starting_inventory_id` `project_location_structure_item_id` BIGINT(20) UNSIGNED NOT NULL AFTER `id`;
ALTER TABLE `material_transfers`
  CHANGE COLUMN `from` `from` BIGINT(20) UNSIGNED NOT NULL COMMENT 'project_location_structure_item_id' AFTER `id`,
  CHANGE COLUMN `to` `to` BIGINT(20) UNSIGNED NOT NULL COMMENT 'project_location_structure_item_id' AFTER `from`;

CREATE TABLE IF NOT EXISTS `reference_types` (
  `id` int(11) NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_path` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table sal_db.reference_types: 14 rows
/*!40000 ALTER TABLE `reference_types` DISABLE KEYS */;
INSERT INTO `reference_types` (`id`, `code`, `name`, `class_path`, `created_at`, `updated_at`) VALUES
(1, 'MD', 'Material Delivery', 'App\\MaterialDelivery', '2020-07-27 01:37:50', '2020-07-27 01:37:50');
INSERT INTO `franco_construction_v2`.`reference_types` (`id`, `code`, `name`, `class_path`, `created_at`, `updated_at`) VALUES ('2', 'MT', 'Material Transfer', 'App\\MaterialTransfer', '2021-07-07 12:58:20', '2021-07-07 12:58:20');


-- Dumping structure for table sal_db.material_adjustments
CREATE TABLE IF NOT EXISTS `material_adjustments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_location_structure_item_id` bigint(20) unsigned NOT NULL,
  `transaction_date` date NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table sal_db.material_adjustment_details
CREATE TABLE IF NOT EXISTS `material_adjustment_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `material_adjustment_id` bigint(20) unsigned NOT NULL,
  `material_id` bigint(20) unsigned NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `system_count` decimal(20,2) NOT NULL,
  `physical_count` decimal(20,2) NOT NULL,
  `adjustment` decimal(20,2) NOT NULL,
  `physical_total` decimal(20,2) NOT NULL,
  `total_adjustment` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

/*!40000 ALTER TABLE `material_adjustment_details` ENABLE KEYS */;

-- Dumping structure for table sal_db.material_issuances
CREATE TABLE IF NOT EXISTS `material_issuances` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_location_structure_item_id` bigint(20) unsigned NOT NULL,
  `transaction_date` date NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table sal_db.material_issuance_details
CREATE TABLE IF NOT EXISTS `material_issuance_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `material_issuance_id` bigint(20) unsigned NOT NULL,
  `material_id` bigint(20) unsigned NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `qty` decimal(20,2) NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table sal_db.material_withdrawals
CREATE TABLE IF NOT EXISTS `material_withdrawals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reference_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_location_structure_item_id` bigint(20) unsigned NOT NULL,
  `transaction_date` date NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Dumping structure for table sal_db.material_withdrawal_details
CREATE TABLE IF NOT EXISTS `material_withdrawal_details` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `material_withdrawal_id` bigint(20) unsigned NOT NULL,
  `material_id` bigint(20) unsigned NOT NULL,
  `price` decimal(20,2) NOT NULL,
  `qty` decimal(20,2) NOT NULL,
  `total` decimal(20,2) NOT NULL,
  `created_by` bigint(20) unsigned NOT NULL,
  `updated_by` bigint(20) unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

INSERT INTO `franco_construction_v2`.`reference_types` (`id`, `code`, `name`, `class_path`, `created_at`, `updated_at`) VALUES ('3', 'MW', 'Material Withdrawal', 'App\\MaterialWithdrawal', '2021-07-07 15:18:05', '2021-07-07 15:18:05');
INSERT INTO `franco_construction_v2`.`reference_types` (`id`, `code`, `name`, `class_path`, `created_at`, `updated_at`) VALUES ('4', 'MI', 'Material Issuance', 'App\\MaterialIssuance', '2021-07-07 15:18:05', '2021-07-07 15:18:05');
INSERT INTO `franco_construction_v2`.`reference_types` (`id`, `code`, `name`, `class_path`, `created_at`, `updated_at`) VALUES ('5', 'MA', 'Material Adjustment', 'App\\MaterialAdjustment', '2021-07-07 15:18:05', '2021-07-07 15:18:05');