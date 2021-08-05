require("dotenv").config();
require("express-async-errors");

const express = require('express')
const app = express()
const config = require('config')
const cors = require("cors");

// imports
const connection = require('./db')
const users = require('./routes/users')
const admin = require('./routes/admins')
const auth = require('./routes/auth')
const adminAuth = require('./routes/adminAuth')
const document = require('./routes/documents')
const flashcards = require("./routes/flashcards")

// errors imports
const logger = require("./utils/logger")
const serverError = require("./middlewares/errors")
const notFoundErrors = require("./middlewares/errors")

// checking if jwt is defined
if (!config.get("jwtPrivateKey")){
    logger.error("FATAL ERROR!! JWT is not defined!")
    process.exit(1)
}


// DB connection
connection()

// capturing errors
app.use(serverError)
app.use(notFoundErrors)

// middlewares
app.use(cors());
app.use(express.json())
app.use('/api/users', users)
app.use('/api/admin', admin)
app.use('/api/auth', auth)
app.use('/api/course', document)
app.use('/api/admin-auth', adminAuth)
app.use("/api/flashcards", flashcards)


// port 
const port = process.env.PORT || 8080
app.listen(port, () => logger.info(`Express just started in port: ${port}`))
