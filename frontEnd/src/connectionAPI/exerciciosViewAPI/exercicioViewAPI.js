document.addEventListener('DOMContentLoaded', function() {
    const exerciseForm = document.getElementById('exerciseForm');
    const resultadosExercicio = document.querySelector('.resultadosExercicio');
    const inputPesquisa = document.getElementById('InputNomeTreino');
    const token = localStorage.getItem('tokenAdm');

    // Função para buscar os dados da API
    function fetchExercicios() {
        fetch('https://apigym-fourdevs.vercel.app/Exercise', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Limpar resultados existentes
                resultadosExercicio.innerHTML = '';

                // Iterar sobre os exercícios
                data.conteudoJson.forEach(exercicio => {
                    // Criar elemento de exercício
                    const exercicioElement = document.createElement('div');
                    exercicioElement.classList.add('exercicio');
                    exercicioElement.innerHTML = `
                        <img src="${exercicio.gif_url}" alt="">
                        <div class="nome_exercicio">${exercicio.nome}</div>
                        <div class="descricao_exercicio">${exercicio.descricao}</div>
                        <div id="buttonsEditDelete">
                            <i class="bi bi-pencil-square editExercicio" data-id="${exercicio.id_exercicio}"></i>
                            <i class="bi bi-trash-fill deleteExercicio" data-id="${exercicio.id_exercicio}"></i>
                        </div>
                    `;

                    // Adicionar evento de clique para editar
                    const editButton = exercicioElement.querySelector('.editExercicio');
                    editButton.addEventListener('click', function() {
                        const exercicioId = this.getAttribute('data-id');
                        // Redirecionar para outra página com o ID do exercício
                        window.location.href = `editarExercicio.html?id=${exercicioId}`;
                    });

                    // Adicionar evento de clique para excluir
                    const deleteButton = exercicioElement.querySelector('.deleteExercicio');
                    deleteButton.addEventListener('click', function() {
                        const exercicioId = this.getAttribute('data-id');
                        // Mostrar alerta de confirmação
                        if (exercicio.id_exercicio) {
                            openPopup('Você tem certeza que deseja excluir este exercício?', () => {
                                fetch(`https://apigym-fourdevs.vercel.app/exercise/${exercicio.id_exercicio}`, { method: 'DELETE', headers:{ 'Authorization': 'Bearer ' + token} })
                                    .then(response => response.ok ? location.reload(true) : Promise.reject(`Erro na requisição: ${response.statusText}`))
                                    .catch(error => console.error('Erro ao excluir treino:', error));
                            });
                        } else {
                            console.error('ID do treino não encontrado para exclusão.');
                        }
                    });

                    // Adicionar exercício ao resultado
                    resultadosExercicio.appendChild(exercicioElement);
                });

                // Adicionar evento de input para o campo de pesquisa
                inputPesquisa.addEventListener('input', function() {
                    const termoPesquisa = this.value.toLowerCase();

                    // Filtrar exercícios com base no termo de pesquisa
                    const exerciciosFiltrados = data.conteudoJson.filter(exercicio =>
                        exercicio.nome.toLowerCase().includes(termoPesquisa)
                    );

                    // Limpar resultados existentes
                    resultadosExercicio.innerHTML = '';

                    // Exibir exercícios filtrados
                    exerciciosFiltrados.forEach(exercicio => {
                        // Criar elemento de exercício
                        const exercicioElement = document.createElement('div');
                        exercicioElement.classList.add('exercicio');
                        exercicioElement.innerHTML = `
                            <img src="${exercicio.gif_url}" alt="">
                            <div class="nome_exercicio">${exercicio.nome}</div>
                            <div class="descricao_exercicio">${exercicio.descricao}</div>
                            <div id="buttonsEditDelete">
                                <i class="bi bi-pencil-square editExercicio" data-id="${exercicio.id_exercicio}"></i>
                                <i class="bi bi-trash-fill deleteExercicio" data-id="${exercicio.id_exercicio}"></i>
                            </div>
                        `;

                        // Adicionar evento de clique para editar
                        const editButton = exercicioElement.querySelector('.editExercicio');
                        editButton.addEventListener('click', function() {
                            const exercicioId = this.getAttribute('data-id');
                            // Redirecionar para outra página com o ID do exercício
                            window.location.href = `../exercicioEdit.html?id_exercicio=${exercicioId}`;
                        });

                        // Adicionar evento de clique para excluir
                        const deleteButton = exercicioElement.querySelector('.deleteExercicio');
                        deleteButton.addEventListener('click', function() {
                            const exercicioId = this.getAttribute('data-id');
                            // Mostrar alerta de confirmação
                            if (confirm(`Tem certeza que deseja excluir o exercício ${exercicio.nome}?`)) {
                                // Aqui você pode adicionar a lógica para deletar o exercício via API, se necessário
                                alert(`Exercício ${exercicio.nome} foi excluído.`);
                            }
                        });

                        // Adicionar exercício ao resultado
                        resultadosExercicio.appendChild(exercicioElement);
                    });
                });

            } else {
                console.error('Erro ao obter dados da API:', data.message);
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    }

    // Chamar a função para buscar os exercícios ao carregar a página
    fetchExercicios();
});
