require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

const corsOptions = {
  origin: "*",
  exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 100000000,
  })
);

app.use(express.static(path.join(__dirname, "files-upload")));

// // app.use(
// //   express.static(path.join("C://Users//DAT//Desktop//storage", "files-upload"))
// // );

// app.use("/images", express.static("images"));

app.use(express.json());

// // swagger
// const options = {
//   definition: {
//     openapi: "3.0.3",
//     info: {
//       title: "APIs",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: `${process.env.SWAGGER_URL}:${process.env.API_PORT}`,
//       },
//     ],
//     components: {
//       securitySchemes: {
//         ApiKeyAuth: {
//           type: "apiKey",
//           name: "Authorization",
//           // scheme: "bearer",
//           in: "header",
//         },
//         security: [
//           {
//             ApiKeyAuth: [],
//           },
//         ],
//       },
//     },
//   },
//   apis: ["routes/*.js", "model/*.js"],
// };

// const specs = swaggerJsDoc(options);

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// // Docs in JSON format
// app.get("/docs.json", (req, res) => {
//   res.setHeader("Content-Type", "application/json");
//   res.send(specs);
// });

// Logic goes here

module.exports = app;
