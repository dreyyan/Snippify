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
const { verifyToken } = require('../middleware/authMiddleware');

// =================================================================
// [GET] Retrieve all user folders
router.get('/', verifyToken, async (req, res) => {
    try {
        const folders = await prisma.folder.findMany({
            where: { userId: req.userId },
            include: { snippets: true },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(successResponse("Folders retrieved successfully", folders));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch folders", err.message));
    }
});

// [GET] Retrieve a specific folder
router.get('/:id', verifyToken, async (req, res) => {
    const id = parseInt(req.params.id);
    

    try {
        const folders = await prisma.folder.findFirst({
            where: { id, userId: req.userId },
            include: { snippets: true },
        });
        res.status(200).json(successResponse("Folder retrieved successfully", folders));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch folder", err.message));
    }
});

// [POST] Create a folder
router.post('/', verifyToken, async (req, res) => {
    const { name } = req.body;

    try {
        const newFolder = await prisma.folder.create({
            data: { name, userId: req.userId }
        });
        res.status(201).json(successResponse("Folder created successfully", newFolder));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create folder", err.message));
    }
});

// [PATCH] Rename a folder
router.patch('/:id', verifyToken, async (req, res) => {
    const folderId = req.params.id;
    const { name } = req.body;

    try {
        const renamedFolder = await prisma.folder.update({
            where: { id: folderId, userId: req.userId },
            data: { name }
        });
        res.status(200).json(successResponse("Folder renamed successfully", renamedFolder));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to rename folder", err.message));
    }
});


// [DELETE] Delete all folders
router.delete('/', verifyToken, async (req, res) => {
    try {

        // Delete all snippets inside folder first
        await prisma.snippet.deleteMany({
            where: { userId: req.userId }
        });

        // Delete folders after
        const deletedFolders = await prisma.folder.deleteMany({
            where: { userId: req.userId }
        });
        res.status(200).json(successResponse("Folders deleted successfully", deletedFolders));
    } catch (err) {
        res.status(404).json(errorResponse("Failed to delete folders", err.message));
    }
});

// [DELETE] Delete a folder
router.delete('/:id', verifyToken, async (req, res) => {
    const folderId = parseInt(req.params.id);

    try {

        // Delete all snippets inside folder first
        await prisma.snippet.deleteMany({
            where: { id: folderId }
        });

        // Delete folder after
        const deletedFolder = await prisma.folder.delete({
            where: { id: folderId }
        });
        res.status(200).json(successResponse("Folder deleted successfully", deletedFolder));
    } catch (err) {
        res.status(404).json(errorResponse("Failed to delete folder", err.message));
    }
});

module.exports = router;