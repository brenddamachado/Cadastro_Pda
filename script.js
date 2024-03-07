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
    const lista = document.getElementById('lista-dados');

    if (!lista) {
        console.error("Elemento 'lista-dados' não encontrado.");
        return;
    }
    // Limpar a lista antes de atualizar
    lista.innerHTML = '';

    // Iterar sobre os dados cadastrados e criar elementos na lista
    dadosCadastrados.forEach((paciente, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Paciente: ${paciente.nome} - Especilidade: ${paciente.medico} - Data: ${paciente.data} - Hora: ${paciente.hora} - Forma de Pagamento: ${paciente.conv ? 'Convênio' : 'Particular'}`;

        // Adicionar botões para editar e excluir
        const editarButton = document.createElement('button');
        editarButton.textContent = 'Editar';
        editarButton.addEventListener('click', () => editarDados(index));

        const excluirButton = document.createElement('button');
        excluirButton.textContent = 'Excluir';
        excluirButton.addEventListener('click', () => excluirDados(index));

        listItem.appendChild(editarButton);
        listItem.appendChild(excluirButton);

        lista.appendChild(listItem);
    });
}

// Função para editar dados cadastrados
function editarDados(index) {
    // Implemente a lógica para preencher o formulário com os dados do paciente selecionado
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
