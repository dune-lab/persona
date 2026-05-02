import { fn } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { get, getWith, post } from '@enxoval/http';
import { CreateStudentWireIn } from '../../wire/in/student';
import { StudentWireOut } from '../../wire/out/student';
import { Student } from '../../model/student';
import { createStudent, getStudentByUserId } from '../../controllers/student';
import * as studentDb from '../../db/student';

const toWireOut = fn(Student, StudentWireOut, (s) => ({
  id: s.id,
  name: s.name,
  email: s.email,
  userId: s.userId,
  createdAt: s.createdAt.toISOString(),
}));

export function registerStudentRoutes(): void {
  post('/students', async (body) => {
    const input = CreateStudentWireIn.parse(body);
    const userId = getCurrentUser()!.userId;
    const student = await createStudent({ ...input, userId });
    return toWireOut(student);
  });

  get('/students', async () => {
    const students = await studentDb.findAll();
    return students.map(toWireOut);
  });

  getWith<{ userId: string }>('/students/by-user/:userId', async ({ userId }) => {
    const student = await getStudentByUserId({ userId });
    return toWireOut(student);
  });
}
