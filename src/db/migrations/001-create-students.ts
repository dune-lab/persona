import { Migration, MigrationRunner, sql } from '@enxoval/db';

export class CreateStudents001 extends Migration {
  name = '001-create-students';

  async up(runner: MigrationRunner): Promise<void> {
    await sql(runner, `
      CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        user_id UUID NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  async down(runner: MigrationRunner): Promise<void> {
    await sql(runner, `DROP TABLE IF EXISTS students`);
  }
}
