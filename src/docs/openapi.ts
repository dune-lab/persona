export const openApiSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Persona API',
    version: '1.0.0',
    description: 'Student identity service.',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local' }],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        operationId: 'getHealth',
        tags: ['System'],
        responses: {
          '200': {
            description: 'Service health status',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', enum: ['ok', 'degraded'] },
                    dependencies: {
                      type: 'object',
                      properties: { database: { type: 'boolean' } },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/students': {
      post: {
        summary: 'Create or retrieve a student',
        operationId: 'createStudent',
        tags: ['Students'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                  name: { type: 'string', example: 'Alice' },
                  email: { type: 'string', format: 'email', example: 'alice@example.com' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Student created or existing student returned',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    createdAt: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        summary: 'List all students',
        operationId: 'listStudents',
        tags: ['Students'],
        responses: {
          '200': {
            description: 'List of students',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: { type: 'string', format: 'uuid' },
                      name: { type: 'string' },
                      email: { type: 'string', format: 'email' },
                      createdAt: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
