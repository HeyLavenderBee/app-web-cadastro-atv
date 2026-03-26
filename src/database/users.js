const pool = require("./connection");

async function listUsers(){
    const sql = "SELECT * FROM users ORDER BY name ASC";
    const {rows} = await pool.query(sql);
    return rows;
}

async function createUser(name, email){
    const sql = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    const values = [name, email];
    const {rows} = await pool.query(sql, values); //primeiro, comando, depois, valores sendo passados
    return rows[0];
}

async function deleteUser(id){
    const sql= "DELETE FROM users WHERE id_user = $1 RETURNING *";
    const values = [id]; //mesmo sendo apenas um valor, precisa ser um array
    const response = await pool.query(sql, values);
    if(response.rowCount == 1){
        return response.rows[0]; //tem o [0], pois o resultado retorna um array [{}], e eu quero só o {}
    } else{
        return {message: "Usuário não encontrado."};
    }
}


module.exports = {
    listUsers, createUser, deleteUser
}
