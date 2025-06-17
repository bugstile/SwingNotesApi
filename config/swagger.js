export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "SwingNotes API",
    version: "1.0.0",
    description: "API for managing notes with user authentication (JWT)."
  },
  servers: [
    {
      url: "http://localhost:8080"
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [
    {
      bearerAuth: []
    }
  ],
  paths: {
    "/api/user/register": {
      post: {
        tags: ["User"],
        summary: "Register a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  firstname: { type: "string" },
                  surname: { type: "string" },
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["firstname", "surname", "email", "password"]
              }
            }
          }
        },
        responses: {
          201: {
            description: "User successfully registered"
          },
          400: {
            description: "Bad request or duplicate email"
          }
        }
      }
    },
    "/api/user/login": {
      post: {
        tags: ["User"],
        summary: "Login and receive a JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  password: { type: "string" }
                },
                required: ["email", "password"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful and JWT returned"
          },
          401: {
            description: "Invalid credentials"
          }
        }
      }
    },
    "/api/notes": {
      get: {
        tags: ["Notes"],
        summary: "Fetch all notes",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "List of notes"
          }
        }
      },
      post: {
        tags: ["Notes"],
        summary: "Create a new note",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  text: { type: "string" }
                },
                required: ["title", "text"]
              }
            }
          }
        },
        responses: {
          201: {
            description: "Note created"
          },
          400: {
            description: "Invalid data"
          }
        }
      },
      put: {
        tags: ["Notes"],
        summary: "Update an existing note",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  text: { type: "string" }
                },
                required: ["id", "title", "text"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "Note updated"
          },
          404: {
            description: "Note not found"
          }
        }
      },
      delete: {
        tags: ["Notes"],
        summary: "Delete a note",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" }
                },
                required: ["id"]
              }
            }
          }
        },
        responses: {
          200: {
            description: "Note deleted"
          },
          404: {
            description: "Note not found"
          }
        }
      }
    },
    "/api/notes/search": {
      get: {
        tags: ["Notes"],
        summary: "Search notes by title",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "query",
            in: "query",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          200: {
            description: "Matching notes returned"
          },
          404: {
            description: "No matching notes found"
          }
        }
      }
    }
  }
};
