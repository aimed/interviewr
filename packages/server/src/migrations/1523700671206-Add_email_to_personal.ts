import {MigrationInterface, QueryRunner} from "typeorm";

export class Add_email_to_personal1523700671206 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `skill_group_skill_group` (`skillId` int(11) NOT NULL, `skillGroupId` int(11) NOT NULL, PRIMARY KEY(`skillId`, `skillGroupId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `application_skills_skill` (`applicationId` int(11) NOT NULL, `skillId` int(11) NOT NULL, PRIMARY KEY(`applicationId`, `skillId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `application_work_work` (`applicationId` int(11) NOT NULL, `workId` int(11) NOT NULL, PRIMARY KEY(`applicationId`, `workId`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `application_education_education` (`applicationId` int(11) NOT NULL, `educationId` int(11) NOT NULL, PRIMARY KEY(`applicationId`, `educationId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `interviewr`.`personal` ADD `email` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `interviewr`.`work` ADD `role` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `interviewr`.`personal` CHANGE `phone` `phone` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `interviewr`.`application` CHANGE `draft` `draft` tinyint(4) NOT NULL DEFAULT 1");
        await queryRunner.query("ALTER TABLE `skill_group_skill_group` ADD CONSTRAINT `fk_86c5f8748922b5f4ef1d941b703` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`)");
        await queryRunner.query("ALTER TABLE `skill_group_skill_group` ADD CONSTRAINT `fk_b0ae8285b24bf8e359056364aa5` FOREIGN KEY (`skillGroupId`) REFERENCES `skill_group`(`id`)");
        await queryRunner.query("ALTER TABLE `application_skills_skill` ADD CONSTRAINT `fk_40a4d7a10df99087b7050408201` FOREIGN KEY (`applicationId`) REFERENCES `application`(`id`)");
        await queryRunner.query("ALTER TABLE `application_skills_skill` ADD CONSTRAINT `fk_200a22fe641b1ee1a0ca6c7863b` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`)");
        await queryRunner.query("ALTER TABLE `application_work_work` ADD CONSTRAINT `fk_04df96aa780e7140050ca91945b` FOREIGN KEY (`applicationId`) REFERENCES `application`(`id`)");
        await queryRunner.query("ALTER TABLE `application_work_work` ADD CONSTRAINT `fk_4b1b009d33e63a2581da703d963` FOREIGN KEY (`workId`) REFERENCES `work`(`id`)");
        await queryRunner.query("ALTER TABLE `application_education_education` ADD CONSTRAINT `fk_0201c3d24f368651b9f5815d9be` FOREIGN KEY (`applicationId`) REFERENCES `application`(`id`)");
        await queryRunner.query("ALTER TABLE `application_education_education` ADD CONSTRAINT `fk_23e2b8732cd3f718721755d90a9` FOREIGN KEY (`educationId`) REFERENCES `education`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `application_education_education` DROP FOREIGN KEY `fk_23e2b8732cd3f718721755d90a9`");
        await queryRunner.query("ALTER TABLE `application_education_education` DROP FOREIGN KEY `fk_0201c3d24f368651b9f5815d9be`");
        await queryRunner.query("ALTER TABLE `application_work_work` DROP FOREIGN KEY `fk_4b1b009d33e63a2581da703d963`");
        await queryRunner.query("ALTER TABLE `application_work_work` DROP FOREIGN KEY `fk_04df96aa780e7140050ca91945b`");
        await queryRunner.query("ALTER TABLE `application_skills_skill` DROP FOREIGN KEY `fk_200a22fe641b1ee1a0ca6c7863b`");
        await queryRunner.query("ALTER TABLE `application_skills_skill` DROP FOREIGN KEY `fk_40a4d7a10df99087b7050408201`");
        await queryRunner.query("ALTER TABLE `skill_group_skill_group` DROP FOREIGN KEY `fk_b0ae8285b24bf8e359056364aa5`");
        await queryRunner.query("ALTER TABLE `skill_group_skill_group` DROP FOREIGN KEY `fk_86c5f8748922b5f4ef1d941b703`");
        await queryRunner.query("ALTER TABLE `interviewr`.`application` CHANGE `draft` `draft` tinyint(4) NOT NULL");
        await queryRunner.query("ALTER TABLE `interviewr`.`personal` CHANGE `phone` `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci");
        await queryRunner.query("ALTER TABLE `interviewr`.`work` DROP `role`");
        await queryRunner.query("ALTER TABLE `interviewr`.`personal` DROP `email`");
        await queryRunner.query("DROP TABLE `application_education_education`");
        await queryRunner.query("DROP TABLE `application_work_work`");
        await queryRunner.query("DROP TABLE `application_skills_skill`");
        await queryRunner.query("DROP TABLE `skill_group_skill_group`");
    }

}
