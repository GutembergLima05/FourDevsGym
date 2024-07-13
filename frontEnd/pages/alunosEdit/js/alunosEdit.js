document.addEventListener('DOMContentLoaded', (event) => {

    const AlunoId = parseInt(new URLSearchParams(window.location.search).get('idAluno'));

    document.getElementById('planoAluno').addEventListener('click', () => {
        planoAluno()
    });
    document.getElementById('treinoAluno').addEventListener('click', () => {
        treinoAluno()
    });
    document.getElementById('hist-avaliacoes').addEventListener('click', () => {
        window.location = "../historicoAvaliacoes/historicoAvaliacoes.html?idAluno=" + AlunoId
    });
    document.getElementById('fazerAvaliacao').addEventListener('click', () => {
        window.location = "../avaliacaoAdd/avaliacaoAdd.html?idAluno=" + AlunoId
    });

    function planoAluno() {
        openPreLoader()
        const tokenAdm = localStorage.getItem('tokenAdm');

        fetch('https://apigym-fourdevs.vercel.app/Plan', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenAdm}`
            }
        })
            .then(response => response.json())
            .then(data => {
                closePreLoader()
                if (data.success) {
                    const planos = data.conteudoJson;
                    const select = document.createElement('select');
                    select.id = 'planos';

                    planos.forEach(plano => {
                        const option = document.createElement('option');
                        option.value = plano.id_plano; // Armazenando o ID do plano no valor da opção
                        option.textContent = plano.tipo; // Nome do plano
                        select.appendChild(option);
                    });

                    openPopup("Renove o plano do aluno:" + select.outerHTML, () => {
                        const selectedPlanId = document.getElementById('planos').value;
                        console.log('ID do plano selecionado:', selectedPlanId);
                    });
                } else {
                    console.error('Erro ao carregar os planos:', data);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }


    function treinoAluno() {
        openPreLoader()
        const tokenAdm = localStorage.getItem('tokenAdm');
        fetch('https://apigym-fourdevs.vercel.app/Training', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenAdm}`
            }
        })
            .then(response => response.json())
            .then(data => {
                closePreLoader()
                if (data.success) {
                    const planos = data.conteudoJson;
                    const select = document.createElement('select');
                    select.id = 'treinoAlunoSelect';
                    //console.log(planos)

                    planos.forEach(plano => {
                        const option = document.createElement('option');
                        option.value = plano.id_treino; // Armazenando o ID do treino no valor da opção
                        option.textContent = plano.nome; // Nome do treino
                        select.appendChild(option);
                    });

                    openPopup("Recomendar esse treino:" + select.outerHTML, () => {
                        const selectedPlanId = document.getElementById('treinoAlunoSelect').value;
                        console.log('ID do Treino selecionado:', selectedPlanId);
                    });
                } else {
                    console.error('Erro ao carregar os Treinos:', data);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }

    function openPreLoader() {
        let preLoader = document.getElementById('contain-preLoader')
        preLoader.style.display = "flex"
        preLoader.style.opacity = "0.7"
    }
    function closePreLoader() {
        let preLoader = document.getElementById('contain-preLoader')
        preLoader.style.display = "none"
        preLoader.style.opacity = "1"
    }
});
