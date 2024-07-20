document.addEventListener('DOMContentLoaded', function () {
    const inputNome = document.getElementById('InputNomeTreino');
    const alunosContainer = document.getElementById('alunos');
    let alunosData = []; // Array para armazenar os dados dos alunos

    // Função para buscar todos os alunos da API e armazenar localmente
    async function buscarTodosAlunos() {
        try {
            // Obter o tokenAdm do localStorage
            const tokenAdm = localStorage.getItem('tokenAdm');
            if (!tokenAdm) {
                console.error('Token de administrador não encontrado.');
                return;
            }

            // Fazer a requisição à API com o tokenAdm
            const response = await fetch('https://apigym-fourdevs.vercel.app/student', {
                headers: {
                    Authorization: `Bearer ${tokenAdm}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar alunos da API.');
            }

            const data = await response.json();

            // Verificar se a requisição foi bem-sucedida
            if (data.success) {
                alunosData = data.conteudoJson; // Armazenar os dados localmente

                // Exibir todos os alunos ao carregar a página
                exibirAlunos();
            } else {
                throw new Error('API retornou um erro.');
            }
        } catch (error) {
            console.error('Erro ao buscar alunos:', error.message);
        }
    }

    // Função para exibir os alunos com base no nome pesquisado
    function exibirAlunos() {
        // Limpar o conteúdo atual
        alunosContainer.innerHTML = '';

        // Filtrar os alunos pelo nome digitado no input
        const nomePesquisado = inputNome.value.toLowerCase();
        const alunosFiltrados = alunosData.filter(aluno => aluno.nome.toLowerCase().includes(nomePesquisado));

        // Exibir cada aluno encontrado
        alunosFiltrados.forEach(aluno => {
            const alunoElement = document.createElement('div');
            alunoElement.classList.add('aluno');
            alunoElement.innerHTML = `
                <i class="bi bi-person-square"></i>
                <h5 class="nomeAluno">${aluno.nome} (${aluno.id_aluno})</h5>
                <i class="bi bi-trash3-fill delete" data-id="${aluno.id_aluno}"></i>
            `;
            alunosContainer.appendChild(alunoElement);

            // Adicionar evento de clique para o aluno
            alunoElement.addEventListener('click', () => alunoClicado(aluno.id_aluno));
        });

        // Adicionar evento de clique para os ícones de lixeira
        const deleteIcons = document.querySelectorAll('.delete');
        deleteIcons.forEach(icon => {
            icon.addEventListener('click', (event) => {
                event.stopPropagation(); // Impedir o clique no aluno
                const alunoId = icon.getAttribute('data-id');
                excluirAluno(alunoId, () => {
                    // Callback após confirmação de exclusão
                    alunosData = alunosData.filter(aluno => aluno.id_aluno !== alunoId);
                    // Atualizar a exibição ou recarregar a página
                    location.reload(); // Recarregar a página
                });
            });
        });
    }

    // Função para excluir um aluno com confirmação
    function excluirAluno(idAluno, callback) {
        openPopup('Você tem certeza que deseja excluir este item?', async () => {
            try {
                // Obter o tokenAdm do localStorage
                const tokenAdm = localStorage.getItem('tokenAdm');
                if (!tokenAdm) {
                    console.error('Token de administrador não encontrado.');
                    return;
                }

                // Fazer a requisição à API para excluir o aluno
                const response = await fetch(`https://apigym-fourdevs.vercel.app/student/${idAluno}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${tokenAdm}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao excluir aluno.');
                }

                const data = await response.json();

                if (data.success) {
                    console.log(`Aluno com ID ${idAluno} excluído com sucesso`);
                    // Chamar o callback após a exclusão bem-sucedida
                    callback();
                } else {
                    throw new Error('API retornou um erro ao excluir o aluno.');
                }
            } catch (error) {
                console.error('Erro ao excluir aluno:', error.message);
            }
        });
    }

    // Função para lidar com o clique no aluno
    function alunoClicado(idAluno) {
        console.log(`Aluno com ID ${idAluno} clicado`);
        // Implemente aqui a lógica para o clique no aluno, como redirecionar para a página de edição
         window.location = `../alunosEdit/alunosEdit.html?idAluno=${idAluno}`;
    }

    // Evento para buscar e exibir os alunos ao digitar no input
    inputNome.addEventListener('input', exibirAlunos);

    // Chamar a função para buscar todos os alunos ao carregar a página
    buscarTodosAlunos();
});
