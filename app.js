const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const chalk = require("chalk")

// Security

const helmet = require("helmet")
const cors = require("cors")
const corsOptions = require("./config/corsOptions")
const xss = require("xss-clean")
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp")

const app = express()
const path = require("path")
const { logger } = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const connectDB = require("./config/dbConn")

const errorHandlerr = require("./middleware/errorMiddleware")

// Connecting to Database Environments
console.log(chalk.redBright(process.env.NODE_ENV))
connectDB()

// Middlewares
app.use(logger)

app.use(cors(corsOptions))

// Error Middleware
app.use(errorHandler)
app.use(errorHandlerr)

app.use(express.json({ limit: "30mb", extended: true }))
app.use(
	helmet.contentSecurityPolicy({
		useDefaults: true,
		directives: {
			"img-src": ["'self'", "https: data:"],
		},
	}),
)
app.use(xss())

app.use(cookieParser())
app.use(express.urlencoded({ limit: "30mb", extended: false }))
app.use(bodyParser.json())

// Prevent SQL injection
app.use(mongoSanitize())

// HTTP Param Pollution
app.use(hpp())

// Routes
app.use("/", express.static(path.join(__dirname, "public")))

app.use("/", require("./routes/root"))
app.use("/api/posts", require("./routes/postRoute"))

app.all("*", (req, res) => {
	res.status(404)
	if (req.accepts("html")) {
		res.sendFile(path.join(__dirname, "views", "404.html"))
	} else if (req.accepts("json")) {
		res.json({ message: "404 Not Found" })
	} else {
		res.type("txt").send("404 Not Found")
	}
})

module.exports = app
