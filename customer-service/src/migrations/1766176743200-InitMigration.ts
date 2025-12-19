import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1766176743200 implements MigrationInterface {
    name = 'InitMigration1766176743200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer_orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sourceOrderId" character varying NOT NULL, "total" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "customerId" uuid, CONSTRAINT "PK_ce425b6edb31cce9a80b269298e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer_orders" ADD CONSTRAINT "FK_382008f615c6e7964b49cd2de10" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_orders" DROP CONSTRAINT "FK_382008f615c6e7964b49cd2de10"`);
        await queryRunner.query(`DROP TABLE "customers"`);
        await queryRunner.query(`DROP TABLE "customer_orders"`);
    }

}
