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
// [GET] Retrieve all user snippets
router.get('/', (req, res) => {
    try {
        const snippets = prisma.snippets.findMany();
        res.status(200).json(successResponse("Snippets retrieved successfully", snippets));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch snippets"));
    }
});

// [GET] Retrieve snippets in a specific folder
router.get('/:folder', (req, res) => {
    const folder = req.params.folder;

    try {
        const snippets = prisma.snippets.findUnique({
            where: {},
        });
        res.status(200).json(successResponse(`${folder} snippets retrieved successfully`, snippets));
    } catch (err) {
        res.status(400).json(errorResponse(`Failed to fetch snippets from ${folder}`));
    }
});

// [GET] Retrieve a snippet
router.get('/:folder/:id', (req, res) => {
    const folder = req.params.folder;
    const id = req.params.id;

    try {
        const snippet = prisma.snippets.findUnique({
            where: { id: parseInt(id) },
        });
        res.status(200).json(successResponse("Snippet retrieved successfully", snippet));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to fetch snippet"));
    }
});

// [POST] Create a snippet
router.post('/', async (req, res) => {
    const { title, language, content } = req.body;

    try {
        const snippet = await prisma.snippet.create({
            data: { title, language, content, userId }
        });
        res.status(201).json(successResponse("Snippet created successfully", snipet));
    } catch (err) {
        res.status(400).json(errorResponse("Failed to create a snippet", err.message));
    }
});

// [PATCH] Update a snippet
router.patch('/:id', (req, res) => {

});


// [DELETE] Delete a snippet
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedSnippet = await prisma.snippet.delete({
            where: { userId: parseInt(id) }
        });
        res.status(201).json(successResponse("Snippet deleted successfully", deletedSnippet));
    } catch (err) {
        res.status(404).json(successResponse("Failed to delete a snippet", err.message));
    }
});

module.exports = router;