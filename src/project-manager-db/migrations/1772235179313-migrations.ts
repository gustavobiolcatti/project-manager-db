import { MigrationInterface, QueryRunner } from "typeorm";
import { WorkspaceMemberRolesEnum } from "../enums";

export class Migrations1772235179313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE workspace_member_role_enum AS ENUM (
        '${WorkspaceMemberRolesEnum.ADMIN}', 
        '${WorkspaceMemberRolesEnum.MEMBER}'
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL, 
        "name" VARCHAR NOT NULL, 
        "email" VARCHAR NOT NULL, 
        "password" VARCHAR NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP, 
        "deleted_at" TIMESTAMP 
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspaces" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "owner_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_workspaces_owner" FOREIGN KEY ("owner_id") REFERENCES "users" ("id")
      );
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspaceMembers" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "workspace_id" BIGINT NOT NULL,
        "user_id" BIGINT NOT NULL,
        "role" workspace_member_role_enum NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_workspaceMembers_workspace" FOREIGN KEY ("workspace_id") REFERENCES "workspaces" ("id"),
        CONSTRAINT "FK_workspaceMembers_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "description" VARCHAR,
        "user_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_projects_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "boards" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "project_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_boards_project" FOREIGN KEY ("project_id") REFERENCES "projects" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "boardColumns" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "board_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_boardColumns_board" FOREIGN KEY ("board_id") REFERENCES "boards" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tasks" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "title" VARCHAR NOT NULL,
        "description" VARCHAR,
        "column_id" BIGINT NOT NULL,
        "assignee_id" BIGINT NOT NULL,
        "reporter_id" BIGINT NOT NULL,
        "priority" INTEGER,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_tasks_boardColumn" FOREIGN KEY ("column_id") REFERENCES "boardColumns" ("id"),
        CONSTRAINT "FK_tasks_assignee" FOREIGN KEY ("assignee_id") REFERENCES "users" ("id"),
        CONSTRAINT "FK_tasks_reporter" FOREIGN KEY ("reporter_id") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "content" VARCHAR NOT NULL,
        "task_id" BIGINT NOT NULL,
        "user_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_comments_task" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id"),
        CONSTRAINT "FK_comments_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "interactions" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "payload" JSONB NOT NULL,
        "task_id" BIGINT NOT NULL,
        "user_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP,
        "deleted_at" TIMESTAMP,
        CONSTRAINT "FK_interactions_task" FOREIGN KEY ("task_id") REFERENCES "tasks" ("id"),
        CONSTRAINT "FK_interactions_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "interactions";
    `);

    await queryRunner.query(`
      DROP TABLE "comments";
    `);

    await queryRunner.query(`
      DROP TABLE "tasks";
    `);

    await queryRunner.query(`
      DROP TABLE "boardColumns";
    `);

    await queryRunner.query(`
      DROP TABLE "boards";
    `);

    await queryRunner.query(`
      DROP TABLE "projects";
    `);

    await queryRunner.query(`
      DROP TABLE "workspaceMembers";
    `)

    await queryRunner.query(`
      DROP TABLE "workspaces";
    `)

    await queryRunner.query(`
      DROP TABLE "users";
    `);

    await queryRunner.query(`
      DROP TYPE workspace_member_role_enum;
    `);
  }
}
