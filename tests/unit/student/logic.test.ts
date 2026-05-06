/**
 * logic.test.ts — Unit tests for buildStudent logic using property-based itCases.
 *
 * Verifies that buildStudent correctly maps all input fields to the output
 * and does not inject extra fields (id, createdAt).
 */

import { describe, itCases, expect } from '@enxoval/testing';
import { StudentInput } from '../../../src/model/student';
import { buildStudent } from '../../../src/logic/student';

describe('buildStudent', () => {
  itCases('returns all fields', StudentInput, (input) => {
    expect(buildStudent(input)).toEqual({ name: input.name, email: input.email, userId: input.userId });
  });

  itCases('does not generate id', StudentInput, (input) => {
    expect((buildStudent(input) as Record<string, unknown>).id).toBeUndefined();
  });

  itCases('does not set createdAt', StudentInput, (input) => {
    expect((buildStudent(input) as Record<string, unknown>).createdAt).toBeUndefined();
  });
});
