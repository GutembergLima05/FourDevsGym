document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('tokenAdm');

    if (!token) {
        console.error('Token não encontrado no localStorage');
        return;
    }

    const headers = new Headers();

    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Cache-Control', 'no-cache'); // Adicionando o header Cache-Control

    const preloaderTreino = document.getElementById('preloader-treino');
    const accordionContainer = document.querySelector('.accordion');
    preloaderTreino.style.display="flex"
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
            if (data.success && data.conteudoJson) {
                 preloaderTreino.style.display="none"
                const treinos = data.conteudoJson;
                if (treinos.length < 1) {
                    // Cria o elemento h4
                    let aviso = document.createElement('p');

                    // Define o texto do elemento h4
                    aviso.innerText = "Nenhum Treino Encontrado!😞";

                    // Obtém o contêiner onde o elemento será inserido
                    let containSecondary = document.querySelector('.contain-secondary');

                    // Adiciona o elemento h4 dentro do contêiner
                    if (containSecondary) {
                        containSecondary.appendChild(aviso);
                    }
                }
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
                    iconOpTreino.innerHTML = `<i class="bi bi-pencil-square edit-icon"></i><i class="bi bi-trash-fill delete-icon"></i>`;

                    // Adicionar eventos de clique para editar e excluir
                    const editIcon = iconOpTreino.querySelector('.edit-icon');
                    const deleteIcon = iconOpTreino.querySelector('.delete-icon');

                    editIcon.addEventListener('click', (event) => {
                        event.stopPropagation(); // Evita que o evento de clique no acordeão seja acionado
                        const treinoId = accordionHeader.dataset.id;
                        window.location.href = `../treinosEdit/treinosEdit.html?TreinoEditId=${treinoId}`;
                    });

                    deleteIcon.addEventListener('click', (event) => {
                        event.stopPropagation(); // Evita que o evento de clique no acordeão seja acionado
                        const treinoId = accordionHeader.dataset.id;
                        if (treinoId) {
                            openPopup('Você tem certeza que deseja excluir este item?', function () {
                                // Ação a ser executada em caso de confirmação
                                fetch(`https://apigym-fourdevs.vercel.app/training/${treinoId}`, {
                                    method: 'DELETE',
                                    headers: headers
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Erro na requisição: ' + response.statusText);
                                        }
                                        console.log(`Treino com ID ${treinoId} excluído com sucesso.`);
                                        // Atualizar interface ou remover o item do acordeão, se necessário
                                        location.reload(true); // Recarregar a página forçando a busca de novos dados
                                    })
                                    .catch(error => {
                                        console.error('Erro ao excluir treino:', error);
                                    });
                            });
                        } else {
                            console.error('ID do treino não encontrado para exclusão.');
                        }
                    });

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
