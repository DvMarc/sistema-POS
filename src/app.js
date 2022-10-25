const express = require('express');
const v1UserRouter = require('./v1/routes/userRoutes');

const app = express()
app.use(express.json());
app.use("/v1/users",v1UserRouter);

module.exports = app;