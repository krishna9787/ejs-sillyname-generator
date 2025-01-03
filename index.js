import express from "express";
import { dirname } from "path"
import { fileURLToPath } from "url";
import generateName from "sillyname";

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const port=3000
let sillyName;

function bandNameGenerator(req, res, next) {
    sillyName = generateName();
    next();
}
app.use(express.static(__dirname + "/public"))
app.use(bandNameGenerator)

app.get("/", (req,res) => {
    let data = {
        year: new Date().getFullYear()
    }
    res.render(__dirname + "/views/index.ejs", data)
})

app.post("/", (req,res) => {
    let data = {
        bandName: sillyName,
        year: new Date().getFullYear()
    }
    res.render(__dirname + "/views/index.ejs", data)
})

app.listen(port, () => {
    console.log("Listening on port ", port)
})