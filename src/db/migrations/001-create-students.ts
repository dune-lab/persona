import { Migration, sql } from '@enxoval/db';

export class CreateStudents001 implements Migration {
  async up(): Promise<void> {
    await sql(`
      CREATE TABLE IF NOT EXISTS students (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT now()
      )
    `);
  }

  async down(): Promise<void> {
    await sql(`DROP TABLE IF EXISTS students`);
  }
}
