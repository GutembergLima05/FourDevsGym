document.addEventListener('DOMContentLoaded', function () {
    const tokenAdm = localStorage.getItem('tokenAdm'); // Obtém o token do localStorage

    // Obtém o valor do parâmetro TreinoEditId da URL e converte para número
    const treinoEditId = parseInt(new URLSearchParams(window.location.search).get('TreinoEditId'));

    // Verifica se o valor foi obtido corretamente e é um número válido
    if (!isNaN(treinoEditId)) {

        const apiUrl = `https://apigym-fourdevs.vercel.app/training/${treinoEditId}`;

        // Fazer a requisição GET para a API
        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAdm}`
            }
        })
            .then(response => response.json())
            .then(responseData => {

                // console.log('Success:', responseData);
                const dias = responseData.conteudoJson.dias;
                dias.forEach(dia => {
                    addNewDay(dia); // Adiciona cada dia retornado pela API ao menu
                });

                document.getElementById('InputNomeTreino').value = responseData.conteudoJson.treino.nome
                document.getElementById('TextareaDescricaoTreino').value = responseData.conteudoJson.treino.descricao
            })
            .catch((error) => {
                console.error('Error:', error);
                window.location = "../treinosView/treinosView.html";
            });
    }

    var diasAdicionados = []; // Array para armazenar os dias adicionados
    // Função para adicionar um novo dia
    function addNewDay(newDia) {
        // Verifica se já atingiu o limite máximo de 7 dias
        if (diasAdicionados.length >= 7) {
            alert('Você atingiu o limite máximo de 7 dias.');
            return;
        }

        if (!newDia.isTrusted) {
            // Cria o elemento div com o número do dia
            const newDiv = createDayElement(newDia);
            const dia = newDia.id_dia


            // Verifica se newDia possui a propriedade exercicio e é um array
            if (newDia.exercicios && Array.isArray(newDia.exercicios)) {
                newDia.exercicios.forEach(exercicio => {
                    exibirExercicioAPI(exercicio, newDia.id_dia); // Passa exercicio e id_dia para a função
                });
            } else {
                console.warn('newDia.exercicio não é um array ou é indefinido:', newDia.exercicio);
            }
            // Adiciona o novo div dentro de #diaDivisoes, mantendo a ordem correta
            insertDayInOrder(newDiv);

            // Adiciona o dia ao array de dias adicionados
            diasAdicionados.push(newDia);


        } else {
            function encontrarOuAdicionarProximoIdDia(diasArray) {
                // Ordena o array pelos id_dia para facilitar a busca
                diasArray.sort((a, b) => a.id_dia - b.id_dia);

                let proximoId = 1;

                // Percorre o array para encontrar o próximo id_dia faltando
                for (let i = 0; i < diasArray.length; i++) {
                    if (diasArray[i].id_dia !== proximoId) {
                        // Se encontrou um id_dia faltando, retorna ele
                        return proximoId;
                    }
                    proximoId++;
                }

                // Se todos os números estiverem presentes até o último, adiciona o próximo número
                return proximoId;
            }

            // Chama a função para encontrar ou adicionar o próximo id_dia
            const proximoIdDia = encontrarOuAdicionarProximoIdDia(diasAdicionados);


            // Exibe o próximo id_dia encontrado ou adicionado
            //console.log("Próximo id_dia:", proximoIdDia);

            // Adiciona o próximo id_dia ao array
            const diaDeTreinoManual = { id_dia: proximoIdDia, dia_nome: 'Dia ' + proximoIdDia, exercicios: [0] };
            diasAdicionados.push(diaDeTreinoManual);
            var newDiv = createDayElement(diaDeTreinoManual);

            // Adiciona o novo div dentro de #diaDivisoes, mantendo a ordem correta
            insertDayInOrder(newDiv);


            // Exibe o array atualizado
            //console.log("Array atualizado:", diasAdicionados);
            //console.log("manual")
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
        
        newDiv.dataset.menuDia = dia.id_dia;
        newDiv.textContent = "Dia " + dia.id_dia; // Conteúdo do div com o número do dia

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

    // Restante do seu código para manipulação do menu...


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
                // Supondo que Nmenu contenha o id_dia que você deseja remover do array diasAdicionados
                var indexToRemove = diasAdicionados.findIndex(item => item.id_dia === parseInt(Nmenu));

                if (indexToRemove !== -1) {
                    diasAdicionados.splice(indexToRemove, 1);
                }
                //console.log(diasAdicionados)
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

        // Extrai os id_dia dos objetos na lista diasAdicionados
        let idsAdicionados = diasAdicionados.map(dia => dia.id_dia);

        for (var i = 1; i <= 7; i++) {
            if (!idsAdicionados.includes(i)) {

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

        var diaToShow = document.querySelector('.dia[data-set="' + dayNumber.id_dia + '"]');
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
    
    function exibirExercicioAPI(exercicio, dia) {
        // Encontrar a div .dia correspondente ao data-set
        const divDia = document.querySelector(`.dia[data-set="${dia}"]`);
    
        if (divDia) {
            const divExercicio = document.createElement('div');
            divExercicio.classList.add('exercicio');
    
            // Adicionar data-exercicio-id com o ID do exercício
            divExercicio.dataset.exercicioId = exercicio.id_exercicio;
    
                const imgExercicio = document.createElement('img');
                imgExercicio.src = exercicio.gif_url; // Use a URL do GIF do exercício, se disponível
                imgExercicio.alt = exercicio.nome;
    
                const nomeExercicio = document.createElement('div');
                nomeExercicio.classList.add('nome-exercicio');
                nomeExercicio.textContent = exercicio.nome;
    
                const inputSerie = document.createElement('input');
                inputSerie.type = 'number';
                inputSerie.classList.add('serie-exercicio', 'serie-exercicio-api');
                inputSerie.value = exercicio.series || ''; // Valor inicial da série
    
                const divMultiplicacao = document.createElement('div');
                divMultiplicacao.textContent = 'X';
    
                const inputRep = document.createElement('input');
                inputRep.type = 'number';
                inputRep.classList.add('rep-exercicio', 'rep-exercicio-api');
                inputRep.value = exercicio.repeticoes || ''; // Valor inicial das repetições
    
                const divAddExercicio = document.createElement('div');
                divAddExercicio.classList.add('deleteExercicio');
                divAddExercicio.innerHTML = '<i class="bi bi-trash-fill"></i>'; // Botão ou elemento para adicionar exercício
    
                // Adicionar evento de clique ao botão "Add"
                divAddExercicio.addEventListener('click', function () {
                    divExercicio.remove(); // Remover o div do exercício ao clicar no ícone de lixeira
                });
    
                // Adicionar elementos ao div do exercício
                divExercicio.appendChild(imgExercicio);
                divExercicio.appendChild(nomeExercicio);
                divExercicio.appendChild(inputSerie);
                divExercicio.appendChild(divMultiplicacao);
                divExercicio.appendChild(inputRep);
                divExercicio.appendChild(divAddExercicio);
    
                // Adicionar divExercicio à div .dia correspondente
                divDia.appendChild(divExercicio);
        }
    }
    

});


