const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { validateUserCreate } = require("../../validators/userCreatedValidator");
const { validateUserUpdate } = require("../../validators/userUpdatedValidator");

router
    .get('/', userController.getAllUsers)

    .get('/:userId', userController.getUser)

    .post('/', validateUserCreate,userController.createUser)

    .patch('/:userId', validateUserUpdate,userController.updateUser)

    .delete('/:userId', userController.deleteUser);
    
module.exports = router;
