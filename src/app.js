const express = require('express');
const v1UserRouter = require('./v1/routes/userRoutes');
const v1ProductRouter = require('./v1/routes/productRoutes');
const v1InvoiceRouter = require('./v1/routes/invoiceRoutes');
const morganMiddleware = require('./middlewares/morganMiddleware');
const logger = require('./utils/logger');
const v1AuthRouter = require('./v1/routes/authRoute')

const app = express();
app.use(morganMiddleware);

app.use(express.json());
app.use(express.urlencoded({extended: true, limit:'20mb'}));

app.use((req,res,next)=>{
    logger;
    next();
})

app.use('/v1/auth',v1AuthRouter);
app.use("/v1/users",v1UserRouter);
app.use("/v1/products",v1ProductRouter);
app.use("/v1/invoices",v1InvoiceRouter);

module.exports = app