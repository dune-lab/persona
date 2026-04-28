import { fn } from '@enxoval/types';
import { StudentInput } from '../model/student';

export const buildStudent = fn(StudentInput, StudentInput, (input) => ({
  name: input.name,
  email: input.email,
}));
