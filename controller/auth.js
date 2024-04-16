const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(422).send('All fields are required.')
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ message: 'email already exist' });
        }

        const userdata = await new User({ username, email, password });

        //middleware password hashing working here from userSchema
        await userdata.save();
        return res.status(201).json({ message: "Registration successfull." })
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: e, message: 'Registration unsuccesfull' })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailExist = await User.findOne({ email: email });
        if (emailExist) {
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if (isMatch) {
                console.log(emailExist)
                const token = await emailExist.generateAuthToken();
                console.log(`Token: ${token}`);
                res.status(200).json({ message: "User Login successfully", response: emailExist, token: token });
            }
            else {
                res.status(400).json({ message: "Invalid Credentials p" });
            }
        }
        else {
            res.status(400).json({ message: "Invalid Credentials m" });
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

const validateUser = async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        const userId = user._id;
        const userData = await User.findById(userId);
        console.log(userData)
        res.status(200).json({ message: "Authorized User", response: userData, token: token });

    }
    catch (e) {
        console.log(e)
        res.status(500).send(e);
    }
}

module.exports = { register, userLogin, validateUser }