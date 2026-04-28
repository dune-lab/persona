import { checkDatabase } from './database';

interface HealthResult {
  status: 'ok' | 'degraded';
  dependencies: {
    database: boolean;
  };
}

export async function checkHealth(): Promise<HealthResult> {
  const database = await checkDatabase();
  const status = database ? 'ok' : 'degraded';
  return { status, dependencies: { database } };
}
