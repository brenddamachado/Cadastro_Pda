// Variável para armazenar os dados cadastrados
const dadosCadastrados = [];

// Função para cadastrar um novo dado
function cadastrarDados() {
    // Obter valores dos campos
    const nome = document.getElementById('nome').value;
    const idade = document.getElementById('idade').value;
    const email = document.getElementById('email').value;
    const cep = document.getElementById('cep').value;
    const numero = document.getElementById('n').value;
    const rua = document.getElementById('rua').value;
    const compl = document.getElementById('compl').value;
    const medico = document.getElementById('medico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hr').value;
    const conv = document.getElementById('Convenio').checked;
    const part = document.getElementById('Particular').checked;
    const formaPagamentoSelecionadaElement = document.querySelector('input[name="pagamento"]:checked');
    const formaPagamentoSelecionada = formaPagamentoSelecionadaElement ? formaPagamentoSelecionadaElement.value : null;
    const dataFormatada = formatarData(new Date(data));

    // Verificar se campos obrigatórios estão preenchidos
    if (!nome || !idade || !cep || !numero || !formaPagamentoSelecionada || !medico || !data || !hora || !email) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    // Criar um objeto com os dados do paciente
    const paciente = {
        nome,
        idade,
        email,
        cep,
        numero,
        rua,
        compl,
        medico,
        data: formatarData(new Date(data)),
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

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam do zero
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

// Função para buscar o CEP automaticamente
function buscaCepAutomatico() {
    // Pega o valor do CEP
    const cepInput = document.getElementById('cep');
    let cep = cepInput.value;

    // Remove caracteres não numéricos do CEP
    cep = cep.replace(/\D/g, '');

    // Atualiza o valor do campo de CEP
    cepInput.value = cep;

    // Verifica se o CEP possui a quantidade correta de dígitos
    if (cep.length === 8) {
        // Faz uma requisição à API ViaCEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado. Verifique o CEP digitado.');
                } else {
                    // Preenche os campos da rua e complemento com os valores obtidos
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('compl').value = data.complemento;
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
    }
}

// Função para listar os dados cadastrados
function listarDados() {
    const tabela = document.getElementById('tabela-dados');

    if (!tabela) {
        console.error("Elemento 'tabela-dados' não encontrado.");
        return;
    }

    // Limpar a tabela antes de atualizar
    tabela.innerHTML = '';

    // Criação do cabeçalho da tabela
    const cabecalho = document.createElement('tr');
    cabecalho.innerHTML = '<th>Paciente</th><th>Especialidade</th><th>Data</th><th>Hora</th><th>Forma de Pagamento</th><th>Ações</th>';
    tabela.appendChild(cabecalho);

    // Iterar sobre os dados cadastrados e criar linhas na tabela
    dadosCadastrados.forEach((paciente, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${paciente.nome}</td><td>${paciente.medico}</td><td>${paciente.data}</td><td>${paciente.hora}</td><td>${paciente.conv ? 'Convênio' : 'Particular'}</td><td><button onclick="editarDados(${index})">Editar</button><button onclick="excluirDados(${index})">Excluir</button></td>`;
        tabela.appendChild(linha);
    });
}

// Função para editar dados cadastrados
function editarDados(index) {
    // Implemente a lógica para preencher o formulário com os dados do paciente selecionado
    const paciente = dadosCadastrados[index];
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('idade').value = paciente.idade;
    document.getElementById('email').value = paciente.email;
    document.getElementById('cep').value = paciente.cep;
    document.getElementById('n').value = paciente.numero;
    document.getElementById('rua').value = paciente.rua;
    document.getElementById('compl').value = paciente.compl;
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
document.getElementById('cep').addEventListener('input', buscaCepAutomatico);
