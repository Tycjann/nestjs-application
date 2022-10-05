import { MigrationInterface, QueryRunner } from 'typeorm';
// ? to robi razem z drugą migracją
export class ProductRefactor1665000140334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE products CHANGE COLUMN name title varchar(100)`,
    );
  }
  // ? tego nie robi z drugą migracją i muszę zrobić dwa razy "down
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE products CHANGE COLUMN title name varchar(100);`,
    );
  }
}
