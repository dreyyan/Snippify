// [IMPORT] Database
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// [IMPORT] Tools
require('dotenv').config()
const bcrypt = require('bcrypt')

// [IMPORT] Express.js
const express = require('express')
const cors = require('cors')
const app = express()

// =================================================================
// [MESSAGE] Return success message
const successResponse = (message, data=null) => ({
    success: true,
    message: `[SUCCESS] ${message}.`,
    data
});

// [MESSAGE] Return error message
const errorResponse = (message, data=null) => ({
    success: false,
    message: `[ERROR] ${message}.`,
    data
});

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
// (1)[MIDDLEWARE] Parse incoming JSON request bodies
app.use(express.json())

// (2)[MIDDLEWARE] Allow request from React frontend
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// (3)[MIDDLEWARE] Custom error handling
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.status || 500;
    const errorMessage = err.message || "Something went wrong";

    res.status(statusCode).json(errorResponse(errorMessage));
});

// =================================================================
// [GET] Retrieve all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, username: true, createdAt: true }
        });
        res.status(200).json(successResponse("Users retrieved successfully", users));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch users", err.message));
    }
});

// [GET] Retrieve a specific user
app.get('/api/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        const { passwordHash, ...userWithoutPassword } = user; // Remove hashed password from response
        res.status(200).json(successResponse("User retrieved successfully", userWithoutPassword));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch users", err.message));
    }
});

// [POST] User Login
app.post('/api/auth/login', async (req, res) => {
    const { usernameEmail, password } = req.body;

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

        // Add JWT...

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json(successResponse("Login successful", { user: userWithoutPassword }));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to log in user", err.message));
    }
});

// [POST] User Sign Up
app.post('/api/auth/signup', async (req, res) => {
    const { name, email, username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    try {
        const newUser = await prisma.user.create({
            data: { name, email, username, passwordHash: hashedPassword }
        });
        const { password, ...userWithoutPassword } = newUser; // Remove hashed password from response
        res.status(201).json(successResponse("User created successfully", userWithoutPassword));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create user", err.message));
    }
});

// [DELETE] Remove user from database
app.delete('/api/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        const { password, ...userWithoutPassword } = deletedUser; // Remove hashed password from response
        res.status(201).json(successResponse(`User ${deletedUser.username} deleted successfully`, userWithoutPassword));
    } catch (err) {
        res.status(404).json(successResponse("Failed to delete user", err.message));
    }
});

// =================================================================
// [LISTENER] Start HTTP server
app.listen(process.env.PORT, () => {
    console.log(`Express.js server started at ${process.env.PORT}`)
})