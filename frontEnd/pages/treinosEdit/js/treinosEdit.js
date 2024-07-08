document.addEventListener('DOMContentLoaded', function () {
    const tokenAdm = localStorage.getItem('tokenAdm'); // Obtém o token do localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const idTreino = urlParams.get('TreinoEditId'); // Obtém o ID do treino da query string

       // Função para preencher os dados do treino nos campos de edição
       function preencherDadosTreino(treino) {
        // Verificar se treino existe e se possui a estrutura esperada
        if (treino && Array.isArray(treino.dias)) {
            // Preencher os campos de nome e descrição do treino
            document.getElementById('InputNomeTreino').value = treino.treino.nome;
            document.getElementById('TextareaDescricaoTreino').value = treino.treino.descricao;

            // Limpar dias existentes
            const diaDivisoes = document.getElementById('diaDivisoes');
            diaDivisoes.innerHTML = '';

            // Adicionar cada dia do treino aos dias correspondentes
            treino.dias.forEach(dia => {
                const newDiv = document.createElement('div');
                newDiv.classList.add('dia');
                newDiv.dataset.set = `conteudo-dia${dia.id_dia}`;

                // Adicionar nome do dia
                const nomeDia = document.createElement('div');
                nomeDia.classList.add('nome_dia');
                nomeDia.textContent = `Dia ${dia.id_dia}`;
                newDiv.appendChild(nomeDia);

                // Adicionar exercícios do dia
                if (dia.exercicios && Array.isArray(dia.exercicios)) {
                    dia.exercicios.forEach(exercicio => {
                        const divExercicio = document.createElement('div');
                        divExercicio.classList.add('exercicio');

                        // Adicionar imagem (substitua pelo seu caminho de imagem real)
                        const imgExercicio = document.createElement('img');
                        imgExercicio.src = '../../public/assets/images/halteresLogin.gif';
                        imgExercicio.alt = '';

                        // Adicionar nome do exercício
                        const nomeExercicio = document.createElement('div');
                        nomeExercicio.classList.add('nome-exercicio');
                        nomeExercicio.textContent = exercicio.nome_exercicio;

                        // Adicionar série e repetições
                        const serieExercicio = document.createElement('div');
                        serieExercicio.classList.add('serie-exercicio');
                        serieExercicio.textContent = exercicio.series;

                        const divX = document.createElement('div');
                        divX.textContent = 'X';

                        const repExercicio = document.createElement('div');
                        repExercicio.classList.add('rep-exercicio');
                        repExercicio.textContent = exercicio.repeticoes;

                        // Adicionar elementos de exercício à div de exercício
                        divExercicio.appendChild(imgExercicio);
                        divExercicio.appendChild(nomeExercicio);
                        divExercicio.appendChild(serieExercicio);
                        divExercicio.appendChild(divX);
                        divExercicio.appendChild(repExercicio);

                        // Adicionar div de exercício ao dia
                        newDiv.appendChild(divExercicio);
                    });
                }

                // Adicionar o novo dia ao DOM
                diaDivisoes.appendChild(newDiv);
            });
        } else {
            console.error('Erro: Não foram encontrados dados válidos para o treino:', treino);
            // Exibir mensagem de erro ou tratar conforme necessário
        }
    }

    // Fazer requisição GET para obter os dados do treino específico
    fetch(`https://apigym-fourdevs.vercel.app/training/${idTreino}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAdm}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success && data.conteudoJson && data.conteudoJson.treino) {
            const treino = data.conteudoJson;
            preencherDadosTreino(treino); // Preencher os dados do treino nos campos de edição
        } else {
            console.error('Erro ao obter os dados do treino:', data);
            // Exibir mensagem de erro ou tratar conforme necessário
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        // Exibir mensagem de erro ou tratar conforme necessário
    });

    function createDayElement(idDia) {
        const div = document.createElement('div');
        div.setAttribute('data-dia-id', idDia);
        div.classList.add('diaTreino'); // Adicione as classes necessárias conforme sua estrutura
    
        // Aqui você pode adicionar mais elementos ou personalizar conforme necessário
        const title = document.createElement('h3');
        title.textContent = `Dia ${idDia}`;
        div.appendChild(title);
    
        return div;
    }
    function criarDivExercicio(exercicio) {
        const div = document.createElement('div');
        div.classList.add('exercicio');
        div.setAttribute('data-exercicio-id', exercicio.id_exercicio);
    
        const nomeExercicio = document.createElement('p');
        nomeExercicio.textContent = `Exercício: ${exercicio.nome}`;
        div.appendChild(nomeExercicio);
    
        const seriesLabel = document.createElement('label');
        seriesLabel.textContent = 'Séries:';
        const seriesInput = document.createElement('input');
        seriesInput.type = 'number';
        seriesInput.value = exercicio.series;
        seriesInput.classList.add('serie-exercicio');
        div.appendChild(seriesLabel);
        div.appendChild(seriesInput);
    
        const repeticoesLabel = document.createElement('label');
        repeticoesLabel.textContent = 'Repetições:';
        const repeticoesInput = document.createElement('input');
        repeticoesInput.type = 'number';
        repeticoesInput.value = exercicio.repeticoes;
        repeticoesInput.classList.add('rep-exercicio');
        div.appendChild(repeticoesLabel);
        div.appendChild(repeticoesInput);
    
        return div;
    }
    function insertDayInOrder(newDiv) {
        const diaDivisoes = document.getElementById('diaDivisoes');
        const existingDivs = Array.from(diaDivisoes.children);
    
        // Encontrar o índice correto para inserir newDiv em ordem crescente
        let insertIndex = 0;
        for (let i = 0; i < existingDivs.length; i++) {
            const existingDivId = parseInt(existingDivs[i].dataset.menuDia);
            const newDivId = parseInt(newDiv.dataset.menuDia);
            if (existingDivId < newDivId) {
                insertIndex = i + 1;
            } else {
                break;
            }
        }
    
        // Inserir newDiv na posição correta
        if (insertIndex >= existingDivs.length) {
            diaDivisoes.appendChild(newDiv);
        } else {
            diaDivisoes.insertBefore(newDiv, existingDivs[insertIndex]);
        }
    }
            
});
