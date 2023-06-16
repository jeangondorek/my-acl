import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['../swagger.json'],
};

const specs = swaggerJsdoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(specs));

export default router;
