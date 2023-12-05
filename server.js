require("dotenv").config()
const chalk = require("chalk")
const app = require("./app")
const PORT = process.env.PORT || PORT

app.listen(PORT, () => console.log(chalk.green(`Server running on port ${PORT}...`)))
