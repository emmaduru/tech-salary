require("dotenv").config()
const express = require("express")
const fs = require("fs")

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.static("public"))


app.get("/", (req, res) => {
    return res.redirect("/add_salary");
})

app.get("/add_salary", (req, res) => {
    return res.render("index);
})

app.post("/add", (req, res) => {
    fs.readFile(process.env.JSON_FILE, (err, data) => {
        const json = JSON.parse(data)
        json.push(req.body)
        fs.writeFile(process.env.JSON_FILE, JSON.stringify(json), function(err){
            if (err) throw err;
            return res.json({ success: true, message: "Salary successfully added."});
        });
    })
})

app.get("/thanks", (req, res) => {
    return res.render("thanks")
})

// Error handlers
app.use((req, res, next) => {
    return res.status(404).render("404")
})

app.use((err, req, res, next) => {
    return res.status(500).render("500")
})

// Set server PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, (e) => {
    if (e) {
        throw e;
    }
    console.log(`Server running at port ${PORT}.`)
})
