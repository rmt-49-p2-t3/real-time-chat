if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const errorHandlers = require('../server/middlewares/ErrorHandler');


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use(require(`../server/routes`))
app.use(errorHandlers);

app.listen(port)