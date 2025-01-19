import { registerUser, registerUserBody, loginUser, getMe } from '../docs/users.ts'

const apiDocs = {
    openapi: '3.0.1',
    info: {
      version: '1.0.1',
      title: 'ONITO REST API - Documentation',
      description: 'Description of ONITO API here',
      contact: {
        name: 'Noorul Ali',
        email: 'onitomed@gmail.com',
        url: 'https://onitomed.github.io',
      },
      license: {
        name: 'CC0',
        url: 'https://creativecommons.org/publicdomain/zero/1.0/legalcode.txt',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000/',
        description: 'Local Server',
      },
      {
        url: 'https://onitomed.github.io',
        description: 'Production Site',
      },
    ],
    tags: [
      {
        name: 'Patient Data',
      },
      {
        name: 'Users',
      },
    ],
    paths: {
        users: {
            post: registerUser,
        },
        'users/login': {
            post: loginUser
        },
        'users/me': {
            get: getMe
        }
    },
    components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
        schemas: {
            registerUserBody,
        
        },
    },
};
  
export { apiDocs };