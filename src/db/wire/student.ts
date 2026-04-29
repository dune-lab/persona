import { defineEntity, column, SchemaDefinition } from '@enxoval/db';

export class StudentDbWire {
  id!: string;
  name!: string;
  email!: string;
  user_id!: string;
  created_at!: Date;

  static parse(data: unknown): StudentDbWire {
    return Object.assign(new StudentDbWire(), data);
  }
}

export const StudentSchema: SchemaDefinition<StudentDbWire> = defineEntity(StudentDbWire, {
  tableName: 'students',
  columns: {
    id: column.primaryUuid(),
    name: column.varchar(),
    email: column.varcharUnique(),
    user_id: column.uuid(),
    created_at: column.createdAt(),
  },
});
