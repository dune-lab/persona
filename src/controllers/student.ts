import { asyncFn } from '@enxoval/types';
import { getCurrentUser } from '@enxoval/auth';
import { StudentInput, Student } from '../model/student';
import { buildStudent } from '../logic/student';
import * as studentDb from '../db/student';

export const createStudent = asyncFn(StudentInput, Student, async (input) => {
  const existing = await studentDb.findByEmail(input.email);
  if (existing) return existing;
  return studentDb.insert(buildStudent(input));
});

export async function getStudentByUserId(userId: string) {
  return studentDb.findByUserId(userId);
}
