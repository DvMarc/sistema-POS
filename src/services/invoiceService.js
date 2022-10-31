const Invoice = require('../models/invoice');

const getAllInvoices = async (pageOptions) => {
    const invoices = await Invoice.find()
        .sort({ total: pageOptions.sort })
		.skip(pageOptions.page * pageOptions.limit)
		.limit(pageOptions.limit);
    return invoices;
}

const getInvoice = async (invoiceId) => {
    const invoice = await Invoice.findById(invoiceId);
    return invoice;
}

const createInvoice = async (req,res) => {
    const invoice = new Invoice({
        products: req.products,
        client: req.client,
        total: req.total
    });
    const newInvoice = await invoice.save();
    return newInvoice;
}

const updateInvoice = async (invoiceId, newData) => {
    const invoiceUpdate = await Invoice.findByIdAndUpdate(invoiceId, newData);
    return invoiceUpdate;
}

const deleteInvoice = async (invoiceId) => {
    const invoiceDelete = await Invoice.findByIdAndDelete(invoiceId);
    return invoiceDelete;
}

module.exports = {
    getAllInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice
}