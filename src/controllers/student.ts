import { asyncFn, NotFoundError } from '@enxoval/types';
import { StudentInput, Student } from '../model/student';
import { GetStudentByUserWireIn } from '../wire/in/student';
import { buildStudent } from '../logic/student';
import * as studentDb from '../db/student';

export const createStudent = asyncFn(StudentInput, Student, async (input) => {
  const existing = await studentDb.findByEmail(input.email);
  if (existing) return existing;
  return studentDb.insert(buildStudent(input));
});

export const getStudentByUserId = asyncFn(GetStudentByUserWireIn, Student, async (input) => {
  const student = await studentDb.findByUserId(input.userId);
  if (!student) throw new NotFoundError(`Student for user ${input.userId} not found`);
  return student;
});
