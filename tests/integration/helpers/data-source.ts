import { createTestDataSource } from '@enxoval/testing';
import { StudentSchema } from '../../../src/db/wire/student';

export const TestDataSource = createTestDataSource([StudentSchema]);
