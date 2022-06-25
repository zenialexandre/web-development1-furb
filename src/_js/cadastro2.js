const idInput = document.getElementById('searchID');
const statusInput = document.getElementById('ieStatus');
const msgInput = document.getElementById('ieMsg');
const tbody = document.getElementById('personTbody');

function changeSearchButtonState() {
    const searchButton = document.getElementById('searchButton');
    return idInput.value.trim() != null && idInput.value.trim() != "" ? searchButton.disabled = false : searchButton.disabled = true;
}

function changeInsertButtonState() {
    const insertButton = document.getElementById('insertButton');
    return statusInput.value.trim() != null && statusInput.value.trim() != "" && msgInput.value.trim() != null && msgInput.value.trim() != "" ?
           insertButton.disabled = false : insertButton.disabled = true;
}

function searchButtonOnClick() {
    myRequest = {
        method  : 'GET',
        headers : { 'Content-type' : 'application/json; charset=UTF-8' },
        mode    : 'cors',
        cache   : 'default'
    };

    fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/' + idInput.value.trim(), myRequest).then(res => {
        return res.json();
    }).then(resJson => {
        console.log(resJson);
        this.createObject(resJson);
    }).catch(() => {
        alert('ID informado não foi encontrado, por favor tente novamente com um novo ID.');
        idInput.value = '';
    });
}

const deleteButtonOnClick = (event) => {
    if (event.target.type == 'button') {
        myRequest = {
            method  : 'DELETE',
            headers : { 'Content-type' : 'application/json; charset=UTF-8' }
        };

        fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/', myRequest).then(res => {
            return res.json();
        }).then(resJson => {
            console.log(resJson);
            this.generateReturnModal(resJson);
        });
    }
}

function insertButtonOnClick() {
    myRequest = {
        method  : 'PUT',
        body    : JSON.stringify(
            {
                status   : statusInput.value,
                mensagem : msgInput.value
            }
        ),
        headers : { 'Content-type': 'application/json; charset=UTF-8' }
    };

    fetch('https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro/', myRequest).then(res => {
        return res.json();
    }).then(resJson => {
        console.log(resJson);
        this.generateReturnModal(resJson);
    });
}

function createObject(resJson) {
    const person = new Pessoa(resJson.id, resJson.nome, resJson.departamento, resJson.endereco, resJson.email);
    this.createShowPerson(person);
}

function createShowPerson(person) {
    const table = document.getElementById('personTable');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${person.getNome()}</td>
        <td>${person.getEmail()}</td>
        <td><button type="button" id="delButton" class="btn btn-primary">Exclusão</button></td>
    `;

    tbody.appendChild(newRow);
    table.style.opacity = '1';
}


function generateReturnModal(resJson) {
    const msg = document.getElementById('modalMessage');
    $('#modalCadastro2').modal('show');

    if (resJson.status == 'Ok') {
        msg.innerText = `${resJson.mensagem}`;
        msg.style.backgroundColor = 'green';
    } else if (resJson.status == 'Erro') {
        msg.innerText = `${resJson.mensagem}`;
        msg.style.backgroundColor = 'red';
    }
}

tbody.addEventListener('click', deleteButtonOnClick);
