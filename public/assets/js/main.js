const nameInput = document.getElementById("user-name");
const emailInput = document.getElementById("user-email");
const usersTableBody = document.getElementById("users-table-body");
const result = document.getElementById("result");
const saveButton = document.getElementById("save-user");
const clearButton = document.getElementById("clear-user");

function showResult(message, type){
    result.innerHTML = message;
    result.className = `result ${type}`;
}

function renderEmptyTable(message){
    usersTableBody.innerHTML = `
        <tr>
            <td colspan="3" class="user-table-empty">${message}</td>
        </tr>
    `;
}

async function deleteUser(id){
    showResult("Excluindo registro...", "loading");
    const response = await fetch(`/users/${id}`,{method:"DELETE"});
    if(response.ok){
        const users = await response.json();
        await loadUsers();
        showResult("Usuário excluído com sucesso!", "success");
    } else{
        showResult("Houve um erro ao excluir o usuário.", "error");
    }
}

function renderUsers(users){
    if(users.length == 0){
        renderEmptyTable("Nenhum usuário encontrado.");
    } else{
        usersTableBody.innerHTML = "";
        let rowsTemp = "";
        for(let i = 0; i < users.length; i++){
            rowsTemp += `
                <tr>
                    <td>${users[i].name}</td>
                    <td>${users[i].email}</td>
                    <td class="user-table-actions-cell">
                        <button class="delete-user-button" onClick="deleteUser(${users[i].id_user})">
                            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                                <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v8h-2V9zm4 0h2v8h-2V9zM7 9h2v8H7V9zm1 12a2 2 0 0 1-2-2V8h12v11a2 2 0 0 1-2 2H8z"
                                fill="currentColor">
                                </path>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        }
        usersTableBody.innerHTML = rowsTemp;
    }
}

async function loadUsers(){
    const response = await fetch("/users");
    if(response.ok){
        const users = await response.json();
        renderUsers(users);
    } else{
        renderEmptyTable("Houve um erro ao obter os usuários.");
    }
}

async function createUser(){
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    if(name && email){
        showResult("Salvando usuário...", "loading");
        const response = await fetch(
            `/users`,
            {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, email})
            }
        );
        if(response.ok){
            const user = await response.json();
            await loadUsers();
            showResult("Usuário cadastrado com sucesso!", "success");
            clearUser();
        } else{
            showResult("Houve um erro ao cadastrar o usuário.", "error");
        }
    } else{
        showResult("Preencha nome e email para continuar.", "error");
    }
}

function clearUser(){
    nameInput.value = "";
    emailInput.value = "";
}

saveButton.addEventListener("click", function(){
    createUser();
});

clearButton.addEventListener("click", function(){
    clearUser();
});

loadUsers();
