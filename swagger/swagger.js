const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Minha API REST',
    description: 'Documentação interativa da API - Atividade Swagger',
    version: '1.0.0',
  },
  host: 'localhost:3000',   
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Insira o token JWT no formato: Bearer {token}',
    },
  },
};

const outputFile = './swagger-output.json';   
const endpointsFiles = ['./app.js'];           
swaggerAutogen(outputFile, endpointsFiles, doc);