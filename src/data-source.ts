import { DataSource } from "typeorm";
import { UserEntity } from "./shared/db/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'incode',
  entities: [UserEntity],
  migrations: ["src/migrations/*.ts"],
  subscribers: [],
  synchronize: true,
  logging: false,
}); 
