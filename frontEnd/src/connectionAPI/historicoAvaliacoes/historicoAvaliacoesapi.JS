document.addEventListener('DOMContentLoaded', async () => {
    const tokenAdm = localStorage.getItem('tokenAdm');
    const idAluno = parseInt(new URLSearchParams(window.location.search).get('idAluno'));
    const urlAluno = `https://apigym-fourdevs.vercel.app/student/${idAluno}`;

    try {
        // Requisição para obter os detalhes do aluno
        const responseAluno = await fetch(urlAluno, {
            headers: {
                'Authorization': `Bearer ${tokenAdm}`
            }
        });

        if (!responseAluno.ok) {
            throw new Error(`HTTP error! Status: ${responseAluno.status}`);
        }

        const dataAluno = await responseAluno.json();
        const nomeAluno = dataAluno?.conteudoJson?.nome || 'Nome não encontrado'; // Captura o nome do aluno

        // Exibir o nome do aluno na classe .nome-aluno
        const nomeAlunoElement = document.querySelector('.nome-aluno');
        if (nomeAlunoElement) {
            nomeAlunoElement.textContent = nomeAluno;
        }

        // Continuação do seu código para buscar e exibir as avaliações
        const urlAvaliacoes = 'https://apigym-fourdevs.vercel.app/evaluation';
        const response = await fetch(urlAvaliacoes, {
            headers: {
                'Authorization': `Bearer ${tokenAdm}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const evaluations = data?.conteudoJson || [];
        const filteredEvaluations = evaluations.filter(avaliacao => avaliacao.id_aluno === idAluno);
        const accordionContainer = document.querySelector('.accordion');

        if (filteredEvaluations.length === 0) {
            const aviso = document.createElement('p');
            aviso.innerText = "Nenhuma Avaliação Encontrada! 😞";
            document.querySelector('.contain-secondary')?.appendChild(aviso);
        }

        filteredEvaluations.forEach(avaliacao => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion-item');

            const accordionHeader = document.createElement('button');
            accordionHeader.classList.add('accordion-header');
            accordionHeader.dataset.id = avaliacao.id_avaliacao;

            const avaliacaoCard = document.createElement('div');
            avaliacaoCard.classList.add('avaliacao-card');
            avaliacaoCard.innerHTML = `
                <div class="nome-avaliacao"><i class="fa-solid fa-clipboard-list"></i> Avaliação ${avaliacao.data_criacao.split(' ')[0]}</div>
                <div class="icon-op-avaliacao">
                    <i class="bi bi-trash-fill delete-icon"></i>
                </div>
            `;

            avaliacaoCard.querySelector('.delete-icon').addEventListener('click', (event) => {
                event.stopPropagation();
                openPopup('Você tem certeza que deseja excluir essa Avaliação?', () => {
                    const headers = {
                        'Authorization': `Bearer ${tokenAdm}`
                    };
                    fetch(`https://apigym-fourdevs.vercel.app/evaluation/${avaliacao.id_avaliacao}`, { method: 'DELETE', headers })
                        .then(response => response.ok ? location.reload(true) : Promise.reject(`Erro na requisição: ${response.statusText}`))
                        .catch(error => console.error('Erro ao excluir treino:', error));
                });
            });

            const accordionContent = document.createElement('div');
            accordionContent.classList.add('accordion-content');
            accordionContent.style.maxHeight = null;

            accordionItem.appendChild(accordionHeader);
            accordionItem.appendChild(accordionContent);
            accordionContainer.appendChild(accordionItem);

            accordionHeader.appendChild(avaliacaoCard);
            accordionHeader.addEventListener('click', () => {
                if (accordionContent.style.maxHeight) {
                    accordionContent.style.maxHeight = null;
                } else {
                    document.querySelectorAll('.accordion-content').forEach(content => content.style.maxHeight = null);
                    accordionContent.innerHTML = '';

                    const divAvaliacao = document.createElement('div');
                    divAvaliacao.classList.add('avaliacao');
                    divAvaliacao.innerHTML = `
                        <div class="detalhes-avaliacao">
                            <form id="dados-avaliacao">
                                <div class="contain-dado-1" id="dado-1">
                                    <div class="title-dado"><i class="bi bi-bullseye"></i> Objetivo</div>
                                    <div class="text-dado">Objetivos com relação à atividade física:</div>
                                    <input type="text" class="model-1" value="${avaliacao.obj}" disabled>
                                </div>
                                <div class="contain-dado-2" id="dado-2">
                                    <div class="title-dado"><i class="bi bi-clipboard-data-fill"></i> Composição Corporal</div>
                                    <div class="corporal">
                                        <div class="text-dado">Peso(Kg):</div>
                                        <input type="text" class="model-2" value="${avaliacao.peso}" disabled>
                                    </div>
                                    <div class="corporal">
                                        <div class="text-dado">Altura(cm):</div>
                                        <input type="text" class="model-2" value="${avaliacao.altura}" disabled>
                                    </div>
                                </div>
                                <div class="contain-dado-2" id="dado-3">
                                    <div class="title-dado"><i class="bi bi-activity"></i> Métricas</div>
                                    <section class="dados-duplos">
                                        <div>
                                            <div class="text-dado">Braço Direito Contraído:</div>
                                            <input type="text" class="model-2" value="${avaliacao.braco_direito_contraido}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Braço Direito Relaxado:</div>
                                            <input type="text" class="model-2" value="${avaliacao.braco_direito_relaxado}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Braço Esquerdo Contraído:</div>
                                            <input type="text" class="model-2" value="${avaliacao.braco_esquerdo_contraido}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Braço Esquerdo Relaxado:</div>
                                            <input type="text" class="model-2" value="${avaliacao.braco_esquerdo_relaxado}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Panturrilha Direita:</div>
                                            <input type="text" class="model-2" value="${avaliacao.panturrilha_direita}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Panturrilha Esquerda:</div>
                                            <input type="text" class="model-2" value="${avaliacao.panturrilha_esquerda}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Coxa Direita:</div>
                                            <input type="text" class="model-2" value="${avaliacao.coxa_direita}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Coxa Esquerda:</div>
                                            <input type="text" class="model-2" value="${avaliacao.coxa_esquerda}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Antebraço Direito:</div>
                                            <input type="text" class="model-2" value="${avaliacao.antebraco_direito}" disabled>
                                        </div>
                                        <div>
                                            <div class="text-dado">Antebraço Esquerdo:</div>
                                            <input type="text" class="model-2" value="${avaliacao.antebraco_esquerdo}" disabled>
                                        </div>
                                    </section>
                                    <div class="dado-individual">
                                        <div class="text-dado">Cintura:</div>
                                        <input type="text" class="model-2" value="${avaliacao.cintura}" disabled>
                                        <div class="text-dado">Abdomen:</div>
                                        <input type="text" class="model-2" value="${avaliacao.abdomen}" disabled>
                                        <div class="text-dado">Quadril:</div>
                                        <input type="text" class="model-2" value="${avaliacao.quadril}" disabled>
                                        <div class="text-dado">Torax Relaxado:</div>
                                        <input type="text" class="model-2" value="${avaliacao.torax}" disabled>
                                    </div>
                                </div>
                                <div class="contain-dado-2" id="dado-4">
                                    <div class="title-dado"><i class="bi bi-speedometer2"></i> Bioimpedância</div>
                                    <div>
                                        <div class="text-dado">Água Corporal:</div>
                                        <input type="text" class="model-2" value="${avaliacao.agua_corporal}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Proteína:</div>
                                        <input type="text" class="model-2" value="${avaliacao.proteina}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Minerais Ósseos:</div>
                                        <input type="text" class="model-2" value="${avaliacao.minerais_osseos}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Massa Magra:</div>
                                        <input type="text" class="model-2" value="${avaliacao.massa_magra}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Gordura Visceral:</div>
                                        <input type="text" class="model-2" value="${avaliacao.gordura_visceral}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Gordura:</div>
                                        <input type="text" class="model-2" value="${avaliacao.gordura}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">IMC:</div>
                                        <input type="text" class="model-2" value="${avaliacao.imc}" disabled>
                                    </div>
                                    <div>
                                        <div class="text-dado">Massa Gorda:</div>
                                        <input type="text" class="model-2" value="${avaliacao.massa_gorda}" disabled>
                                    </div>
                                </div>
                                <div class="contain-dado-2" id="dado-5">
                                    <div class="title-dado"><i class="bi bi-clipboard-check"></i> Conclusão</div>
                                    <div class="concluis">
                                        <input type="text" class="model-2" value="${avaliacao.conclusao}" disabled>
                                    </div>
                                </div>
                            </form>
                        </div>
                    `;

                    accordionContent.appendChild(divAvaliacao);
                    accordionContent.style.maxHeight = `${divAvaliacao.scrollHeight}px`;
                }
            });
        });

    } catch (error) {
        console.error('Erro ao buscar as avaliações:', error);
        console.log('Erro ao buscar as avaliações. Por favor, tente novamente mais tarde.');
    }
});

function openPopup(message, callback) {
    if (confirm(message)) {
        callback();
    }
}
