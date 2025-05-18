const User = require('../models/user_models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
    const { email, password, type } = req.body;
    try {
        const user = await User.findOne({ email, type });
        if (!user) return res.status(404).json({ message: 'User not found or type mismatch' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });
        res.status(200).json({ message: 'Sign-in successful',type, token});
    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error });
    }
};

module.exports = {signIn};
