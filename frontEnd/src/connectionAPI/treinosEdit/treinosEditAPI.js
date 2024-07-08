

/*document.addEventListener('DOMContentLoaded', function () {
    const tokenAdm = localStorage.getItem('tokenAdm');
    // Id do treino a ser editado
    const treinoEditId = 6;
    let InputNomeTreino = document.getElementById('InputNomeTreino');
    let TextareaDescricaoTreino = document.getElementById('TextareaDescricaoTreino');
    // URL da API com o id do treino
    const apiUrl = `https://apigym-fourdevs.vercel.app/training/${treinoEditId}`;

    // Função para fazer a requisição à API e exibir os dados
    async function fetchTrainingData() {
        try {
            // Fazer a requisição GET à API
            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${tokenAdm}`
                }
            });

            // Verificar se a resposta foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }

            // Parse da resposta JSON
            const data = await response.json();

            // Verificar se a resposta indica sucesso
            if (data.success) {
                // Extrair os dados necessários
                const treino = data.conteudoJson.treino;
                const dias = data.conteudoJson.dias;

                addNewDay(dias)
                //colocando valores no Nome e Descrição
                InputNomeTreino.value = treino.nome
                TextareaDescricaoTreino.value = treino.descricao

            } else {
                console.error('Falha ao buscar dados do treino');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    }








    var diasAdicionados = []; // Array para armazenar os dias adicionados


    // Função para adicionar um novo dia
    function addNewDay(dias) {


        // Verifica se já atingiu o limite máximo de 7 dias
        if (diasAdicionados.length >= 7) {
            alert('Você atingiu o limite máximo de 7 dias.');
            return;
        }

        // Adiciona dias da resposta da API até atingir o limite de 7 dias
        for (var i = 0; i < dias.length; i++) {
            if (diasAdicionados.length >= 7) {
                break;
            }

            var dia = dias[i].dia_nome;

            // Cria o elemento div com o número do dia
            var newDiv = createDayElement(dia);

            // Adiciona o novo div dentro de #diaDivisoes, mantendo a ordem correta
            insertDayInOrder(newDiv);

            // Adiciona o dia ao array de dias adicionados
            diasAdicionados.push(dia);
        }

        // Remove o evento de clique para impedir múltiplas adições consecutivas após o sétimo dia
        if (diasAdicionados.length >= 7) {
            document.getElementById('addDivisoes').removeEventListener('click', addNewDay);
            document.getElementById('addDivisoes').style.display = "none";
        }
    }

    // Função para criar um novo elemento de dia com o número fornecido
    function createDayElement(dia) {
        var newDiv = document.createElement('div');
        newDiv.classList.add('containersDivisoes');
        newDiv.dataset.menuDia = dia;
        newDiv.textContent = dia; // Conteúdo do div com o nome do dia

        // Adiciona evento de clique para o novo div de dia
        newDiv.addEventListener('click', function () {
            removeSelected();
            newDiv.classList.add("selected");
            showDayContent(dia);
        });

        return newDiv;
    }

    // Função para inserir um novo dia na ordem correta no menu
    function insertDayInOrder(newDiv) {
        var diaDivisoes = document.getElementById('diaDivisoes');
        var currentDivs = diaDivisoes.querySelectorAll('.containersDivisoes');

        // Encontra o ponto de inserção correto
        var insertIndex = 0;
        while (insertIndex < currentDivs.length && parseInt(currentDivs[insertIndex].dataset.menuDia) < parseInt(newDiv.dataset.menuDia)) {
            insertIndex++;
        }

        // Insere o novo div na posição correta
        if (insertIndex < currentDivs.length) {
            diaDivisoes.insertBefore(newDiv, currentDivs[insertIndex]);
        } else {
            diaDivisoes.appendChild(newDiv);
        }
    }

    // Função auxiliar para remover a seleção de todos os dias
    function removeSelected() {
        var selected = document.querySelectorAll('.selected');
        selected.forEach(function (element) {
            element.classList.remove('selected');
        });
    }

    // Função para mostrar o conteúdo do dia (deve ser implementada)
    function showDayContent(dia) {
        console.log("Mostrando conteúdo do " + dia);
    }

    // Evento de clique para adicionar um novo dia
    document.getElementById('addDivisoes').addEventListener('click', addNewDay);

    // Adiciona os dias automaticamente ao carregar a página
    addNewDay(2);

    document.getElementById('addDivisoes').addEventListener('click', addNewDay);

    var iconsTrash = document.querySelectorAll('.bi-trash-fill');
    iconsTrash.forEach(function (icon) {
        icon.addEventListener('click', function () {
            var diaToRemove = this.parentNode.parentNode;
            var Nmenu = diaToRemove.dataset.set;

            // Retira os exercicio apos ser excluido
            const elementosParaRemover = diaToRemove.querySelectorAll('.exercicio'); // Substitua 'suaClasse' pela classe específica
            // Remover cada elemento encontrado
            elementosParaRemover.forEach(elemento => {
                elemento.remove();
            });

            let elementos = document.querySelectorAll('[data-menu-dia="' + Nmenu + '"]');

            elementos.forEach(elemento => {
                elemento.style.display = "none";
                elemento.remove();
                document.getElementById('addDivisoes').style.display = "flex";
                // Remove o dia do array de dias adicionados
                var indexToRemove = diasAdicionados.indexOf(parseInt(Nmenu));
                if (indexToRemove !== -1) {
                    diasAdicionados.splice(indexToRemove, 1);
                }
            });

            diaToRemove.style.display = 'none';

            if (diasAdicionados.length < 7) {
                document.getElementById('addDivisoes').addEventListener('click', addNewDay);
                document.getElementById('addDivisoes').style.display = "flex";
            }
        });
    });

    // Função para encontrar o próximo dia disponível para adição
    function findNextDay() {
        for (var i = 1; i <= 7; i++) {
            if (!diasAdicionados.includes(i)) {
                return i;
            }
        }
        return 1; // Caso todos os dias tenham sido adicionados, retorna 1 como padrão
    }

    function showDayContent(dayNumber) {
        var diasCorrespondentes = document.getElementById('diasCorrespondentes').querySelectorAll('.dia');
        for (var i = 0; i < diasCorrespondentes.length; i++) {
            diasCorrespondentes[i].style.display = 'none';
        }

        var diaToShow = document.querySelector('.dia[data-set="' + dayNumber + '"]');
        if (diaToShow) {
            diaToShow.style.display = 'block';
        }
    }

    function removeSelected() {
        let divsDias = Array.from(document.querySelectorAll('.containersDivisoes'));
        divsDias.forEach(element => {
            element.classList.remove("selected");
        });
    }










































    // Chamar a função para buscar os dados quando a página for carregada
    window.onload = fetchTrainingData;
});*/