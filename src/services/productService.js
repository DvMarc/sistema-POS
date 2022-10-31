const Product = require('../models/product');

const getAllProducts = async (pageOptions) => { 
    const products = await Product.find()
        .sort({ price: pageOptions.sort })
		.skip(pageOptions.page * pageOptions.limit)
		.limit(pageOptions.limit);
    return products;
};

const getProduct = async (productId) => { 
    const product = await Product.findById(productId);
    return product;
};


const createProduct = async (req,res) => { 
    const product = new Product({
        name: req.name,
        description: req.description,
        price: req.price,
        file: req.file
    });
    const productCreteated = await product.save();
    return productCreteated;
};

const updateProduct = async (productId, newData) => { 
    const productUpdate = await Product.findByIdAndUpdate(productId, newData);
    return productUpdate;
};

const deleteProduct = (productId) => { 
    const deletedProduct = Product.findByIdAndDelete(productId)
    return deletedProduct;
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};