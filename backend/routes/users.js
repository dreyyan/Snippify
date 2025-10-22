// [IMPORT] Database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// [IMPORT] Tools
require('dotenv').config()

// [IMPORT] Express Router
const express = require('express')
const router = express.Router();

// [IMPORT] Utility functions
const { successResponse, errorResponse } = require('../utils/response');

// =================================================================
// [GET] Retrieve all users
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
// [DELETE] Remove user from database
router.delete('/:id', async (req, res) => {
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

module.exports = router;