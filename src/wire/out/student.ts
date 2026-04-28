import { createSchema, field } from '@enxoval/types';

export const StudentWireOut = createSchema({
  id: field.uuid(),
  name: field.string(),
  email: field.string(),
  createdAt: field.string(),
});
