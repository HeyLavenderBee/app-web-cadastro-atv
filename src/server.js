const dotenv = require("dotenv");
const path = require("path");
dotenv.config({quiet: true, path: path.resolve(__dirname, "..", ".env")});

const userRoutes = require("./routes/users.routes");
const express = require("express");

const app = express();
app.use(express.json());
const PORT = process.env.PORT; 

const publicPath = path.join(__dirname, "..", "public");
const pagesPath = path.join(publicPath, "pages");
const assetsPath = path.join(publicPath, "assets");

app.listen(PORT, function(){
    console.log("Rodando");
});

app.get("/", function(req, res){
    const filePath = path.join(pagesPath, "index.html");
    res.sendFile(filePath);
})

app.use("/assets", express.static(assetsPath));
app.use("/users", userRoutes);
