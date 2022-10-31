const invoiceService = require('../services/invoiceService')
const productService = require('../services/productService')
const userService = require('../services/userService');
const { success, error } = require("../utils/responses");
const { sendEmail } = require("../utils/email");

const getAllInvoices = async (req, res) =>{
    try {
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
            sort: parseInt(req.query.sort, 10) || 0,
        };
        const allInvoices = await invoiceService.getAllInvoices(pageOptions);   
        res.status(200).send(success('Todas las facturas',allInvoices));
    } catch (err) {
        res.status(400).send(error('Error 400',err));
    }
};

const getInvoice = async (req, res) =>{
    const invoiceId = req.params.invoiceId;
    try{
        const invoice = await invoiceService.getInvoice(invoiceId);
        if(invoice==null){
            return res.status(404).send(error('Factura no encontrada'));
        }   
        return res.status(200).send(success('Factura encontrada',invoice));
    } catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

const createInvoice = async (req, res) =>{
    try {
        let total = 0;
        const {products, client} = req.body;
        const user = await userService.getUser(client);
        for(const product of products){
            const quantity = product.quantity;
            const productData = await productService.getProduct(product.productId);
            total += quantity * productData.price;
        }
        const invoice = await invoiceService.createInvoice({products, client, total});
        sendEmail(user.email,JSON.stringify(invoice));
        res.status(201).send(success('Factura creada',invoice));
    } catch(err){
        res.status(400).send(error('Error 400',err.message));
    }
};

const updateInvoice = async (req, res) =>{
    const invoiceId = req.params.invoiceId;
    try {
        const invoice = await invoiceService.getInvoice(invoiceId);
        if(invoice!=null){
            const updatedInvoice = await invoiceService.updateInvoice(invoiceId, req.body);
            return res.status(200).send(success('Factura actualizada'));
        }
        return res.status(404).send(error('Factura no encontrada'));
    } catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

const deleteInvoice = async (req, res) =>{
    const invoiceId = req.params.invoiceId;
    try {
        const invoice = await invoiceService.getInvoice(invoiceId);
        if(invoice!=null){
            const deletedInvoice = await invoiceService.deleteInvoice(invoiceId);
            return res.status(200).send(success('Factura eliminada'));
        }
        return res.status(404).send(error('Factura no encontrada'));
    } catch(err){
            res.status(400).send(error('Error 400',err));
    }
};

module.exports = {
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
}
