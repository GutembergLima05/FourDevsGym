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
                
                <i class="bi bi-trash3-fill delete" data-id="${aluno.id_aluno}"></i>
            `;
            alunosContainer.appendChild(alunoElement);

            // Adiciona evento de clique para o aluno
            alunoElement.addEventListener('click', () => alunoClicado(aluno.id_aluno));
        });
    }

    // Chama a função para exibir os alunos ao carregar a página
    exibirAlunos();

    // Função para lidar com o clique no aluno
    function alunoClicado(idAluno) {
        // Implemente aqui a lógica para o clique no aluno
        console.log(`Aluno com ID ${idAluno} clicado`);
        // Por exemplo, redirecionar para a página de edição:
        window.location = `../alunosEdit/alunosEdit.html?idAluno=${idAluno}`;
    }

    // Evento para buscar e exibir os alunos ao digitar no input
    inputNome.addEventListener('input', exibirAlunos);
});
