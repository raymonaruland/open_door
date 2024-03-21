/* 
	27-9-2018 

 */

ALTER TABLE `sahskanji`.`scl_m_staff` 
ADD COLUMN `token` TEXT NULL AFTER `is_synced`;

ALTER TABLE `sahskanji`.`scl_m_driver` 
ADD COLUMN `token` TEXT NULL AFTER `mobile_no`;

ALTER TABLE `sahskanji`.`scl_m_student` 
ADD COLUMN `token` TEXT NULL AFTER `parent_no`;

ALTER TABLE `sahskanji`.`scl_m_user` 
ADD COLUMN `token` TEXT NULL AFTER `mobile`;


ALTER TABLE `scl_m_staff` CHANGE COLUMN `token` `token` TEXT CHARACTER SET 'big5' COLLATE 'big5_chinese_ci' NULL DEFAULT NULL ;

ALTER TABLE `scl_m_student` CHANGE COLUMN `token` `token` TEXT CHARACTER SET 'big5' COLLATE 'big5_chinese_ci' NULL DEFAULT NULL ;

ALTER TABLE `scl_m_driver` CHANGE COLUMN `token` `token` TEXT CHARACTER SET 'big5' COLLATE 'big5_chinese_ci' NULL DEFAULT NULL ;

ALTER TABLE `scl_m_user` CHANGE COLUMN `token` `token` TEXT CHARACTER SET 'big5' COLLATE 'big5_chinese_ci' NULL DEFAULT NULL ;

CREATE TABLE `scl_t_exam_grade_report` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exam_id` VARCHAR(45) NULL,
  `class_name` VARCHAR(45) NULL,
  `sec_name` VARCHAR(45) NULL,
  `student_id` VARCHAR(45) NULL,
  `total_mark` VARCHAR(45) NULL,
  `percentage` VARCHAR(45) NULL,
  `grade` VARCHAR(45) NULL,
  `created_dt` DATE NOT NULL,
  `lastupdate_ts` TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`));


-- 20/01/2020
ALTER TABLE `scl_m_device` CHANGE COLUMN `school_id` `school_id` INT(11) NULL ;

ALTER TABLE `scl_m_driver` ADD COLUMN `profile_img` TEXT NULL AFTER `liscence_url`;

ALTER TABLE `scl_m_driver` CHANGE COLUMN `tripcards` `tripcards` VARCHAR(20) NULL ;

ALTER TABLE `scl_m_driver` 
CHANGE COLUMN `vehicles` `vehicles` VARCHAR(100) NULL ,
CHANGE COLUMN `liscence_url` `liscence_url` VARCHAR(100) NULL ,
CHANGE COLUMN `photo_url` `photo_url` VARCHAR(100) NULL ,
CHANGE COLUMN `address2` `address2` VARCHAR(255) NULL ,
CHANGE COLUMN `school_id` `school_id` INT(11) NULL DEFAULT 0,
CHANGE COLUMN `age` `age` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_m_vehicle` 
ADD COLUMN `profile_img` TEXT NULL DEFAULT NULL AFTER `photo_url`;
ALTER TABLE `sahskanji`.`scl_m_vehicle` 
CHANGE COLUMN `school_id` `school_id` INT(11) NULL DEFAULT 0 ;

ALTER TABLE `scl_m_vehicle` CHANGE COLUMN `rcbook_url` `rcbook_url` VARCHAR(100) NULL ,CHANGE COLUMN `photo_url` `photo_url` VARCHAR(100) NULL ;

--21/01/2020
ALTER TABLE `sahskanji`.`scl_m_route_plan_mapping` 
CHANGE COLUMN `status` `status` TINYINT(4) NOT NULL DEFAULT 0 ;

ALTER TABLE `sahskanji`.`scl_m_route_plan_mapping` 
CHANGE COLUMN `session` `session` VARCHAR(10) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_map_route_busstop` 
ADD COLUMN `status` VARCHAR(45) NULL DEFAULT 0 AFTER `school_id`;

ALTER TABLE `sahskanji`.`scl_m_route` 
CHANGE COLUMN `stop_list` `stop_list` VARCHAR(300) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_m_route` 
CHANGE COLUMN `area_list` `area_list` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `student_list` `student_list` VARCHAR(200) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_m_route` 
CHANGE COLUMN `school_id` `school_id` INT(11) NOT NULL DEFAULT 0 ;

--22/01/2020
ALTER TABLE `sahskanji`.`scl_map_route_busstop` 
CHANGE COLUMN `school_id` `school_id` INT(11) NOT NULL DEFAULT 0 ;

--23/01/2020
ALTER TABLE `sahskanji`.`scl_t_driver_announcement` 
CHANGE COLUMN `status` `status` INT(11) NOT NULL DEFAULT 0 ;

ALTER TABLE `sahskanji`.`scl_t_driver_announcement` 
CHANGE COLUMN `driver_id` `driver_id` VARCHAR(20) NOT NULL ;

ALTER TABLE `sahskanji`.`scl_m_student_admission` 
CHANGE COLUMN `application_no` `application_no` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `academic_year` `academic_year` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `student_name` `student_name` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `dob` `dob` DATE NULL DEFAULT NULL ,
CHANGE COLUMN `gender` `gender` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `father_name` `father_name` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `mother_name` `mother_name` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `phone_no` `phone_no` VARCHAR(15) NULL DEFAULT NULL ,
CHANGE COLUMN `occupation` `occupation` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `annual_income` `annual_income` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `religion` `religion` VARCHAR(30) NULL DEFAULT NULL ,
CHANGE COLUMN `caste` `caste` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `admission_class` `admission_class` VARCHAR(5) NULL DEFAULT NULL ,
CHANGE COLUMN `adher_no` `adher_no` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `transport_req` `transport_req` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `rte_status` `rte_status` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `admission_status` `admission_status` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `status` `status` TINYINT(4) NULL DEFAULT 0 ;

--27-01-2020

ALTER TABLE `scl_t_exam_results_new` 
CHANGE COLUMN `exam_id` `exam_id` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `class_name` `class_name` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `sec_name` `sec_name` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `student_id` `student_id` VARCHAR(20) NULL DEFAULT NULL ,
CHANGE COLUMN `sub_id` `sub_id` VARCHAR(200) NULL DEFAULT NULL ,
CHANGE COLUMN `sub_name` `sub_name` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `sub_mark` `sub_mark` INT(20) NULL DEFAULT NULL ,
CHANGE COLUMN `grade` `grade` VARCHAR(20) NULL DEFAULT NULL ;

ALTER TABLE `scl_t_exam_results_new` 
CHANGE COLUMN `sub_mark` `sub_mark` VARCHAR(10) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_t_exam_schedule` 
CHANGE COLUMN `publish` `publish` TINYINT(4) NULL DEFAULT NULL ;

-- 31-01-2020

ALTER TABLE `sahskanji`.`scl_t_live_geo` 
CHANGE COLUMN `devicetype` `devicetype` VARCHAR(100) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_t_live_geo` 
CHANGE COLUMN `smart_device_status` `smart_device_status` VARCHAR(100) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_t_live_geo` 
CHANGE COLUMN `school_id` `school_id` INT(11) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_t_staff_attendance` 
CHANGE COLUMN `attendance_type` `attendance_type` VARCHAR(30) NOT NULL ;

ALTER TABLE `sahskanji`.`scl_m_fees` 
CHANGE COLUMN `rte_status` `rte_status` VARCHAR(10) NULL DEFAULT NULL ,
CHANGE COLUMN `fee_total` `fee_total` INT(11) NULL DEFAULT NULL ;

CREATE TABLE `scl_t_driver_announcement` (`id` int(11) NOT NULL,`driver_id` varchar(20) NOT NULL,`driver_number` varchar(15) NOT NULL,`driver_message` text NOT NULL,`created_dt` date NOT NULL,`lastupdate_ts` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),`status` int(11) NOT NULL DEFAULT 0);

ALTER TABLE `scl_t_driver_announcement` ADD PRIMARY KEY (`id`);

ALTER TABLE `scl_t_driver_announcement` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;

ALTER TABLE `scl_t_student_attendence_entry` CHANGE COLUMN `student_name` `student_name` VARCHAR(50) NULL DEFAULT NULL ;

--06-02-2020

ALTER TABLE `sahskanji`.`scl_m_busstops` 
CHANGE COLUMN `address` `address` VARCHAR(255) NULL DEFAULT NULL ;

ALTER TABLE `sahskanji`.`scl_m_busstops` 
ADD COLUMN `bus_fee_amt` VARCHAR(45) NULL DEFAULT 0 AFTER `address`;

-- 07-02-2020
ALTER TABLE `sahskanji`.`scl_m_fee_items` 
CHANGE COLUMN `fee_item_amt` `fee_item_amt` DOUBLE NOT NULL DEFAULT 0 ,
CHANGE COLUMN `fee_item_note` `fee_item_note` VARCHAR(1000) NULL DEFAULT NULL ,
CHANGE COLUMN `status` `status` TINYINT(4) NOT NULL DEFAULT 0 ;

ALTER TABLE `sahskanji`.`scl_m_fee_class_sec_mapping` 
CHANGE COLUMN `sec_name` `sec_name` VARCHAR(5) NULL ;

ALTER TABLE `sahskanji`.`scl_m_fee_class_sec_mapping` 
CHANGE COLUMN `fee_amt` `fee_amt` DOUBLE NULL ,
CHANGE COLUMN `status` `status` TINYINT(4) NOT NULL DEFAULT 0 ;

--14-02-2020

ALTER TABLE `sahskanji`.`scl_m_group_member` 
CHANGE COLUMN `mem_type` `mem_type` VARCHAR(50) NULL ;

ALTER TABLE `sahskanji`.`scl_m_subject` 
CHANGE COLUMN `sub_paper_status` `sub_paper_status` VARCHAR(5) NULL ;

ALTER TABLE `sahskanji`.`scl_m_user` 
CHANGE COLUMN `school_id` `school_id` INT(11) NULL ;

ALTER TABLE `sahskanji`.`scl_user_role_map` 
CHANGE COLUMN `user_id` `user_id` VARCHAR(50) NULL ;

ALTER TABLE `scl_t_student_attendence_entry` CHANGE COLUMN `status` `status` TINYINT(4) NULL DEFAULT NULL ;
ALTER TABLE `scl_t_student_attendence_entry`
CHANGE COLUMN `student_name` `student_name` VARCHAR(50) NULL DEFAULT NULL ,
CHANGE COLUMN `absent_alert_status` `absent_alert_status` TINYINT(4) NULL DEFAULT NULL ,
CHANGE COLUMN `school_id` `school_id` INT(11) NULL DEFAULT NULL ;
ALTER TABLE `scl_t_student_attendence_entry` ADD `created_ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `created_dt`;


-- 25.08.2020

ALTER TABLE `sahskanji`.`scl_t_test_result` 
ADD COLUMN `subject_id` TEXT NULL AFTER `test_id`;

ALTER TABLE `scl_t_test_result` CHANGE `subject_id` `subject_id` VARCHAR(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;