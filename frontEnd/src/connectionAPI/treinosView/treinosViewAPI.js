document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('tokenAdm');
    if (!token) return console.error('Token não encontrado no localStorage');

    const headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache'
    });

    const preloaderTreino = document.getElementById('preloader-treino');
    const accordionContainer = document.querySelector('.accordion');
    preloaderTreino.style.display = "flex";

    fetch('https://apigym-fourdevs.vercel.app/training', { method: 'GET', headers })
        .then(response => response.ok ? response.json() : Promise.reject(`Erro na requisição: ${response.statusText}`))
        .then(data => {
            preloaderTreino.style.display = "none";
            if (!data.success || !data.conteudoJson) return console.error('Dados da API inválidos');

            const treinos = data.conteudoJson;
            if (treinos.length < 1) {
                const aviso = document.createElement('p');
                aviso.innerText = "Nenhum Treino Encontrado!😞";
                document.querySelector('.contain-secondary')?.appendChild(aviso);
            }

            treinos.forEach(treino => {
                if (!treino.id_treino || !treino.nome) return console.error('Dados do treino inválidos:', treino);

                const accordionItem = document.createElement('div');
                accordionItem.classList.add('accordion-item');

                const accordionHeader = document.createElement('button');
                accordionHeader.classList.add('accordion-header');
                accordionHeader.dataset.id = treino.id_treino;

                const treinoCard = document.createElement('div');
                treinoCard.classList.add('treino-card');
                treinoCard.innerHTML = `
                    <div class="nome-treino"><i class="fa-solid fa-dumbbell"></i> ${treino.nome}</div>
                    <div class="icon-op-treino">
                        <i class="bi bi-pencil-square edit-icon"></i>
                        <i class="bi bi-trash-fill delete-icon"></i>
                    </div>
                `;

                treinoCard.querySelector('.edit-icon').addEventListener('click', (event) => {
                    event.stopPropagation();
                    window.location.href = `../treinosEdit/treinosEdit.html?TreinoEditId=${treino.id_treino}`;
                });

                treinoCard.querySelector('.delete-icon').addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (treino.id_treino) {
                        openPopup('Você tem certeza que deseja excluir este item?', () => {
                            fetch(`https://apigym-fourdevs.vercel.app/training/${treino.id_treino}`, { method: 'DELETE', headers })
                                .then(response => response.ok ? location.reload(true) : Promise.reject(`Erro na requisição: ${response.statusText}`))
                                .catch(error => console.error('Erro ao excluir treino:', error));
                        });
                    } else {
                        console.error('ID do treino não encontrado para exclusão.');
                    }
                });

                const accordionContent = document.createElement('div');
                accordionContent.classList.add('accordion-content');
                accordionContent.style.maxHeight = null;

                accordionItem.appendChild(accordionHeader);
                accordionItem.appendChild(accordionContent);
                accordionContainer.appendChild(accordionItem);

                accordionHeader.appendChild(treinoCard);
                accordionHeader.addEventListener('click', () => {
                    preloaderTreino.style.display = "flex";
                    if (!treino.id_treino) return console.error('ID do treino não encontrado no dataset.');

                    if (accordionContent.style.maxHeight) {
                        accordionContent.style.maxHeight = null;
                        preloaderTreino.style.display = "none";
                    } else {
                        document.querySelectorAll('.accordion-content').forEach(content => content.style.maxHeight = null);
                        fetch(`https://apigym-fourdevs.vercel.app/training/${treino.id_treino}`, { method: 'GET', headers })
                            .then(response => response.ok ? response.json() : Promise.reject(`Erro na requisição: ${response.statusText}`))
                            .then(details => {
                              
                                preloaderTreino.style.display = "none";
                                const conteudoJson = details?.conteudoJson;
                                //if (!conteudoJson?.dias) return console.error('Detalhes do treino ou array de dias não encontrado ou inválido:', details);

                                accordionContent.innerHTML = '';
                                if (conteudoJson.dias.length === 0) accordionContent.innerText = "Vazio";
                             
                                conteudoJson.dias.forEach(dia => {
                                    const divDia = document.createElement('div');
                                    divDia.classList.add('dia');
                                    divDia.innerHTML = `<div class="nome_dia">Dia ${dia.id_dia}</div>`;
                                    accordionContent.appendChild(divDia);
                                    dia.exercicios?.forEach(exercicio => {
                                            const exercicioDetalhes = data?.conteudoJson;
                                            if (!exercicioDetalhes) return console.error('Detalhes do exercício não encontrados:', data);
                                            const divExercicio = document.createElement('div');
                                            divExercicio.classList.add('exercicio');
                                            divExercicio.innerHTML = `
                                                <img src="`+exercicio.gif_url+`" alt="Exercicio">
                                                <div class="nome-exercicio">${exercicio.exercicio_nome}</div>
                                                <div class="serie-exercicio">${exercicio.series}</div>
                                                <div>X</div>
                                                <div class="rep-exercicio">${exercicio.repeticoes}</div>
                                            `;
                                            divDia.appendChild(divExercicio);
                                        })
                                    });

                                   
                                });

                                accordionContent.style.maxHeight = 140 + 'rem';
                    }
                });
            });
        })
        .catch(error => {
            preloaderTreino.style.display = 'none';
            console.error('Erro:', error);
        });
});
