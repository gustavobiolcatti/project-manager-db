import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1773792675241 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" ADD COLUMN "workspace_id" BIGINT NOT NULL`);

    await queryRunner.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "FK_projects_workspace" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "projects" DROP CONSTRAINT "FK_projects_workspace"`);
    
    await queryRunner.query(`ALTER TABLE "projects" DROP COLUMN "workspace_id"`);
  }
}
