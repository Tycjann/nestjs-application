import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductRefactor1665000911551 implements MigrationInterface {
  name = 'ProductRefactor1665000911551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD \`description\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP COLUMN \`description\``,
    );
  }
}
