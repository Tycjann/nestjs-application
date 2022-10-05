export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'usr_kodilla-nest-js-api',
  password: 'L7BABOCEBI',
  database: 'kodilla-nest-js-api',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // synchronize - zapewnia nam aktualizację naszej tabeli podczas zmian w schemacie
  // W przypadku uruchamiania aplikacji na produkcji ta opcja powinna być ustawiona na false
  // synchronize: true,
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  migrations: [__dirname + '/db/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};
