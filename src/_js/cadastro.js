const brandName = document.getElementById('brandName');
const mainId = document.getElementById('cod');
const cnpj = document.getElementById('cnpj');
const merchandiseType = document.getElementById('merchandiseType');
const saveButton = document.getElementById('saveButton');
const reportsButton = document.getElementById('reportsButton');
const table = document.getElementById('infoTable');
const tbody = document.getElementById('tableBody');

function checkLocalStorage() {
    if (this.readClient().length != 0) {
        this.realocateCard();
        this.updateTable();
        reportsButton.disabled = false;
    }
}

function changeSaveButtonState() {
    return this.isNotEmpty() && cnpj.value.length == 18 ? this.saveButton.disabled = false : this.saveButton.disabled = true;
}

function changeSaveButtonStateModal() {
    return  this.isNotEmptyModal() && document.getElementById('cnpjModal').value.length == 18 ? document.getElementById('salvar').disabled = false : document.getElementById('salvar').disabled = true;
}

function isNotEmpty() {
    return ((brandName.value.trim().length > 0 || brandName.value.trim() != "") && (mainId.value.trim().length > 0 || mainId.value.trim() != "") &&
    (cnpj.value.trim().length > 0 || cnpj.value.trim() != "") && (merchandiseType.value.trim() != ""));
}

function isNotEmptyModal() {
    return ((document.getElementById('brandNameModal').value.trim().length > 0 || document.getElementById('brandNameModal').trim() != "") 
    && (document.getElementById('codModal').value.trim().length > 0 || document.getElementById('codModal').value.trim() != "") 
    && (document.getElementById('cnpjModal').value.trim().length > 0 || document.getElementById('cnpjModal').value.trim() != "") 
    && (document.getElementById('merchandiseTypeModal').value.trim() != ""));
}

function cnpjMask() {
    if (cnpj.value.length == 2 || cnpj.value.length == 6) {
        cnpj.value += '.';
    } else if (cnpj.value.length == 10) {
        cnpj.value += '/';
    } else if (cnpj.value.length == 15) {
        cnpj.value += '-';
    }
}

function cnpjMaskModal() {
    const cnpjModal = document.getElementById('cnpjModal');

    if (cnpjModal.value.length == 2 || cnpjModal.value.length == 6) {
        cnpjModal.value += '.';
    } else if (cnpjModal.value.length == 10) {
        cnpjModal.value += '/';
    } else if (cnpjModal.value.length == 15) {
        cnpjModal.value += '-';
    }
}

function buttonSaveAction() {
    const infos = this.saveJSON();
    const index = brandName.dataset.index;
    this.realocateCard();
    this.clearFields();

    if (index == 'new') {
        this.createClient(infos);
        this.updateTable();
    } else {
        this.updateClient(index, infos);
        this.updateTable();
    }
    reportsButton.disabled = false;
}

function buttonSaveActionModal() {
    let newData = {
        name : document.getElementById('brandNameModal').value,
        id   : document.getElementById('codModal').value,
        cnpj : document.getElementById('cnpjModal').value,
        type : document.getElementById('merchandiseTypeModal').value
    };
    const index = document.getElementById('brandNameModal').dataset.index;
    this.updateClient(index, newData);
    this.updateTable();
    $('#modal').modal('hide');
}

function saveJSON() {
    let data = {
        name : brandName.value,
        id   : mainId.value,
        cnpj : cnpj.value,
        type : merchandiseType.value
    }
    return data;
}

function realocateCard() {
    const card = document.getElementsByClassName('card');
    for (let i = 0; i < card.length; i++) {
        card[i].style.marginLeft = '0';
        card[i].style.alignSelf = 'left';
    }
    table.style.opacity = '1';
}

function realocateCardInverse() {
    const card = document.getElementsByClassName('card');
    for (let i = 0; i < card.length; i++) {
        card[i].style.marginLeft = 'auto';
        card[i].style.alignSelf = 'center';
    }
    table.style.opacity = '0';
}

function clearFields() {
    brandName.value = null;
    mainId.value = null;
    cnpj.value = null;
    merchandiseType.value = "";
    saveButton.disabled = true;
}

function deleteClient(index) {
    const dbClient = this.readClient();
    dbClient.splice(index, 1);
    this.setLocalStorage(dbClient);

    if (this.readClient().length == 0) {
        this.realocateCardInverse();
        reportsButton.disabled = true;
    }
}

function createClient(infos) {
    const dbClient = this.getLocalStorage();
    dbClient.push(infos);
    this.setLocalStorage(dbClient);
}

function updateClient(index, newData) {
    const dbClient = this.readClient();
    dbClient[index] = newData;
    this.setLocalStorage(dbClient);
}

function getLocalStorage() {
    const jsonData = JSON.parse(localStorage.getItem('data'));
    return jsonData == null ? [] : jsonData;
}

function setLocalStorage(dbClient) {
    localStorage.setItem('data', JSON.stringify(dbClient));
}

function readClient() {
    return this.getLocalStorage();
}

const clearTable = () => {
    const rows = document.querySelectorAll('#infoTable>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function updateTable() {
    const dbClient = this.readClient();
    clearTable(); 
    dbClient.forEach(createRow);
}

const createRow = (infos, index) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = ` 
        <td>${infos.name}</td>
        <td>${infos.id}</td>
        <td>${infos.cnpj}</td>
        <td>${infos.type}</td>
        <td>
            <button type="button" class="btn btn-primary" id="edit-${index}" data-toggle="modal" data-target="#modal">Editar</button>
            <button type="button" class="btn btn-primary" id="delete-${index}">Excluir</button>
        </td> 
    `;
    tbody.appendChild(newRow);
}

const fillFields = (infos) => {
    document.getElementById('brandNameModal').value = infos.name;
    document.getElementById('codModal').value = infos.id;
    document.getElementById('cnpjModal').value = infos.cnpj;
    document.getElementById('merchandiseTypeModal').value = infos.type;
    document.getElementById('brandNameModal').dataset.index = infos.index;
}

function clearFieldsModal() {
    this.clearFields();
    brandName.dataset.index = 'new';
}

const editClient = (index) => {
    const infos = this.readClient()[index];
    infos.index = index;
    fillFields(infos);
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');

        if (action == 'edit') {
            editClient(index);
        } else {
            const infos = readClient()[index];
            const response = confirm(`Deseja realmente excluir o cliente ${infos.name}?`);
            if (response) {
                deleteClient(index);
                updateTable();
            }
        }
    }
}

tbody.addEventListener('click', editDelete);

reportsButton.addEventListener('click', function () {
    window.location = './relatorio.html';
});

window.addEventListener('load', this.checkLocalStorage());
