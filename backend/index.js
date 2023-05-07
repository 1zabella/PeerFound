const express = require('express')
const app = express()
const port = 3001
require('dotenv').config()

require('./database/mongoose')()

app.use(express.json())

var cookieParser = require('cookie-parser')
app.use(cookieParser())

const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}))

const userRoutes = require('./routes/user')
app.use('/users', userRoutes)

const blockchainchallenge = require('./routes/blockchainchallenge')
app.use('/blockchainchallenge', blockchainchallenge)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
