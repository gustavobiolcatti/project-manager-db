import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1773791423684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workspaces" DROP CONSTRAINT "FK_workspaces_owner"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workspaces" ADD CONSTRAINT "FK_workspaces_owner" FOREIGN KEY ("owner_id") REFERENCES "users" ("id")`
    );
  }
}
