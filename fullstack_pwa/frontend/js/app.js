const API_URL = 'http://localhost:3000/api/support'; // Alterar para o novo endpoint

document.getElementById('supportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const issue = document.getElementById('issue').value;

    // Envia os dados para o endpoint da API
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, issue }) // Envia os dados como JSON
    });

    const supportTicket = await response.json(); // Recebe o ticket de suporte
    appendSupport(supportTicket); // Exibe o ticket na interface

    // Limpa os campos após o envio
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('issue').value = '';
});

// Carrega os tickets de suporte já registrados
async function loadSupportTickets() {
    const response = await fetch(API_URL);
    const supportTickets = await response.json();
    supportTickets.forEach(appendSupport);
}

// Função para adicionar um ticket de suporte à lista exibida
function appendSupport(supportTicket) {
    const li = document.createElement('li');
    li.innerHTML = `
        <strong>${supportTicket.name} (${supportTicket.email})</strong>
        <p>${supportTicket.issue}</p>
        <button onclick="deleteSupport('${supportTicket._id}')">Deletar</button>
    `;
    document.getElementById('supportList').appendChild(li);
}

// Função para deletar um ticket de suporte
async function deleteSupport(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.location.reload(); // Recarrega a página após a exclusão
}

// Carrega os tickets assim que a página for aberta
loadSupportTickets();
