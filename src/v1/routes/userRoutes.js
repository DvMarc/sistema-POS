const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const {uploadImage, uploadImageWithUpdate} = require('../../middlewares/upload');
const { checkAuth } = require("../../middlewares/authMiddleware");

router
    .get('/', checkAuth,userController.getAllUsers)

    .get('/:userId', userController.getUser)

    .post('/',uploadImage, userController.createUser)

    .patch('/:userId',uploadImageWithUpdate,userController.updateUser)

    .delete('/:userId', userController.deleteUser);
    
module.exports = router;
