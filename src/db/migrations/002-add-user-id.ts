import { Migration, MigrationRunner, sql } from '@enxoval/db';

export class AddUserIdToStudents1700000000002 extends Migration {
  name = 'AddUserIdToStudents1700000000002';

  async up(runner: MigrationRunner): Promise<void> {
    // user_id already created in migration 001 — no-op
  }

  async down(runner: MigrationRunner): Promise<void> {
    // no-op
  }
}
