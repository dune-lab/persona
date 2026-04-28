import { createSchema, field } from '@enxoval/types';

export const Student = createSchema({
  id: field.uuid(),
  name: field.string(),
  email: field.string(),
  createdAt: field.date(),
});

export const StudentInput = createSchema({
  name: field.string(),
  email: field.string(),
});
