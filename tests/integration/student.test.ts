import { test, describe, it, expect, beforeAll, beforeEach, afterAll, afterEach, generate } from '@enxoval/testing';
import { TestDataSource } from './helpers/data-source';

test.mock('../../src/db/data-source', () => ({ AppDataSource: TestDataSource }));
test.mock('@enxoval/auth', () => ({
  setupAuth: test.fn(),
  getCurrentUser: () => ({ userId: '11111111-1111-1111-1111-111111111111' }),
}));

import { buildApp } from '../../src/app';
import { inject } from '@enxoval/http';
import { AppDataSource } from '../../src/db/data-source';
import { StudentDbWire } from '../../src/db/wire/student';
import { CreateStudentWireIn } from '../../src/wire/in/student';

const validBody = generate(CreateStudentWireIn);

beforeAll(async () => {
  await TestDataSource.initialize();
  buildApp();
});

afterAll(async () => {
  await TestDataSource.destroy();
});

beforeEach(() => {
  test.clearAll();
});

afterEach(async () => {
  await AppDataSource.getRepository(StudentDbWire).clear();
});

describe('POST /students', () => {
  it('returns 201 with student fields', async () => {
    const res = await inject({ method: 'POST', url: '/students', body: validBody });

    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBe(validBody.name);
    expect(body.email).toBe(validBody.email);
    expect(body.createdAt).toBeDefined();
  });

  it('inserts student in the database', async () => {
    await inject({ method: 'POST', url: '/students', body: validBody });

    const students = await AppDataSource.getRepository(StudentDbWire).find();
    expect(students).toHaveLength(1);
    expect(students[0].name).toBe(validBody.name);
    expect(students[0].email).toBe(validBody.email);
  });

  it('is idempotent — second call with same email returns existing student', async () => {
    const res1 = await inject({ method: 'POST', url: '/students', body: validBody });
    const res2 = await inject({ method: 'POST', url: '/students', body: validBody });

    expect(res1.json().id).toBe(res2.json().id);
    const students = await AppDataSource.getRepository(StudentDbWire).find();
    expect(students).toHaveLength(1);
  });

  it('returns 400 on missing name', async () => {
    const res = await inject({ method: 'POST', url: '/students', body: { email: 'alice@example.com' } });
    expect(res.statusCode).toBe(400);
  });

  it('returns 400 on missing email', async () => {
    const res = await inject({ method: 'POST', url: '/students', body: { name: 'Alice' } });
    expect(res.statusCode).toBe(400);
  });
});

describe('GET /students', () => {
  it('returns empty array when no students', async () => {
    const res = await inject({ method: 'GET', url: '/students' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual([]);
  });

  it('returns list of students after insertion', async () => {
    const secondBody = generate(CreateStudentWireIn);
    await inject({ method: 'POST', url: '/students', body: validBody });
    await inject({ method: 'POST', url: '/students', body: secondBody });

    const res = await inject({ method: 'GET', url: '/students' });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body).toHaveLength(2);
    expect(body.map((s: { email: string }) => s.email).sort()).toEqual(
      [validBody.email, secondBody.email].sort(),
    );
  });
});
