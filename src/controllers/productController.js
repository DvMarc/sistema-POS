const productService = require('../services/productService');
const { success, error } = require("../utils/responses");
const validateProductCreate = require("../validators/productCreatedValidator")
const fs = require('fs');

const getAllProducts = async (req, res) => {
    try{
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
            sort: parseInt(req.query.sort, 10) || 0,
        };
        const allProducts = await productService.getAllProducts(pageOptions);
        res.status(200).send(success('Todos los productos',allProducts));
    }catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.productId;
    try{
        const product = await productService.getProduct(productId);
        if(product==null)
            return res.status(404).send(error('Producto no encontrado'));
        return res.status(200).send(success('Producto Encontrado',product));
    }catch(err){
       res.status(400).send(error('Error 400',err));
    }
}; 

const createProduct =  async (req, res) => {
    try {
        const body = req.body;
        const value = await validateProductCreate.schema.validateAsync(body);
        value['file'] =  req.file.path
        const product = await productService.createProduct(value);
        res.status(201).send(success('Producto Creado',product))
    }catch (err){
        res.status(400).send(error('Error 400',err.message));
    }
};

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    try{
        const product = await productService.getProduct(productId);
        if(product!=null){
            if(req.file != undefined){
                fs.unlinkSync(product.file)
                const body = req.body;
                body['file'] =  req.file.path
                const updatedProduct = await productService.updateProduct(productId,body);
                return res.status(200).send(success('Producto Editado'));
            }else{
                const updatedProduct = await productService.updateProduct(productId,req.body);
                return res.status(200).send(success('Producto Editado'));
            }
        }
        return res.status(404).send(error('Producto no encontrado'));
    }catch(err){
        if(req.file != undefined) fs.unlinkSync(req.file.path)
        res.status(400).send(error('Error 400',err));
    }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try{
        const product = await productService.getProduct(productId);
        if(product!=null){
            const deletedProduct = await productService.deleteProduct(productId);
            fs.unlinkSync(product.file)
            return res.status(200).send(success('Producto Eliminado'));
        }
        return res.status(404).send(error('Producto no encontrado'));
    }catch(err){
       res.status(400).send(error('Error 400',err));
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}