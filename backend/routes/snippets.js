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
// [GET] Retrieve all user snippets
router.get('/',  verifyToken, async (req, res) => {
    try {
        const snippets = await prisma.snippet.findMany();
        res.status(200).json(successResponse("Snippets retrieved successfully", snippets));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch snippets"));
    }
});

// [GET] Retrieve snippets in a specific folder
router.get('/:folder', verifyToken, async (req, res) => {
    const folder = req.params.folder;

    try {
        const snippets = await prisma.snippet.findMany({
            where: { folder: { name: folder }, userId: req.userId }
        });
        res.status(200).json(successResponse(`${folder} snippets retrieved successfully`, snippets));
    } catch (err) {
        res.status(400).json(errorResponse(`Failed to fetch snippets from ${folder}`));
    }
});

// [GET] Retrieve a snippet
router.get('/:folder/:id', verifyToken, async (req, res) => {
    const folder = req.params.folder;
    const id = req.params.id;

    try {
        const snippet = await prisma.snippet.findUnique({
            where: { id: parseInt(id) },
        });
        res.status(200).json(successResponse("Snippet retrieved successfully", snippet));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch snippet"));
    }
});

// [POST] Add a snippet
router.post('/:id', verifyToken, async (req, res) => {
    const { title, language, content } = req.body;
    const folderId = parseInt(req.params.id);

    try {
        const snippet = await prisma.snippet.create({
            data: { title, language, content, userId: req.userId, folderId }
        });
        res.status(201).json(successResponse("snippet created successfully", snippet));
    } catch (err) {
        res.status(400).json(errorResponse("failed to create a snippet", err.message));
    }
});

// [PATCH] Rename a snippet
router.patch('/:id/rename', verifyToken, async (req, res) => {
    const snippetId = parseInt(req.params.id);
    const { title } = req.body;

    try {
        const snippet = await prisma.snippet.update({
            where: { id: snippetId, userId: req.userId },
            data: { title }
        });
        res.status(201).json(successResponse("snippet renamed successfully", snippet));
    } catch (err) {
        res.status(400).json(errorResponse("failed to rename snippet", err.message));
    }
});

// [PATCH] Update a snippet
router.patch('/:id/update', verifyToken, async (req, res) => {
    const { title, language, content } = req.body;
    const snippetId = parseInt(req.params.id);

    try {
        const snippet = await prisma.snippet.update({
            where: { id: snippetId, userId: req.userId },
            data: { title, language, content }
        });
        res.status(201).json(successResponse("snippet updated successfully", snippet));
    } catch (err) {
        res.status(400).json(errorResponse("failed to update snippet", err.message));
    }
});

// [DELETE] Delete a snippet
router.delete('/:id', verifyToken, async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const deletedSnippet = await prisma.snippet.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json(successResponse("Snippet deleted successfully", deletedSnippet));
    } catch (err) {
        res.status(404).json(errorResponse("Failed to delete a snippet", err.message));
    }
});

// [DELETE] Delete all snippets
router.delete('/folder/:id', verifyToken, async (req, res) => {
    const id =  parseInt(req.params.id);

    try {
        const deletedSnippets = await prisma.snippet.deleteMany({
            where: { folderId: id, userId: req.userId },
        });
        res.status(200).json(successResponse("Snippets deleted successfully", deletedSnippets));
    } catch (err) {
        res.status(404).json(errorResponse("Failed to delete snippets", err.message));
    }
});

module.exports = router;