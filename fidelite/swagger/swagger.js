module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API Fidélité',
    version: '1.0.0',
  },
  paths: {
    '/api/fidelite': {
      get: {
        summary: 'Liste toutes les fidélités',
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Fidelite' }
                }
              }
            }
          }
        }
      },
      post: {
        summary: 'Ajoute une fidélité',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Fidelite' }
            }
          }
        },
        responses: {
          201: { description: 'Créé' }
        }
      }
    },
    '/api/fidelite/{id}': {
      get: {
        summary: 'Récupère une fidélité par ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          200: {
            description: 'OK',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Fidelite' }
              }
            }
          },
          404: { description: 'Non trouvé' }
        }
      },
      put: {
        summary: 'Met à jour une fidélité',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Fidelite' }
            }
          }
        },
        responses: {
          200: { description: 'Mis à jour' },
          404: { description: 'Non trouvé' }
        }
      },
      delete: {
        summary: 'Supprime une fidélité',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' }
          }
        ],
        responses: {
          204: { description: 'Supprimé' },
          404: { description: 'Non trouvé' }
        }
      }
    }
  },
  components: {
    schemas: {
      Fidelite: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            example: 1
          },
          nom: {
            type: 'string',
            example: 'Client1'
          },
          points: {
            type: 'integer',
            example: 100
          }
        },
        required: ['id', 'nom', 'points']
      }
    }
  }
};
