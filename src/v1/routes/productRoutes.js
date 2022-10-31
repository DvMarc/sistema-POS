const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const {uploadImage, uploadImageWithUpdate} = require('../../middlewares/upload');

router
    .get('/',productController.getAllProducts)

    .get('/:productId', productController.getProduct)

    .post('/',uploadImage,productController.createProduct)

    .patch('/:productId', uploadImageWithUpdate,productController.updateProduct)

    .delete('/:productId', productController.deleteProduct);
    
module.exports = router;