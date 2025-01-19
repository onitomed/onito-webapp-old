const registerUser = {
    tags: ['Users'],
    description: 'Create a new user in the system',
    operationId: 'registerUser',
    security: [
      {
        
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/registerUserBody',
          },
        },
      },
      required: true,
    },
    responses: {
      '201': {
        description: 'User created successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '60564fcb544047cdc3844818',
                },
                name: {
                  type: 'string',
                  example: 'John Doe',
                },
                email: {
                  type: 'string',
                  example: 'john.doe@email.com',
                },
                token: {
                  type: 'string',
                  example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
                  description: 'JSON Web Token'
                }
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
      '400': {
        description: 'Bad Request From User',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Please add all fields',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
    },
  };

const loginUser = {
    tags: ['Users'],
    description: 'Login existing user in the system',
    operationId: 'loginUser',
    security: [
      {
        
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'john.doe@email.com',
                  },
                  password: {
                    type: 'string',
                    description: "unencrypted user's password",
                    example: '!1234aWe1Ro3$#',
                },
            }
          },
        },
      },
      required: true,
    },
    responses: {
      '200': {
        description: 'User logged in successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '60564fcb544047cdc3844818',
                },
                name: {
                  type: 'string',
                  example: 'John Doe',
                },
                email: {
                  type: 'string',
                  example: 'john.doe@email.com',
                },
                token: {
                  type: 'string',
                  example: '442893aba778ab321dc151d9b1ad98c64ed56c07f8cbaed',
                  description: 'JSON Web Token'
                }
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
      '400': {
        description: 'Bad Request From User',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid credentials',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
    },
  };

  const getMe = {
    tags: ['Users'],
    description: 'Get current user',
    operationId: 'getMe',
    components: [],
    security: [
      {
        bearerAuth: []
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'string',
                    example: 'john.doe@email.com',
                  },
                  password: {
                    type: 'string',
                    description: "unencrypted user's password",
                    example: '!1234aWe1Ro3$#',
                },
            }
          },
        },
      },
      required: true,
    },
    responses: {
      '200': {
        description: 'User returned successfully',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '60564fcb544047cdc3844818',
                },
                name: {
                  type: 'string',
                  example: 'John Doe',
                },
                email: {
                  type: 'string',
                  example: 'john.doe@email.com',
                },
                role: {
                  type: 'string',
                  example: 'patient',
                  
                },
                createdAt: {
                    type: 'string',
                    example: "2025-01-18T08:26:12.922Z",
                    description: 'User creation date and time'
                },
                updatedAt: {
                    type: 'string',
                    example: "2025-01-18T08:26:12.922Z",
                    description: 'User last update date and time'
                }
              },
            },
          },
        },
      },
      '500': {
        description: 'Internal Server Error',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Internal Server Error',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
      '401': {
        description: 'Unauthorized',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Not authorized, no token',
                },
                stack: {
                    type: 'string',
                    example: '#### V8 Error at baz (filename.js:10:15) at bar (filename.js:6:3) at foo (filename.js:2:3) at filename.js:13:1'
                }
              },
            },
          },
        },
      },
    },
  };

 const registerUserBody = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        example: 'John Doe',
      },
      email: {
        type: 'string',
        example: 'john.doe@email.com',
      },
      password: {
        type: 'string',
        description: "unencrypted user's password",
        example: '!1234aWe1Ro3$#',
      },
      role: {
        type: 'string',
        example: 'patient',
      },
    },
    
  };
  export { registerUser, registerUserBody, loginUser, getMe };