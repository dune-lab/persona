import { Migration, MigrationRunner, sql } from '@enxoval/db';

export class AddUserIdToStudents002 extends Migration {
  name = '002-add-user-id';

  async up(runner: MigrationRunner): Promise<void> {
    await sql(runner, `ALTER TABLE students ADD COLUMN user_id UUID NOT NULL`);
  }

  async down(runner: MigrationRunner): Promise<void> {
    await sql(runner, `ALTER TABLE students DROP COLUMN user_id`);
  }
}
