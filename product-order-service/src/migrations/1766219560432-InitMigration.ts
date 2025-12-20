import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1766219560432 implements MigrationInterface {
    name = 'InitMigration1766219560432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "image"`);
    }

}
