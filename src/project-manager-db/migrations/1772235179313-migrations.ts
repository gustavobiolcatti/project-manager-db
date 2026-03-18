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
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
        "updatedAt" TIMESTAMP, 
        "deletedAt" TIMESTAMP 
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspaces" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "ownerId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP
      );
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "workspaceMembers" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "workspaceId" BIGINT NOT NULL,
        "userId" BIGINT NOT NULL,
        "role" workspace_member_role_enum NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_workspaceMembers_workspace" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id"),
        CONSTRAINT "FK_workspaceMembers_user" FOREIGN KEY ("userId") REFERENCES "users" ("id")
      );
    `)

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "projects" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "description" VARCHAR,
        "userId" BIGINT NOT NULL,
        "workspaceId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_projects_user" FOREIGN KEY ("userId") REFERENCES "users" ("id"),
        CONSTRAINT "FK_projects_workspace" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "boards" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "projectId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_boards_project" FOREIGN KEY ("projectId") REFERENCES "projects" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "boardColumns" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "name" VARCHAR NOT NULL,
        "boardId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_boardColumns_board" FOREIGN KEY ("boardId") REFERENCES "boards" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "tasks" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "title" VARCHAR NOT NULL,
        "description" VARCHAR,
        "boardColumnId" BIGINT NOT NULL,
        "assigneeId" BIGINT NOT NULL,
        "reporterId" BIGINT NOT NULL,
        "priority" INTEGER,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_tasks_boardColumn" FOREIGN KEY ("boardColumnId") REFERENCES "boardColumns" ("id"),
        CONSTRAINT "FK_tasks_assignee" FOREIGN KEY ("assigneeId") REFERENCES "users" ("id"),
        CONSTRAINT "FK_tasks_reporter" FOREIGN KEY ("reporterId") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "content" VARCHAR NOT NULL,
        "taskId" BIGINT NOT NULL,
        "userId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_comments_task" FOREIGN KEY ("taskId") REFERENCES "tasks" ("id"),
        CONSTRAINT "FK_comments_user" FOREIGN KEY ("userId") REFERENCES "users" ("id")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "interactions" (
        "id" BIGSERIAL PRIMARY KEY NOT NULL,
        "payload" JSONB NOT NULL,
        "taskId" BIGINT NOT NULL,
        "userId" BIGINT NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP,
        "deletedAt" TIMESTAMP,
        CONSTRAINT "FK_interactions_task" FOREIGN KEY ("taskId") REFERENCES "tasks" ("id"),
        CONSTRAINT "FK_interactions_user" FOREIGN KEY ("userId") REFERENCES "users" ("id")
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
