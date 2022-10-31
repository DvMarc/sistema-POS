const { success, error } = require("../utils/responses");
const userService = require('../services/userService');
const validateUserCreate = require("../validators/userCreatedValidator");
const fs = require('fs');

const getAllUsers = async (req, res) => {
    try{
        const pageOptions = {
            page: parseInt(req.query.page, 10) || 0,
            limit: parseInt(req.query.limit, 10) || 10,
            sort: parseInt(req.query.sort, 10) || 0,
        };
        const allUsers = await userService.getAllUsers(pageOptions);
        res.status(200).send(success('Todos los usuarios',allUsers));
    }catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

const getUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUser(userId);
        if(user==null){
            return res.status(404).send(error('Usuario no encontrado'));
        }
        return res.status(200).send(success('Usuario Encontrado',user));
    }catch(err){
       res.status(400).send(error('Error 400',err));
    }
}; 

const createUser =  async (req, res) => {
    try {
        const body = req.body;
        const value = await validateUserCreate.schema.validateAsync(body);
        value['file'] =  req.file.path
        const user = await userService.createUser(value);
        res.status(201).send(success('Usuario Creado',user))
    }catch (err){
        res.status(400).send(error('Error 400 en createUser',err));
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUser(userId);
        if(user!=null){
            if(req.file != undefined){
                fs.unlinkSync(user.file)
                const body = req.body;
                body['file'] =  req.file.path
                const updatedUser = await userService.updateUser(userId,body);
                return res.status(200).send(success('Usuario Editado'));
            }else{
                const updatedUser = await userService.updateUser(userId,req.body);
                return res.status(200).send(success('Usuario Editado'));
            }
        }
        return res.status(404).send(error('Usuario no encontrado'));
    }catch(err){
        if(req.file != undefined) fs.unlinkSync(req.file.path)
        res.status(400).send(error('Error 400',err));
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUser(userId);
        if(user!=null){
            const deletedUser = await userService.deleteUser(userId);
            fs.unlinkSync(user.file)
            return res.status(200).send(success('Usuario eliminado'));
        }
        return res.status(404).send(error('Usuario no encontrado'));
    }catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}