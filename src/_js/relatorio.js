function populateReportsTable() {
    const infos = JSON.parse(localStorage.getItem('data'));
    const tbodyReports = document.getElementById('tableBodyReports');
    let index = 0;
    
    for (let i = 0; i < infos.length; i++) {
        let infoPerIndex = infos[index];
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${infoPerIndex.name}</td>
            <td>${infoPerIndex.id}</td>
            <td>${infoPerIndex.cnpj}</td>
            <td>${infoPerIndex.type}</td>
        `;
        tbodyReports.appendChild(newRow);
        index++;
    }
}

window.addEventListener('load', this.populateReportsTable());
