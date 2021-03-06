const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cors = require('cors')
const logger = require('morgan');


// read .env at root, set up process.env
dotenv.config();

// server set up
const app = express()
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})

// * middleware
app.use(logger('dev'));
app.use(express.json())
app.use(cookieParser())

// have browser set cookies from the origin
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

// connect to mongoDB
mongoose.connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return console.error(err);
    console.log("Connected to MonogoDB")
})

// routers

app.use('/auth', require('./routers/userRouter'))
app.use('/customer', require('./routers/customerRouter'))