const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/userModel');

const signUpController = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) return res.json({ error: 'Invalid credentials' });
        const userExists = await User.findOne({ username });
        if (userExists) return res.json({ error: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword });
        const userToReturn = { userId: user._id, username };
        return res.json({ user: userToReturn, success: true });
    } catch (error) {
        console.log(error);
        return res.json({ serverError: 'Something went wrong' });
    }
}

const logInController = async (req,res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) return res.json({ error: 'Invalid credentials' });
        const user = await User.findOne({ username });
        if (!user) return res.json({ error: 'user doesn\'t exists' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.json({ error: 'Invalid credentials' });
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
        const userToReturn = { userId: user._id, username };
        return res.json({ token, user: userToReturn, success: true });
    } catch (error) {
        console.log(error);
        return res.json({ serverError: 'Something went wrong' });
    }
}

module.exports = { 
    signUpController, 
    logInController
}