// [IMPORT] Database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// [IMPORT] Tools
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// [IMPORT] Express Router
const express = require('express')
const router = express.Router();

// [IMPORT] Utility functions
const { successResponse, errorResponse } = require('../utils/response');

// =================================================================
// [HELPER] Hash password
const hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS) || 10);
        return hashed;
    } catch (err) {
        console.error("Error hashing password", err);
        throw err;
    }
}

// =================================================================
// [POST] User Login
router.post('/login', async (req, res) => {
    const { usernameEmail, password, rememberMe } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: usernameEmail },
                    { email: usernameEmail }
                ]
            }
        });

        // [ERROR] Non-existing user
        if (!user) {
            return res.status(404).json(errorResponse("User not found"));
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.passwordHash);

        // [ERROR] Wrong password
        if (!isMatch) {
            return res.status(401).json(errorResponse("Invalid password"));
        }

        // Remember me
        const expiresIn = rememberMe ? "7d" : "1h";

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: expiresIn });

        // Remove password from response
        const { passwordHash, ...userWithoutPassword } = user;
        res.status(200).json(successResponse("Login successful", { user: userWithoutPassword, token }));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to log in user", err.message));
    }
});

// [POST] User Sign Up
router.post('/signup', async (req, res) => {
    const { name, email, username, password } = req.body;
    
    try {
        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: { name, email, username, passwordHash: hashedPassword }
        });

        const { passwordHash, ...userWithoutPassword } = newUser; // Remove hashed password from response
        res.status(201).json(successResponse("User created successfully", userWithoutPassword));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create user", err.message));
    }
});

module.exports = router;