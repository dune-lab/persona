import { describe, it, itCases, generate, expect } from '@enxoval/testing';
import { fromDbWire, toDbWire } from '../../../src/adapters/student';
import { Student, StudentInput } from '../../../src/model/student';
import { StudentDbWire } from '../../../src/db/wire/student';

describe('student adapter — fromDbWire', () => {
  it('maps snake_case db columns to camelCase model', () => {
    const s = generate(Student);
    const wire = new StudentDbWire();
    wire.id = s.id;
    wire.name = s.name;
    wire.email = s.email;
    wire.user_id = s.userId;
    wire.created_at = new Date();

    const result = fromDbWire(wire);
    expect(result.id).toBe(s.id);
    expect(result.name).toBe(s.name);
    expect(result.email).toBe(s.email);
    expect(result.userId).toBe(s.userId);
    expect(result.createdAt).toBeInstanceOf(Date);
  });
});

describe('student adapter — toDbWire', () => {
  itCases('returns a StudentDbWire instance', StudentInput, (input) => {
    expect(toDbWire(input)).toBeInstanceOf(StudentDbWire);
  });

  itCases('maps name, email and user_id correctly', StudentInput, (input) => {
    const result = toDbWire(input);
    expect(result.name).toBe(input.name);
    expect(result.email).toBe(input.email);
    expect(result.user_id).toBe(input.userId);
  });

  itCases('does not set id (delegated to DB)', StudentInput, (input) => {
    expect(toDbWire(input).id).toBeUndefined();
  });

  itCases('does not set created_at (delegated to DB)', StudentInput, (input) => {
    expect(toDbWire(input).created_at).toBeUndefined();
  });
});
