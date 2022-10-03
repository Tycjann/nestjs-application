export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'usr_kodilla-nest-js-api',
  password: 'L7BABOCEBI',
  database: 'kodilla-nest-js-api',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  // Zapewnia nam aktualizację naszej tabeli podczas zmian w schemacie
  // W przypadku uruchamiania aplikacji na produkcji ta opcja powinna być ustawiona na false
  synchronize: true,
};
