const userService = require('../services/userService');
const { success, error } = require("../utils/responses");

const getAllUsers = async (req, res) => {
    const allUsers = await userService.getAllUsers();
    res.send(allUsers);
};

const getUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUser(userId);
        if(user==null)
            return res.status(404).send(error('Usuario no encontrado'));
        return res.status(200).send(success('Usuario Encontrado',user));
    }catch(err){
       res.status(400).send(error('Error 400',err));
    }
}; 

const createUser =  async (req, res) => {
    try {
        const {username, password, email, name, lastName} = req.body; 
        const user = await userService.createUser({username,password,email,name,lastName});
        res.status(201).send(success('Usuario Creado',user))
    }catch (err){
        res.status(400).send(error('Error 400',err));
    }
};

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUser(userId);
        if(user!=null){
            const updatedUser = await userService.updateUser(userId, req.body);
            return res.status(200).send(success('Usuario Editado'));
        }
        return res.status(404).send(error('Usuario no encontrado'));
    }catch(err){
        res.status(400).send(error('Error 400',err));
    }
};

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try{const user = await userService.getUser(userId);
        if(user!=null){
            const deletedUser = await userService.deleteUser(userId);
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
    deleteUser,
};
