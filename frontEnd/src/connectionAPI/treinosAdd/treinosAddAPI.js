document.addEventListener('DOMContentLoaded', () => {
    const inputBuscarExercicio = document.getElementById('inputBuscarExercicio');
    const resultadosExercicios = document.getElementById('resultadosExercicios');
    const tokenAdm = localStorage.getItem('tokenAdm');
    const preloaderBuscar = document.getElementById('preloaderExercicios');
    let exerciciosCache = [];

    const renderizarResultados = (exercicios) => {
        resultadosExercicios.innerHTML = '';
        exercicios.forEach(exercicio => resultadosExercicios.appendChild(criarDivExercicio(exercicio)));
    };

    const criarDivExercicio = (exercicio) => {
        const divExercicio = document.createElement('div');
        divExercicio.classList.add('exercicio');
        divExercicio.dataset.exercicioId = exercicio.id_exercicio;

        const imgExercicio = document.createElement('img');
        imgExercicio.src = exercicio.gif_url;
        imgExercicio.alt = exercicio.nome;

        const nomeExercicio = document.createElement('div');
        nomeExercicio.classList.add('nome-exercicio');
        nomeExercicio.textContent = exercicio.nome;

        const inputSerie = document.createElement('input');
        inputSerie.type = 'number';
        inputSerie.classList.add('serie-exercicio');
        inputSerie.value = '3';

        const divMultiplicacao = document.createElement('div');
        divMultiplicacao.textContent = 'X';

        const inputRep = document.createElement('input');
        inputRep.type = 'number';
        inputRep.classList.add('rep-exercicio');
        inputRep.value = '12';

        const divAddExercicio = document.createElement('div');
        divAddExercicio.classList.add('addExercicio');
        divAddExercicio.textContent = 'Add';
        divAddExercicio.addEventListener('click', () => adicionarExercicio(divExercicio, exercicio.id_exercicio));

        [imgExercicio, nomeExercicio, inputSerie, divMultiplicacao, inputRep, divAddExercicio].forEach(el => divExercicio.appendChild(el));

        return divExercicio;
    };

    const adicionarExercicio = (divExercicio, exercicioId) => {
        const divs = document.querySelectorAll('#diasCorrespondentes .dia');
        inputBuscarExercicio.value=""
        divs.forEach(div => {
            if (window.getComputedStyle(div).display === 'block') {
                div.appendChild(divExercicio);
                document.querySelectorAll('.dia .exercicio .addExercicio').forEach(addExercicio => {
                    addExercicio.classList.replace('addExercicio', 'deleteExercicio');
                    addExercicio.innerHTML = '<i class="bi bi-trash-fill"></i>';
                });
            }
        });

        document.querySelectorAll('.deleteExercicio').forEach(button => {
            button.addEventListener('click', event => {
                const exercicio = event.target.closest('.exercicio');
                if (exercicio) exercicio.remove();
            });
        });
    };

    inputBuscarExercicio.addEventListener('input', () => {
        const termoBusca = inputBuscarExercicio.value.toLowerCase();
        const exerciciosFiltrados = exerciciosCache.filter(exercicio => exercicio.nome.toLowerCase().includes(termoBusca));
        renderizarResultados(exerciciosFiltrados);
    });

    preloaderBuscar.style.display = "flex";
    fetch('https://apigym-fourdevs.vercel.app/Exercise', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokenAdm}` }
    })
        .then(response => response.json())
        .then(data => {
            preloaderBuscar.style.display = "none";
            if (data.success && Array.isArray(data.conteudoJson)) {
                exerciciosCache = data.conteudoJson;
                renderizarResultados(data.conteudoJson);
            } else {
                console.error('Resposta inesperada da API:', data);
            }
        })
        .catch(error => console.error('Erro ao fazer requisição:', error));

    document.getElementById('enviarTreino').addEventListener('click', () => {
        const id_administrador = parseInt(localStorage.getItem('id_Adm'));
        const InputNomeTreino = document.getElementById('InputNomeTreino').value;
        const TextareaDescricaoTreino = document.getElementById('TextareaDescricaoTreino').value;

        if (!InputNomeTreino || !TextareaDescricaoTreino) {
            return mostrarAlerta(InputNomeTreino ? "A descrição do treino está vazia." : "O nome do treino está vazio.", 5000);
        }

        const treino = {
            nome: InputNomeTreino,
            descricao: TextareaDescricaoTreino,
            id_administrador,
            dias: Array.from(document.querySelectorAll('#diasCorrespondentes .dia')).map((diaElement, diaIndex) => ({
                id_dia: diaIndex + 1,
                exercicios: Array.from(diaElement.getElementsByClassName('exercicio')).map(exercicioElement => ({
                    id_exercicio: parseInt(exercicioElement.getAttribute('data-exercicio-id')),
                    series: parseInt(exercicioElement.querySelector('.serie-exercicio').value),
                    repeticoes: parseInt(exercicioElement.querySelector('.rep-exercicio').value)
                }))
            })).filter(dia => dia.exercicios.length > 0)
        };

        if (treino.dias.length === 0) return mostrarAlerta("Nenhum dia de treino com exercícios foi encontrado.", 5000);

        mostrarAlerta("Enviando...", 9000000);
        fetch('https://apigym-fourdevs.vercel.app/training/', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${tokenAdm}` 
            },
            body: JSON.stringify(treino)
        })
            .then(response => response.json())
            .then(data => window.location.href = "../treinosView/treinosView.html")
            .catch(error => {
                console.error('Erro ao enviar treino:', error);
                mostrarAlerta('Erro ao enviar treino. Fale com os desenvolvedores Instagram: @fourdevs', 5000);
            });
    });
});
