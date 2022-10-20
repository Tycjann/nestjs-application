import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'usr_kodilla-nest-js-api',
  password: 'L7BABOCEBI',
  database: 'kodilla-nest-js-api',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // entities: ['dist/**/*.entity.js'],
  logging: true,
  // synchronize - zapewnia nam aktualizację naszej tabeli podczas zmian w schemacie
  // W przypadku uruchamiania aplikacji na produkcji ta opcja powinna być ustawiona na false
  // ? przy true migracje nie zapisują się w tabeli history
  //  ? + pytanie o tablice migration - dlaczego jest pysta
  // ! For fake data:
  // ! Dobrze też opcję dropSchema oraz synchronize ustawić na true, aby za każdym razem nasza
  // ! baza była generowana od nowa, a migracja uruchamiana ponownie.
  synchronize: true,
  // synchronize: false,
  // dropSchema: false,
  // migrationsRun: true,
  migrationsRun: false,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  // migrations: ['dist/**/migrations/*.js'],
  migrationsTableName: 'history',
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
});
