const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


function generateToken(userId) {

    return jwt.sign(
        {
            id: userId
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    );
}


// REGISTER
async function register(req, res) {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                message:
                    "Please provide name, email and password"
            });
        }


        if (password.length < 6) {

            return res.status(400).json({
                message:
                    "Password must be at least 6 characters"
            });
        }


        const existingUser =
            await User.findOne({
                email
            });


        if (existingUser) {

            return res.status(400).json({
                message:
                    "User already exists"
            });
        }


        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        const user =
            await User.create({
                name,
                email,
                password: hashedPassword
            });


        const token =
            generateToken(user._id);


        res.status(201).json({

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}


// LOGIN
async function login(req, res) {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({
                email
            }).select("+password");


        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }


        const token =
            generateToken(user._id);


        res.json({

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}


// CURRENT USER
async function getMe(req, res) {

    try {

        const user =
            await User.findById(
                req.user.id
            ).select("-password");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });
        }


        res.json({

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    register,
    login,
    getMe
};