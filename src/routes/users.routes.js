const express = require("express");
const {listUsers} = require("../database/users");

const router = express.Router();

router.get("/", async function(_req, res){
    const response = await listUsers();
    res.send("oie");
})

module.exports = router;
