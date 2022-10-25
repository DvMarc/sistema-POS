const User= require('../models/user');

const getAllUsers = async () => { 
    const users = await User.find({});
    return users;
};

const getUser = async (username) => { 
    const user = await User.findOne({username});
    return user;
};


const createUser = async (req,res) => { 
    const user = new User({
        username: req.username,
        password: req.password,
        email: req.email,
        name: req.name,
        lastName: req.lastName
    });
    const userCreteated = await user.save();
    return userCreteated;
};

const updateUser = async (userId, newData) => { 
    const userUpdate = await User.findOneAndUpdate(userId, newData);
    return userUpdate;
};

const deleteUser = (userId) => { 
    const deletedUser = User.deleteOne({"username" : userId})
    return deletedUser;
};

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
