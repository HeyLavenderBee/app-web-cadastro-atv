const pool = require("./connection");

async function listUsers(){
    const sql = "SELECT * FROM users ORDER BY name ASC";
    const {rows} = await pool.query(sql);
    return rows;
}

async function createUser(name, email){
    const sql = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email]
    const {rows} = await pool.query(sql, values); //primeiro, comando, depois, valores sendo passados
    return rows;
}

module.exports = {
    listUsers, createUser
}
