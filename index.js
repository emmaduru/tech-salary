require("dotenv").config()
const express = require("express")
const fs = require("fs")

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/add", (req, res) => {
    fs.readFile(process.env.JSON_FILE, (err, data) => {
        const json = JSON.parse(data)
        json.push(req.body)
        fs.writeFile(process.env.JSON_FILE, JSON.stringify(json), function(err){
            if (err) throw err;
            res.json({ success: true, message: "Salary successfully added."});
        });
    })
})

app.get("/thanks", (req, res) => {
    res.render("thanks")
})

app.listen(5000, (e) => {
    if (e) {
        throw e;
    }
    console.log("Server running at port 5000")
})