const express = require('express');
const router = express.Router();
const invoiceController = require('../../controllers/invoiceController');

router
    .get('/', invoiceController.getAllInvoices)

    .get('/:invoiceId', invoiceController.getInvoice)

    .post('/', invoiceController.createInvoice)

    .patch('/:invoiceId', invoiceController.updateInvoice)

    .delete('/:invoiceId', invoiceController.deleteInvoice);

module.exports = router;