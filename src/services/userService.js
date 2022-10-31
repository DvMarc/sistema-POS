const User = require('../models/user');

const getAllUsers = async (pageOptions) => { 
    const users = await User.find()
        .sort({ username: pageOptions.sort })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);
    return users;
};

const getUser = async (userId) => { 
    const user = await User.findById(userId);
    return user;
};


const createUser = async (req,res) => { 
    const user = new User({
        username: req.username,
        password: req.password,
        email: req.email,
        name: req.name,
        lastName: req.lastName,
        file: req.file
    });
    const userCreated = await user.save();
    return userCreated;
};

const updateUser = async (userId, newData) => { 
    const userUpdate = await User.findByIdAndUpdate(userId, newData);
    return userUpdate;
};

const deleteUser = (userId) => { 
    const deletedUser = User.findByIdAndDelete(userId)
    return deletedUser;
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
