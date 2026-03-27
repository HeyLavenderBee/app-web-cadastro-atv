const express = require("express");
const {listUsers, createUser, deleteUser} = require("../database/users");

const router = express.Router();

//curl -X GET http://localhost:3002/users
router.get("/", async function(_req, res){
    const users = await listUsers();
    res.status(200).json(users); //poderia ser res.send também, mas é bom deixar claro que é json
})

//curl -X POST http://localhost:3002/users/ -H "Content-Type: application/json" -d "{\"name\": \"Tiago\", \"email\": \"tiago@teste.com\"}"
router.post("/", async function(req, res){
    const {name, email} = req.body;
    const user = await createUser(name, email);
    res.status(201).json(user);
})

//para deletar, usar padrão de mercado: http://localhost:3002/users/[id], pode ser pelo body, mas esse é o padrão
//curl -X DELETE http://localhost:3002/users/3
router.delete("/:arley", async function(req, res){
    const id = req.params.arley;
    const user = await deleteUser(id);
    if(user.message){
        res.status(404).json(user);
    } else{
        res.status(200).json(user);
    }
    
})

module.exports = router;
