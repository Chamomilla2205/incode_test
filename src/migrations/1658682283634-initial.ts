// import { MigrationInterface, QueryRunner } from "typeorm";

// export class initial1658682283634 implements MigrationInterface {
//     name = 'initial1658682283634'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', "mpath" character varying DEFAULT '', "bossId" uuid, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`ALTER TABLE "user_entity" ADD CONSTRAINT "FK_3a93ecf4bdf49174d41c125e2ee" FOREIGN KEY ("bossId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "FK_3a93ecf4bdf49174d41c125e2ee"`);
//         await queryRunner.query(`DROP TABLE "user_entity"`);
//     }

// }
