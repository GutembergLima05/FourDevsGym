document.addEventListener('DOMContentLoaded', () => {
    const mockData = [
        {
           
            alunoAvaliacao: "Wilkenio",
            avaliacoes: [
                {
                    nome_avaliacao: 'Avaliação 1',
                    nome_admAvaliacao: "guto personal",
                    obj: "Ficar bombado",
                    peso: "76Kg",
                    id_avaliacao: 1,
                    altura:"190cm"
                },
                {
                    nome_avaliacao: 'Avaliação 2',
                    nome_admAvaliacao: "guto personal",
                    obj: "Ficar magro",
                    peso: "100Kg",
                    altura:"175cm"
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
            if (avaliacao.id_admAvaliacao) {
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
                        <div><strong>Objetivo:</strong> ${avaliacao.obj}</div>
                        <div><strong>Peso:</strong> ${avaliacao.peso}</div>
                        <div><strong>Altura:</strong> ${avaliacao.altura}</div>
                        <div><br><br><strong style='color:red;'>Responsável:</strong> ${avaliacao.nome_admAvaliacao}</div>
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
