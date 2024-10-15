require('dotenv').config();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { HttpException } = require('../exceptions/HttpsException');

const createUser = async (user) => {
    const userData = user;
    let existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
        throw HttpException(409, 'This Email is already in use!')
    } else {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(userData.password, await bcrypt.genSalt(saltRound));
        userData.password = hashedPassword;

        const newUser = new User(userData);
        const collectionData = await newUser.save();
        return collectionData;
    }
}

const loginUser = async (user) => {
    const userDetail = await User.findOne({ email: user.email });

    if (!userDetail) {
        throw HttpException(401, 'Incorrect Email')
    } else {
        const matchUser = await bcrypt.compare(user.password, userDetail.password);

        if (!matchUser) {
            throw HttpException(401, 'Incorrect Password')
        }
        const updateUserData = await User.findByIdAndUpdate({ _id: userDetail._id, isDelete: false, isAccess: true }, { $set: { isActive: true } }, { new: true })
        const token = createToken(updateUserData);
        const userDataAndTokenData = { user: updateUserData, token: token };
        return userDataAndTokenData;
    }
}

const createToken = (user) => {
    const dataStoredInToken = { _id: user._id };
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = "1d";

    return { expiresIn, token: jwt.sign(dataStoredInToken, secretKey, { expiresIn }) };
}



module.exports = { createUser, loginUser };
