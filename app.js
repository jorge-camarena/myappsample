const express = require("express")
const path = require("path")
const app = express()

const members = require("./Members")
const PORT = process.env.PORT || 8000

function logger(req, res, next) {
    console.log(`${req.protocol}`)
    next()
}

//Init all middleware
app.use("/api",logger)
app.use(express.json())

//Set up static assets
app.use(express.static(path.join(__dirname, "client")))
app.use("/home", (req, res, next) => {
    console.log("example of middleware functions")
    next()
})

//Setting up routes
app.get("/api/members", (req, res) => {
    res.json(members)
})

app.get("/api/members/:id", (req, res) => {
    res.json(members.filter(member => member.id === parseInt(req.params.id)))
})

app.get("/home", (req, res) => {
    res.send("no mounted route provided")
})

app.post("/", (req, res) => {
    console.log(req.body.name)
    res.send(req.body.name)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})