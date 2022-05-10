const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userModel');

const requiresAuth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) return res.json({ unauthorized: true });
            const { userId } = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(userId);
            const newuser = { _id: user._id };
            req.user = newuser;
            next();
        } else {
            return res.json({ unauthorized: true });
        }
    } catch (error) {
        return res.json({ unauthorized: true });
    }
};

module.exports = requiresAuth;