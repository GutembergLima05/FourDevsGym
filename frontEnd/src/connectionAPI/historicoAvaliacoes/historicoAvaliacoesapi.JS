document.addEventListener('DOMContentLoaded', () => {
    const mockData = [
        {
           
            alunoAvaliacao: "Wilkenio",
            avaliacoes: [
                {
                    id_avaliacao: 1,
                    nome_avaliacao: 'Avaliação 1',
                    nome_admAvaliacao: "guto personal",
                    obj: "Ficar bombado",
                    peso: "76Kg",
                    altura:190,
                    bracoDescD:"30cm",
                    bracoDescE:"30cm",
                    bracoContraD:"30cm",
                    bracoContraE:"30cm",
                    panturrilhaD:"20cm",
                    panturrilhaE:"20cm",
                    coxaD:"20cm",
                    coxaE:"20cm",
                    antebraçoD:"20cm",
                    antebraçoE:"20cm",
                    cintura:"70cm",
                    abdomen:"70cm",
                    quadril:"70cm",
                    toraxRelax:"70cm",
                    aguaCorp:"70cm",
                    massaOssea:"70cm",
                    gorduraVisc:"70cm",
                    massaMagra:"70cm",
                    idadeMeta:"20",
                    relacaoCintura:"20",
                    taxaMetabol:"20",
                    porcentagemGordura:"20",
                },
                {
                    id_avaliacao: 2,
                    nome_avaliacao: 'Avaliação 2',
                    nome_admAvaliacao: "guto personal",
                    obj: "Ficar bombado",
                    peso: "76Kg",
                    altura:190,
                    bracoDescD:"30cm",
                    bracoDescE:"30cm",
                    bracoContraD:"30cm",
                    bracoContraE:"30cm",
                    panturrilhaD:"20cm",
                    panturrilhaE:"20cm",
                    coxaD:"20cm",
                    coxaE:"20cm",
                    antebraçoD:"20cm",
                    antebraçoE:"20cm",
                    cintura:"70cm",
                    abdomen:"70cm",
                    quadril:"70cm",
                    toraxRelax:"70cm",
                    aguaCorp:"70cm",
                    massaOssea:"70cm",
                    gorduraVisc:"70cm",
                    massaMagra:"70cm",
                    idadeMeta:"20",
                    relacaoCintura:"20",
                    taxaMetabol:"20",
                    porcentagemGordura:"20",
                }
            ]
        }
    ];

    const preloaderTreino = document.getElementById('preloader-treino');
    const accordionContainer = document.querySelector('.accordion');
    preloaderTreino.style.display = "none";

    const alunoAvaliacoes = mockData[0]?.avaliacoes || [];
    document.querySelector('.nome-aluno').innerText= mockData[0]?.alunoAvaliacao
    if (alunoAvaliacoes.length < 1) {
        const aviso = document.createElement('p');
        aviso.innerText = "Nenhuma Avaliação Encontrada!😞";
        document.querySelector('.contain-secondary')?.appendChild(aviso);
    }

    alunoAvaliacoes.forEach(avaliacao => {
        if (!avaliacao.nome_avaliacao ) return console.error('Dados da avaliação inválidos:', avaliacao);

        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const accordionHeader = document.createElement('button');
        accordionHeader.classList.add('accordion-header');
        accordionHeader.dataset.id = avaliacao.id_admAvaliacao;

        const avaliacaoCard = document.createElement('div');
        avaliacaoCard.classList.add('avaliacao-card');
        avaliacaoCard.innerHTML = `
            <div class="nome-avaliacao"><i class="fa-solid fa-clipboard-list"></i> ${avaliacao.nome_avaliacao}</div>
            <div class="icon-op-avaliacao">
                <i class="bi bi-trash-fill delete-icon"></i>
            </div>
        `;

        avaliacaoCard.querySelector('.delete-icon').addEventListener('click', (event) => {
            event.stopPropagation();
            if (avaliacao.id_avaliacao) {
                openPopup('Você tem certeza que deseja excluir esta avaliação?', () => {
                    console.log(`Avaliação com ID ${avaliacao.id_admAvaliacao} excluída.`);
                    accordionItem.remove();
                });
            } else {
                console.error('ID da avaliação não encontrado para exclusão.');
            }
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
                    <div class="title-dado"><i class="bi bi-bullseye"></i> Análise</div>
                    <div class="text-dado">Objetivos com relação à atividade física:</div>
                    <input type="text" class="model-1" value="${avaliacao.obj}"disabled>
                </div>
                <div class="contain-dado-2" id="dado-2">
                    <div class="title-dado"><i class="bi bi-clipboard-data-fill"></i> Composição Corporal</div>
                    <div class="corporal">
                        <div class="text-dado">Peso(Kg):</div>
                        <input type="text" class="model-2" value="${avaliacao.peso}"disabled>
                    </div>
                    <div class="corporal">
                        <div class="text-dado">Altura(cm):</div>
                        <input type="text" class="model-2" value="${avaliacao.altura}"disabled>
                    </div>
                </div>
                <div class="contain-dado-2" id="dado-3">
                    <div class="title-dado"><i class="bi bi-activity"></i> Métricas</div>
                    <section class="dados-duplos">
                        <div id="direito">
                            <div class="text-dado">D</div>
                        </div>
                        <div id="esquerdo">
                            <div class="text-dado">E</div>
                        </div>
                        <div>
                            <div class="text-dado">Braço Descançado:</div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado"><br><br></div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado">Braço Contraído:</div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado"><br><br></div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado">Panturrilha:</div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado"><br></div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado">Coxa:</div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado"><br></div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado">Antebraço:</div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                        <div>
                            <div class="text-dado"><br></div>
                            <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        </div>
                    </section>
                    <div class="dado-individual">
                        <div class="text-dado">Cintura:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        <div class="text-dado">Abdomen:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        <div class="text-dado">Quadril:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                        <div class="text-dado">Torax Relaxado:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>

                </div>
                <div class="contain-dado-2" id="dado-4">
                    <div class="title-dado"><i class="bi bi-speedometer2"></i> Bioimpedância</div>
                    <div>
                        <div class="text-dado">Água Corporal:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Massa Óssea:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Gordura Visceral:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Massa Magra:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Idade Metabólica:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Relação Cintura-Quadril:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">Taxa Metabólica Basal:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                    <div>
                        <div class="text-dado">% de Gordura Corporal:</div>
                        <input type="text" class="model-2" value="${avaliacao.bracoDescD}"disabled>
                    </div>
                </div>
                <div class="contain-dado-2" >
                    <div class="title-dado"><i class="bi bi-pencil-square"></i> Avaliador</div>
                </div>
                <div>${avaliacao.nome_admAvaliacao}</div>
            </form>
                    </div>
                `;
                accordionContent.appendChild(divAvaliacao);

                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }
        });
    });

    document.querySelector('#back').addEventListener('click', (event) => {
        window.history.back();
    });
});
