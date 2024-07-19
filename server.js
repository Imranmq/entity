require("dotenv").config();

// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// import routes
const entityRoutes = require("./routes/entities");
const relationshipRoutes = require("./routes/relationships");
const dataSetRoutes = require("./routes/dataSets");
const formRoutes = require("./routes/forms");
const filledFormRoutes = require("./routes/filledForms");
const userRoutes = require("./routes/users");

// swagger js
const expressSwagger = require("express-swagger-generator");

const app = express();
app.use(bodyParser.json());
// routes
app.use("/user", userRoutes);
app.use("/entity", entityRoutes);
app.use("/relationship", relationshipRoutes);
app.use("/dataSet", dataSetRoutes);
app.use("/form", formRoutes);
app.use("/filledForm", filledFormRoutes);

// swagger js
const options = {
  swaggerDefinition: {
    info: {
      title: "Entity Web",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    host: "localhost:3000",
    basePath: "/",
    produces: ["application/json"],
    schemes: ["http"],
  },
  basedir: __dirname, // App absolute path
  files: ['./routes/**/*.js'], // Path to the API routes
};

expressSwagger(app)(options);


// connect DB
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// logger
const logger = require("./utils/logger");

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  logger.info(`Server running on port ${port}`);
});

// use error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

module.exports = app;
