import { describe, it, expect } from '@enxoval/testing';
import { buildStudent } from '../../../src/logic/student';

const userId = '11111111-1111-1111-1111-111111111111';

describe('buildStudent', () => {
  it('returns name and email from input', () => {
    const result = buildStudent({ name: 'Alice', email: 'alice@example.com', userId });
    expect(result).toEqual({ name: 'Alice', email: 'alice@example.com', userId });
  });

  it('does not generate id', () => {
    const result = buildStudent({ name: 'Alice', email: 'alice@example.com', userId });
    expect((result as Record<string, unknown>).id).toBeUndefined();
  });

  it('does not set createdAt', () => {
    const result = buildStudent({ name: 'Alice', email: 'alice@example.com', userId });
    expect((result as Record<string, unknown>).createdAt).toBeUndefined();
  });
});
