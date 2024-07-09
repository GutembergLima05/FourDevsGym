document.addEventListener('DOMContentLoaded', function () {
    // Fazer requisição GET para a API
    const tokenAdm = localStorage.getItem('tokenAdm'); // Obtém o token do localStorage
    const treinoEditId = parseInt(new URLSearchParams(window.location.search).get('TreinoEditId'));
    var preloaderBuscar = document.getElementById('preloaderExercicios');
    //Mostrar preloader
    preloaderBuscar.style.display = "flex"
    fetch('https://apigym-fourdevs.vercel.app/Exercise', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAdm}`
        }
    })
        .then(response => response.json())
        .then(data => {
            //console.log('Resposta da API:', data);
            if (data.success && Array.isArray(data.conteudoJson)) {
                //ocultar preloader
                preloaderBuscar.style.display = "none"
                exerciciosCache = data.conteudoJson; // Armazena os dados recebidos da API
                // Chame a função para renderizar os resultados com os dados recebidos da API
                renderizarResultados(data.conteudoJson);
            } else {
                console.error('Resposta inesperada da API:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao fazer requisição:', error);
        });

    // Função para renderizar os resultados dos exercícios
    function renderizarResultados(exercicios) {
        // Limpar resultados anteriores
        resultadosExercicios.innerHTML = '';

        exercicios.forEach(function (exercicio) {
            // Criar os elementos HTML
            const divExercicio = criarDivExercicio(exercicio);

            // Adicionar divExercicio aos resultadosExercicios
            resultadosExercicios.appendChild(divExercicio);
        });
    }

    // Função para criar o elemento de exercício
    function criarDivExercicio(exercicio) {
        const divExercicio = document.createElement('div');
        divExercicio.classList.add('exercicio');

        // Adicionar data-exercicio-id com o ID do exercício
        divExercicio.dataset.exercicioId = exercicio.id_exercicio;

        const imgExercicio = document.createElement('img');
        imgExercicio.src = exercicio.gif_url; // Aqui você usaria a URL do GIF do exercício
        imgExercicio.alt = exercicio.nome;

        const nomeExercicio = document.createElement('div');
        nomeExercicio.classList.add('nome-exercicio');
        nomeExercicio.textContent = exercicio.nome;

        const inputSerie = document.createElement('input');
        inputSerie.type = 'number';
        inputSerie.classList.add('serie-exercicio');
        inputSerie.value = '3'; // Valor inicial da série, ajuste conforme necessário

        const divMultiplicacao = document.createElement('div');
        divMultiplicacao.textContent = 'X';

        const inputRep = document.createElement('input');
        inputRep.type = 'number';
        inputRep.classList.add('rep-exercicio');
        inputRep.value = '12'; // Valor inicial das repetições, ajuste conforme necessário

        const divAddExercicio = document.createElement('div');
        divAddExercicio.classList.add('addExercicio');
        divAddExercicio.textContent = 'Add'; // Botão ou elemento para adicionar exercício, ajuste conforme necessário

        // Adicionar evento de clique ao botão "Add"
        divAddExercicio.addEventListener('click', function () {
            adicionarExercicio(divExercicio, exercicio.id_exercicio);
        });

        // Adicionar elementos ao div do exercício
        divExercicio.appendChild(imgExercicio);
        divExercicio.appendChild(nomeExercicio);
        divExercicio.appendChild(inputSerie);
        divExercicio.appendChild(divMultiplicacao);
        divExercicio.appendChild(inputRep);
        divExercicio.appendChild(divAddExercicio);

        return divExercicio;
    }

    let exerciciosCache = [];
    // Evento de digitação no input
    inputBuscarExercicio.addEventListener('input', function () {
        const termoBusca = inputBuscarExercicio.value.toLowerCase(); // Termo de busca em minúsculas para comparação
        const exerciciosFiltrados = exerciciosCache.filter(function (exercicio) {
            return exercicio.nome.toLowerCase().includes(termoBusca);
        });

        renderizarResultados(exerciciosFiltrados);
    });



    // Função para lidar com a adição do exercício
    function adicionarExercicio(divExercicio, exercicioId) {
        //inputBuscarExercicio.value=""
        // Exibir a div pai completa no console
        //console.log('Div pai completa:', divExercicio);
        // Exibir o ID do exercício
        //console.log('ID do exercício:', exercicioId);

        // Seleciona o container que contém todas as divs
        const container = document.getElementById('diasCorrespondentes');

        // Obtém todas as divs dentro do container
        const divs = container.querySelectorAll('.dia');

        // Itera sobre cada div encontrada
        divs.forEach(div => {
            // Verifica se a div está visível (display: block)
            if (window.getComputedStyle(div).display === 'block') {
                // Adiciona o novo elemento dentro da div visível
                div.appendChild(divExercicio);

                // Selecionando todos os elementos com classe 'addExercicio' dentro de elementos com classe 'exercicio' dentro do elemento pai
                let addExercicios = document.querySelectorAll('.dia .exercicio .addExercicio');

                // Fazendo o logging dos elementos 'addExercicio'
                addExercicios.forEach(addExercicio => {
                    addExercicio.classList.remove('addExercicio')
                    addExercicio.classList.add('deleteExercicio')
                    addExercicio.innerHTML = '<i class="bi bi-trash-fill"></i>';

                });
            }


            document.querySelectorAll('.deleteExercicio').forEach(function (button) {
                console.log("clique em um dia")
                button.addEventListener('click', function (event) {
                    // Obtém o elemento exercicio (pai do botão "Add")
                    const exercicio = event.target.closest('.exercicio');

                    // Verifica se encontrou o elemento exercicio
                    if (exercicio) {
                        // Remove o elemento exercicio
                        exercicio.remove();
                    }
                });
            });

        });
    }


    var enviarTreino = document.getElementById('enviarTreino');

    enviarTreino.addEventListener('click', function () {
        const tokenAdm = localStorage.getItem('tokenAdm'); // Obtém o token do localStorage

        console.log("querendo enviar")

        // Função para converter o HTML para objeto treino
        function parseHTMLToObj() {
            let InputNomeTreino = document.getElementById('InputNomeTreino').value;
            let TextareaDescricaoTreino = document.getElementById('TextareaDescricaoTreino').value;
            let id_administrador = localStorage.getItem('id_Adm');
            
            mostrarAlerta("Enviando...", 90000000);
            // Verificar se os inputs não estão vazios
            if (!InputNomeTreino) {
                mostrarAlerta("O nome do treino está vazio.",5000);
                return null;
            }

            if (!TextareaDescricaoTreino) {
                mostrarAlerta("A descrição do treino está vazia.", 5000);
                return null;
            }

            const diasCorrespondentes = document.getElementById('diasCorrespondentes');
            const diaElements = diasCorrespondentes.getElementsByClassName('dia');

            const treino = {
                nome: InputNomeTreino,
                descricao: TextareaDescricaoTreino,
                id_administrador: parseInt(id_administrador),
                dias: []
            };

            Array.from(diaElements).forEach((diaElement, diaIndex) => {
                const exercicioElements = diaElement.getElementsByClassName('exercicio');

                // Verifica se há exercícios no dia
                if (exercicioElements.length > 0) {
                    const exercicios = Array.from(exercicioElements).map(exercicioElement => {
                        const id_exercicio = exercicioElement.getAttribute('data-exercicio-id');
                        const series = exercicioElement.querySelector('.serie-exercicio').value;
                        const repeticoes = exercicioElement.querySelector('.rep-exercicio').value;
                        return {
                            id_exercicio: parseInt(id_exercicio),
                            series: parseInt(series),
                            repeticoes: parseInt(repeticoes)
                        };
                    });

                    treino.dias.push({
                        id_dia: diaIndex + 1,
                        exercicios
                    });
                }
            });

            // Verifica se há algum dia de treino com exercício
            if (treino.dias.length === 0) {
                MostrarAlerta("Nenhum dia de treino com exercícios foi encontrado.");
                return null;
            }

            return treino;
        }

        // Exemplo de uso
        const treinoObj = parseHTMLToObj();
        console.log(treinoObj)
        if (treinoObj) {
            // Realizar a requisição POST para a API com os dados do treino
            fetch(`https://apigym-fourdevs.vercel.app/training/${treinoEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenAdm}`
                },
                body: JSON.stringify(treinoObj)
            })
                .then(response => {
                    console.log('Requisição enviada:', treinoObj); // Mostra o objeto treino enviado
                    return response.json();
                })
                .then(data => {
                    //console.log('Resposta da API:', data); // Mostra a resposta da API
                    window.location.href = "../treinosView/treinosView.html";
                })
                .catch(error => {
                    console.error('Erro ao enviar treino:', error);
                   // MostrarAlerta('Erro ao enviar treino. Verifique o console para mais detalhes.');
                });
        }
    });

});