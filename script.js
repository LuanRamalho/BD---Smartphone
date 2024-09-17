// Função para salvar o smartphone no localStorage ao clicar no botão na primeira página
function cadastrarSmartphone() {
    // Obter os valores do formulário
    const codigo = document.getElementById('codigo').value;
    const fabricante = document.getElementById('fabricante').value;
    const velocidade = document.getElementById('velocidade').value;
    const nucleos = document.getElementById('nucleos').value;
    const armazenamento = document.getElementById('armazenamento').value;

    // Verificar se todos os campos foram preenchidos corretamente
    if (codigo && fabricante && velocidade && nucleos && armazenamento) {
        // Criar um objeto smartphone com os dados
        const smartphone = {
            codigo,
            fabricante,
            velocidade,
            nucleos,
            armazenamento
        };

        // Verificar se já existe algo no localStorage
        let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

        // Adicionar o novo smartphone à lista
        smartphones.push(smartphone);

        // Salvar novamente no localStorage
        localStorage.setItem('Phone', JSON.stringify(smartphones));

        // Exibir uma mensagem de sucesso
        alert('Smartphone cadastrado com sucesso!');

        // Limpar o formulário após o cadastro
        document.getElementById('smartphoneForm').reset();

        // Redirecionar para a página da tabela
        window.location.href = 'tabela.html';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para carregar os smartphones na tabela da segunda página
function carregarTabela() {
    const tabela = document.getElementById('tabelaDados');
    tabela.innerHTML = '';  // Limpa a tabela antes de carregar os dados
    let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

    // Verificar se há smartphones armazenados no localStorage
    if (smartphones.length === 0) {
        const row = tabela.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 6;
        cell.textContent = "Nenhum smartphone cadastrado.";
    } else {
        // Adicionar cada smartphone à tabela
        smartphones.forEach((smartphone, index) => {
            let row = tabela.insertRow();

            let cellCodigo = row.insertCell(0);
            let cellFabricante = row.insertCell(1);
            let cellVelocidade = row.insertCell(2);
            let cellNucleos = row.insertCell(3);
            let cellArmazenamento = row.insertCell(4);
            let cellAcoes = row.insertCell(5);

            cellCodigo.textContent = smartphone.codigo;
            cellFabricante.textContent = smartphone.fabricante;
            cellVelocidade.textContent = smartphone.velocidade;
            cellNucleos.textContent = smartphone.nucleos;
            cellArmazenamento.textContent = smartphone.armazenamento;

            // Botão Editar
            let editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.onclick = function() {
                editarSmartphone(index);
            };
            cellAcoes.appendChild(editarBtn);

            // Botão Excluir
            let excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.onclick = function() {
                excluirSmartphone(index);
            };
            cellAcoes.appendChild(excluirBtn);
        });
    }
}

// Função para buscar smartphones pela barra de pesquisa
function buscarSmartphone() {
    const searchBar = document.getElementById('searchBar').value.toLowerCase();
    const tabela = document.getElementById('tabelaDados');
    let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

    tabela.innerHTML = '';  // Limpa a tabela antes de aplicar a pesquisa

    smartphones.forEach((smartphone, index) => {
        const codigo = smartphone.codigo.toLowerCase();
        const fabricante = smartphone.fabricante.toLowerCase();
        const armazenamento = smartphone.armazenamento.toString();

        if (codigo.includes(searchBar) || fabricante.includes(searchBar) || armazenamento.includes(searchBar)) {
            let row = tabela.insertRow();

            let cellCodigo = row.insertCell(0);
            let cellFabricante = row.insertCell(1);
            let cellVelocidade = row.insertCell(2);
            let cellNucleos = row.insertCell(3);
            let cellArmazenamento = row.insertCell(4);
            let cellAcoes = row.insertCell(5);

            cellCodigo.textContent = smartphone.codigo;
            cellFabricante.textContent = smartphone.fabricante;
            cellVelocidade.textContent = smartphone.velocidade;
            cellNucleos.textContent = smartphone.nucleos;
            cellArmazenamento.textContent = smartphone.armazenamento;

            // Botão Editar
            let editarBtn = document.createElement('button');
            editarBtn.textContent = 'Editar';
            editarBtn.onclick = function() {
                editarSmartphone(index);
            };
            cellAcoes.appendChild(editarBtn);

            // Botão Excluir
            let excluirBtn = document.createElement('button');
            excluirBtn.textContent = 'Excluir';
            excluirBtn.onclick = function() {
                excluirSmartphone(index);
            };
            cellAcoes.appendChild(excluirBtn);
        }
    });
}

// Função para editar um smartphone
function editarSmartphone(index) {
    let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

    let tabela = document.getElementById('tabelaDados');
    let row = tabela.rows[index];

    // Tornar as células editáveis
    row.cells[0].contentEditable = true; // Código
    row.cells[1].contentEditable = true; // Fabricante
    row.cells[2].contentEditable = true; // Velocidade
    row.cells[3].contentEditable = true; // Núcleos
    row.cells[4].contentEditable = true; // Armazenamento

    // Alterar o botão "Editar" para "Salvar"
    row.cells[5].children[0].textContent = 'Salvar';
    row.cells[5].children[0].onclick = function() {
        salvarEdicao(index);
    };
}

// Função para salvar a edição de um smartphone
function salvarEdicao(index) {
    let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];
    let tabela = document.getElementById('tabelaDados');
    let row = tabela.rows[index];

    // Atualizar os valores do smartphone
    smartphones[index].codigo = row.cells[0].textContent;
    smartphones[index].fabricante = row.cells[1].textContent;
    smartphones[index].velocidade = row.cells[2].textContent;
    smartphones[index].nucleos = row.cells[3].textContent;
    smartphones[index].armazenamento = row.cells[4].textContent;

    // Salvar no localStorage
    localStorage.setItem('Phone', JSON.stringify(smartphones));

    // Atualizar a tabela
    carregarTabela();
}

// Função para excluir um smartphone
function excluirSmartphone(index) {
    let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

    // Remover o smartphone do array
    smartphones.splice(index, 1);

    // Salvar a nova lista no localStorage
    localStorage.setItem('Phone', JSON.stringify(smartphones));

    // Atualizar a tabela
    carregarTabela();
}

// Função para carregar os smartphones na tabela da segunda página
window.onload = function() {
    // Verificar se estamos na página da tabela
    if (window.location.pathname.includes('tabela.html')) {
        const tabela = document.getElementById('tabelaDados');
        let smartphones = JSON.parse(localStorage.getItem('Phone')) || [];

        // Verificar se há smartphones armazenados no localStorage
        if (smartphones.length === 0) {
            const row = tabela.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5;
            cell.textContent = "Nenhum smartphone cadastrado.";
        } else {
            // Adicionar cada smartphone à tabela
            smartphones.forEach(smartphone => {
                let row = tabela.insertRow();

                let cellCodigo = row.insertCell(0);
                let cellFabricante = row.insertCell(1);
                let cellVelocidade = row.insertCell(2);
                let cellNucleos = row.insertCell(3);
                let cellArmazenamento = row.insertCell(4);

                cellCodigo.textContent = smartphone.codigo;
                cellFabricante.textContent = smartphone.fabricante;
                cellVelocidade.textContent = smartphone.velocidade;
                cellNucleos.textContent = smartphone.nucleos;
                cellArmazenamento.textContent = smartphone.armazenamento;
                carregarTabela();
            });
        }
    }
};
