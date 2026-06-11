const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Catálogo de Produtos',
      version: '1.0.0',
      description: 'Documentação interativa - Atividade Swagger',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Produto: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            nome: { type: 'string' },
            preco: { type: 'number' },
            descricao: { type: 'string' },
            categoria: { type: 'string' },
            atributosDinamicos: { type: 'object' },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../src/routes/*.js')],
};

const specs = swaggerJsdoc(options);
console.log(' Rotas detectadas:', Object.keys(specs.paths || {}));
module.exports = specs;