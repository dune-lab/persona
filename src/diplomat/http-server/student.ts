import { fn } from '@enxoval/types';
import { get, post } from '@enxoval/http';
import { CreateStudentWireIn } from '../../wire/in/student';
import { StudentWireOut } from '../../wire/out/student';
import { Student } from '../../model/student';
import { createStudent } from '../../controllers/student';
import * as studentDb from '../../db/student';

const toWireOut = fn(Student, StudentWireOut, (s) => ({
  id: s.id,
  name: s.name,
  email: s.email,
  createdAt: s.createdAt.toISOString(),
}));

export function registerStudentRoutes(): void {
  post('/students', async (body) => {
    const input = CreateStudentWireIn.parse(body);
    const student = await createStudent(input);
    return toWireOut(student);
  });

  get('/students', async () => {
    const students = await studentDb.findAll();
    return students.map(toWireOut);
  });
}
