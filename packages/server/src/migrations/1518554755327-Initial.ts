import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1518554755327 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `personal` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `nationality` varchar(255), `martialStatus` varchar(255), `numberOfChildren` varchar(255), `phone` varchar(255), `birthDate` datetime, `birthPlace` varchar(255), `firstName` varchar(255), `lastName` varchar(255), `addressLine1` varchar(255), `addressLine2` varchar(255), `addressLine3` varchar(255), `addressLine4` varchar(255), `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `skill_group` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `title` varchar(255) NOT NULL, `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `skill` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `description` varchar(255) NOT NULL, `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `work` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `startDate` datetime NOT NULL, `endDate` datetime, `description` varchar(255) NOT NULL, `employer` varchar(255) NOT NULL, `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `email` varchar(256) NOT NULL UNIQUE, `password` varchar(255) NOT NULL) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `education` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `institution` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `degree` varchar(255) NOT NULL, `startDate` datetime NOT NULL, `endDate` datetime, `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `application` (`id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, `text` varchar(255) NOT NULL, `draft` tinyint(4) NOT NULL, `personalId` int(11), `userId` int(11)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `personal` ADD CONSTRAINT `fk_3f8355205760f80d8fb980a3a99` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `skill_group` ADD CONSTRAINT `fk_03c003bea4633a8675934ecad5c` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `skill` ADD CONSTRAINT `fk_149333c7e622a2e8ae322b64038` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `work` ADD CONSTRAINT `fk_344a6d17fb203b0779460a8a7a5` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `education` ADD CONSTRAINT `fk_72044ee5940582147ffc46e6f95` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
        await queryRunner.query("ALTER TABLE `application` ADD CONSTRAINT `fk_ebc0cb3f3df8cde2c45b95c9bb0` FOREIGN KEY (`personalId`) REFERENCES `personal`(`id`)");
        await queryRunner.query("ALTER TABLE `application` ADD CONSTRAINT `fk_a9bf729efa9099f676255cd0da7` FOREIGN KEY (`userId`) REFERENCES `user`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `application` DROP FOREIGN KEY `fk_a9bf729efa9099f676255cd0da7`");
        await queryRunner.query("ALTER TABLE `application` DROP FOREIGN KEY `fk_ebc0cb3f3df8cde2c45b95c9bb0`");
        await queryRunner.query("ALTER TABLE `education` DROP FOREIGN KEY `fk_72044ee5940582147ffc46e6f95`");
        await queryRunner.query("ALTER TABLE `work` DROP FOREIGN KEY `fk_344a6d17fb203b0779460a8a7a5`");
        await queryRunner.query("ALTER TABLE `skill` DROP FOREIGN KEY `fk_149333c7e622a2e8ae322b64038`");
        await queryRunner.query("ALTER TABLE `skill_group` DROP FOREIGN KEY `fk_03c003bea4633a8675934ecad5c`");
        await queryRunner.query("ALTER TABLE `personal` DROP FOREIGN KEY `fk_3f8355205760f80d8fb980a3a99`");
        await queryRunner.query("DROP TABLE `application`");
        await queryRunner.query("DROP TABLE `education`");
        await queryRunner.query("DROP TABLE `user`");
        await queryRunner.query("DROP TABLE `work`");
        await queryRunner.query("DROP TABLE `skill`");
        await queryRunner.query("DROP TABLE `skill_group`");
        await queryRunner.query("DROP TABLE `personal`");
    }

}
