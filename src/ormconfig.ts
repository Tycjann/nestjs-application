import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'usr_kodilla-nest-js-api',
  password: 'L7BABOCEBI',
  database: 'kodilla-nest-js-api',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  entities: ['dist/**/*.entity.js'],
  logging: true,
  // synchronize - zapewnia nam aktualizację naszej tabeli podczas zmian w schemacie
  // W przypadku uruchamiania aplikacji na produkcji ta opcja powinna być ustawiona na false
  synchronize: true,
  // synchronize: false,
  // dropSchema: false,
  // migrationsRun: true,
  migrationsRun: false,
  // migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'history',
});
