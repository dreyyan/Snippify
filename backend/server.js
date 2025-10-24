// [IMPORT] Database
const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

// [IMPORT] Tools
require('dotenv').config()

// [IMPORT] Express.js
const express = require('express')
const cors = require('cors')
const app = express()

// [IMPORT] Routers
const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const folderRoutes = require('./routes/folders')
const snippetsRoutes = require('./routes/snippets')

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
// [ROUTES]
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/folders', folderRoutes);
app.use('/api/snippets', snippetsRoutes);

// =================================================================
// [LISTENER] Start HTTP server
app.listen(process.env.PORT, () => {
    console.log(`Express.js server started at ${process.env.PORT}`)
})