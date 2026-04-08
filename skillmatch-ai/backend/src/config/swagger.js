import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import env from "./envConfig.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Job Web App API",
      version: "1.0.0",
      description: "API documentation for AI Job Web App",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.swagger.js"], // Path to the swagger docs in modules
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};
