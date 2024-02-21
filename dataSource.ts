import { DataSource } from "typeorm";
import { Users } from "./src/entities/Users";
import dotenv from "dotenv";

dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
    entities: [
      Users
  ],
  migrations: [__dirname + "/src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});
export default dataSource;
