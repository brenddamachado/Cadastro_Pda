// Variável para armazenar os dados cadastrados
const dadosCadastrados = [];

// Função para cadastrar um novo dado
function cadastrarDados() {
    // Obter valores dos campos
    const nome = document.getElementById('nome').value;
    const medico = document.getElementById('medico').value;
    const rawDate = document.getElementById('data').value; // Declare rawDate 
    const hora = document.getElementById('hr').value;
    const conv = document.getElementById('Convenio').checked;
    const part = document.getElementById('Particular').checked;
    const formaPagamentoSelecionadaElement = document.querySelector('input[name="pagamento"]:checked');
    const formaPagamentoSelecionada = formaPagamentoSelecionadaElement ? formaPagamentoSelecionadaElement.value : null;

    // Verificar se campos obrigatórios estão preenchidos
    if (!nome || !formaPagamentoSelecionada || !medico || !rawDate || !hora) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Convertendo a string da data para um objeto de data
    const dateParts = rawDate.split("/");
    const dataFormatada = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

    // Obter o dia, mês e ano da data
    const dia = dataFormatada.getDate();
    const mes = dataFormatada.getMonth() + 1; // Lembre-se de que os meses são zero indexados
    const ano = dataFormatada.getFullYear();

    // Criar um objeto com os dados do paciente e a data formatada
    const paciente = {
        nome,
        medico,
        data: `${dia}/${mes}/${ano}`, // Criar uma string formatada com dia, mês e ano,
        hora,
        conv,
        part
    };

    // Adicionar o paciente à lista de dados cadastrados
    dadosCadastrados.push(paciente);

    // Limpar o formulário após o cadastro
    limparFormulario();

    // Atualizar a lista de dados cadastrados
    listarDados();
}
// Função para listar os dados cadastrados
function listarDados() {
    const tabela = document.getElementById('tabela-dados');
    const corpoTabela = document.getElementById('corpo-tabela-dados');

    if (!tabela || !corpoTabela) {
        console.error("Elementos não encontrados.");
        return;
    }

    // Limpar o corpo da tabela antes de atualizar
    corpoTabela.innerHTML = '';

    // Iterar sobre os dados cadastrados e criar linhas na tabela
    dadosCadastrados.forEach((paciente, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${paciente.nome}</td><td>${paciente.medico}</td><td>${paciente.data}</td><td>${paciente.hora}</td><td>${paciente.conv ? 'Convênio' : 'Particular'}</td><td><button onclick="editarDados(${index})">Editar</button><button onclick="excluirDados(${index})">Excluir</button></td>`;
        corpoTabela.appendChild(linha);
    });
}
document.addEventListener('DOMContentLoaded', listarDados);
// Função para editar dados cadastrados
function editarDados(index) {
    // Implemente a lógica para preencher o formulário com os dados do paciente selecionado
    const paciente = dadosCadastrados[index];
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('medico').value = paciente.medico;
    document.getElementById('data').value = paciente.data;
    document.getElementById('hr').value = paciente.hora;
    document.getElementById('Convenio').checked = paciente.conv;
    document.getElementById('Particular').checked = paciente.part;

    // Remover o paciente da lista para evitar duplicatas
    dadosCadastrados.splice(index, 1);

    // Atualizar a lista após a exclusão
    listarDados();
}

// Função para excluir dados cadastrados
function excluirDados(index) {
    // Implemente a lógica para remover o paciente da lista
    dadosCadastrados.splice(index, 1);

    // Atualizar a lista após a exclusão
    listarDados();
}

// Função para limpar o formulário após o cadastro
function limparFormulario() {
    document.getElementById('cadastroForm').reset();
}

// Adicionar um ouvinte de evento para o botão de cadastrar
document.querySelector('button').addEventListener('click', cadastrarDados);
