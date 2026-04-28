import { fn } from '@enxoval/types';
import { asUUID } from '@enxoval/types';
import { Student, StudentInput } from '../model/student';
import { StudentDbWire } from '../db/wire/student';

export const fromDbWire = fn(StudentDbWire, Student, (wire) => ({
  id: asUUID(wire.id),
  name: wire.name,
  email: wire.email,
  createdAt: wire.created_at,
}));

export const toDbWire = fn(StudentInput, StudentDbWire, (student) => {
  const row = new StudentDbWire();
  row.name = student.name;
  row.email = student.email;
  return row;
});
