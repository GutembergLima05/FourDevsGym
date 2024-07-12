document.addEventListener('DOMContentLoaded', function () {
    const inputNome = document.getElementById('InputNomeTreino');
    const alunosContainer = document.getElementById('alunos');

    // Dados mockados dos alunos
    const alunosData = [
        {
            id_aluno: 1,
            nome: 'João da Silva'
        },
        {
            id_aluno: 2,
            nome: 'Maria Souza'
        },
        {
            id_aluno: 3,
            nome: 'Pedro Oliveira'
        },
        {
            id_aluno: 4,
            nome: 'Ana Santos'
        }
    ];

    // Função para exibir os alunos com base no nome digitado no input
    function exibirAlunos() {
        // Limpa o conteúdo atual
        alunosContainer.innerHTML = '';

        // Filtra os alunos pelo nome digitado no input
        const nomePesquisado = inputNome.value.toLowerCase();
        const alunosFiltrados = alunosData.filter(aluno => aluno.nome.toLowerCase().includes(nomePesquisado));

        // Exibe cada aluno encontrado
        alunosFiltrados.forEach(aluno => {
            const alunoElement = document.createElement('div');
            alunoElement.classList.add('aluno');
            alunoElement.innerHTML = `
                <i class="bi bi-person-square"></i>
                <h5 class="nomeAluno">${aluno.nome}</h5>
                <i class="bi bi-pencil-square edit" data-id="${aluno.id_aluno}"></i>
                <i class="bi bi-trash3-fill delete" data-id="${aluno.id_aluno}"></i>
            `;
            alunosContainer.appendChild(alunoElement);

            // Adiciona eventos de clique para editar e deletar
            const editButton = alunoElement.querySelector('.edit');
            editButton.addEventListener('click', () => editarAluno(aluno.id_aluno));

            const deleteButton = alunoElement.querySelector('.delete');
            deleteButton.addEventListener('click', () => deletarAluno(aluno.id_aluno));
        });
    }

    // Chama a função para exibir os alunos ao carregar a página
    exibirAlunos();

    // Função para editar aluno
    function editarAluno(idAluno) {
        // Implemente aqui a lógica para editar o aluno com o ID especificado
        //console.log(`Editar aluno com ID ${idAluno}`);
        window.location=`../alunosEdit/alunosEdit.html?idAluno=${idAluno}`;
    }

    // Função para deletar aluno
    function deletarAluno(idAluno) {
        // Implemente aqui a lógica para deletar o aluno com o ID especificado
        //console.log(`Deletar aluno com ID ${idAluno}`);
        //precisa mudar a URL e VARIAVEIS
            openPopup('Você tem certeza que deseja excluir esse Aluno?', () => {
                fetch(`https://apigym-fourdevs.vercel.app/exercise/${exercicio.id_exercicio}`, { method: 'DELETE', headers:{ 'Authorization': 'Bearer ' + token} })
                    .then(response => response.ok ? location.reload(true) : Promise.reject(`Erro na requisição: ${response.statusText}`))
                    .catch(error => console.error('Erro ao excluir treino:', error));
            });
    }

    // Evento para buscar e exibir os alunos ao digitar no input
    inputNome.addEventListener('input', exibirAlunos);
});
