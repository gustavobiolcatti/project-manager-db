import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

const connectionData: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PROJECT_MANAGER_HOSTNAME,
  port: Number(process.env.PROJECT_MANAGER_PORT),
  username: process.env.PROJECT_MANAGER_USERNAME,
  password: process.env.PROJECT_MANAGER_PASSWORD,
  database: process.env.PROJECT_MANAGER_NAME,
  entities: ['./src/project-manager-db/entity/*.ts'],
  migrations: ['./src/project-manager-db/migrations/*.ts'],
};

export const ProjectManagerDbDataSource = new DataSource(connectionData);
