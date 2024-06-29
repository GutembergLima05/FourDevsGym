document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('tokenAdm');

    if (!token) {
        console.error('Token não encontrado no localStorage');
        return;
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const preloaderTreino = document.getElementById('preloader-treino');

    fetch('https://apigym-fourdevs.vercel.app/training', {
        method: 'GET',
        headers: headers
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta da API:', data);
            if (data.success && data.conteudoJson) {
                const treinos = data.conteudoJson;
                const accordionContainer = document.querySelector('.accordion');

                treinos.forEach(treino => {
                    if (!treino.id_treino || !treino.nome) {
                        console.error('Dados do treino inválidos:', treino);
                        return;
                    }

                    const accordionItem = document.createElement('div');
                    accordionItem.classList.add('accordion-item');

                    const accordionHeader = document.createElement('button');
                    accordionHeader.classList.add('accordion-header');
                    accordionHeader.dataset.id = treino.id_treino;

                    const treinoCard = document.createElement('div');
                    treinoCard.classList.add('treino-card');

                    const nomeTreino = document.createElement('div');
                    nomeTreino.classList.add('nome-treino');
                    nomeTreino.innerHTML = `<i class="fa-solid fa-dumbbell"></i> ${treino.nome}`;

                    const iconOpTreino = document.createElement('div');
                    iconOpTreino.classList.add('icon-op-treino');
                    iconOpTreino.innerHTML = `<i class="bi bi-pencil-square"></i><i class="bi bi-trash-fill"></i>`;

                    treinoCard.appendChild(nomeTreino);
                    treinoCard.appendChild(iconOpTreino);
                    accordionHeader.appendChild(treinoCard);

                    const accordionContent = document.createElement('div');
                    accordionContent.classList.add('accordion-content');
                    accordionContent.style.maxHeight = null;

                    accordionItem.appendChild(accordionHeader);
                    accordionItem.appendChild(accordionContent);
                    accordionContainer.appendChild(accordionItem);

                    // Adicionar evento de clique para abrir/fechar acordeon e carregar conteúdo
                    accordionHeader.addEventListener('click', () => {
                        preloaderTreino.style.display = "flex";

                        const id = accordionHeader.dataset.id;
                        if (!id) {
                            console.error('ID do treino não encontrado no dataset.');
                            return;
                        }

                        if (accordionContent.style.maxHeight) {
                            accordionContent.style.maxHeight = null;
                            preloaderTreino.style.display = "none";
                        } else {
                            document.querySelectorAll('.accordion-content').forEach(content => {
                                content.style.maxHeight = null;
                            });

                            fetch(`https://apigym-fourdevs.vercel.app/training/${id}`, {
                                method: 'GET',
                                headers: headers
                            })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Erro na requisição: ' + response.statusText);
                                    }
                                    return response.json();
                                })
                                .then(details => {
                                    preloaderTreino.style.display = "none";
                                    console.log('Detalhes do treino:', details);

                                    // Verificar se details e details.conteudoJson estão definidos
                                    if (details && details.conteudoJson && Array.isArray(details.conteudoJson.dias)) {
                                        const conteudoJson = details.conteudoJson;

                                        // Limpar o conteúdo anterior do acordeão
                                        accordionContent.innerHTML = '';
                                        if (conteudoJson.dias.length == 0) {
                                            accordionContent.innerText = "Vazio"
                                        }
                                        // Iterar pelos dias do treino
                                        conteudoJson.dias.forEach((dia, indexDia) => {
                                            const divDia = document.createElement('div');
                                            divDia.classList.add('dia');
                                            divDia.innerHTML = `<div class="nome_dia">Dia ${indexDia + 1}</div>`;

                                            // Verificar se dia.exercicios está definido e é um array
                                            if (dia.exercicios && Array.isArray(dia.exercicios)) {
                                                // Iterar pelos exercícios do dia
                                                dia.exercicios.forEach((exercicio, indexExercicio) => {
                                                    const divExercicio = document.createElement('div');
                                                    divExercicio.classList.add('exercicio');

                                                    // Cria um novo elemento <img>
                                                    const gifExercicio = document.createElement('img');
                                                    // Define o caminho da imagem usando o atributo src
                                                    gifExercicio.src = '../../public/assets/images/halteresLogin.gif';

                                                    const divNome = document.createElement('div');
                                                    divNome.classList.add('nome-exercicio');
                                                    divNome.textContent = exercicio.exercicio_nome;

                                                    const divSeries = document.createElement('div');
                                                    divSeries.classList.add('serie-exercicio');
                                                    divSeries.textContent = ` ${exercicio.series}`;

                                                    const divSeparador = document.createElement('div');
                                                    divSeparador.textContent = ` X `;

                                                    const divRepeticoes = document.createElement('div');
                                                    divRepeticoes.classList.add('rep-exercicio');
                                                    divRepeticoes.textContent = `${exercicio.repeticoes}`;

                                                    // Adicionar elementos ao exercício
                                                    divExercicio.appendChild(gifExercicio);
                                                    divExercicio.appendChild(divNome);
                                                    divExercicio.appendChild(divSeries);
                                                    divExercicio.appendChild(divSeparador);
                                                    divExercicio.appendChild(divRepeticoes);

                                                    // Adicionar exercício ao dia
                                                    divDia.appendChild(divExercicio);
                                                });
                                            } else {
                                                console.error('Array de exercícios não encontrado ou inválido para o dia:', dia);
                                            }

                                            // Adicionar dia ao conteúdo do acordeão
                                            accordionContent.appendChild(divDia);
                                        });

                                        // Expandir o conteúdo do acordeão
                                        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                                    } else {
                                        console.error('Detalhes do treino ou array de dias não encontrado ou inválido:', details);
                                    }
                                })
                        }
                    });
                });
            } else {
                console.error('Dados da API inválidos');
            }
        })
        .catch(error => {
            // Esconder o preloader em caso de erro
            preloaderTreino.style.display = 'none';
            console.error('Erro:', error);
        });
});
