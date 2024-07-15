document.addEventListener('DOMContentLoaded', (event) => {
    const tokenAdm = localStorage.getItem('tokenAdm');
    const idAcademia = parseInt(localStorage.getItem('id_academia'));
    const alunoId = parseInt(new URLSearchParams(window.location.search).get('idAluno'));
    const AlunoId = parseInt(new URLSearchParams(window.location.search).get('idAluno'));

    // Buscar dados do aluno do localStorage
    const aluno = JSON.parse(localStorage.getItem('alunoData'));



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
                        // Dados a serem enviados na requisição PUT
                        const dadosAtualizados = {
                            nome: aluno.nome,
                            telefone: aluno.telefone,
                            nascimento: convertDateFormat(aluno.nascimento), // Converte para YYYY-MM-DD
                            endereco: aluno.endereco,
                            email: aluno.email,
                            historico: aluno.historico,
                            id_academia: idAcademia,
                            id_treino: aluno.id_treino,
                            id_plano: selectedPlanId
                        };
                        // Enviar requisição PUT para atualizar dados do aluno
                        fetch(`https://apigym-fourdevs.vercel.app/student/${alunoId}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${tokenAdm}`,
                                'id_academia': idAcademia
                            },
                            body: JSON.stringify(dadosAtualizados)
                        })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                                if (data.success) {
                                    window.location.reload();
                                    console.log('Dados do aluno atualizados com sucesso:', data);
                                    // Adicione aqui o que deseja fazer após o sucesso do envio
                                } else {
                                    console.error('Erro ao atualizar dados do aluno:', data.message);
                                    // Adicione aqui o que deseja fazer após o erro no envio
                                }
                            })
                            .catch(error => {
                                console.error('Erro na requisição:', error);
                                // Adicione aqui o que deseja fazer após o erro na requisição
                            });
                    });
                } else {
                    console.error('Erro ao carregar os planos:', data);
                }
            })
            .catch(error => {
                console.error('Erro na requisição:', error);
            });
    }

    function convertDateFormat(dateTime) {
        if (!dateTime) return '';
        const [date, time] = dateTime.split(' ');
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }
    function treinoAluno() {
        openPreLoader();
        const tokenAdm = localStorage.getItem('tokenAdm');
        fetch('https://apigym-fourdevs.vercel.app/Training', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenAdm}`
            }
        })
        .then(response => response.json())
        .then(data => {
            closePreLoader();
            if (data.success) {
                const treinos = data.conteudoJson;
                const select = document.createElement('select');
                select.id = 'treinos';
    
                treinos.forEach(treino => {
                    const option = document.createElement('option');
                    option.value = treino.id_treino; // Armazenando o ID do treino no valor da opção
                    option.textContent = treino.nome; // Nome do treino
                    select.appendChild(option);
                });
    
                openPopup("Recomende um dos treinos:" + select.outerHTML, () => {
                    const selectedTreinoId = document.getElementById('treinos').value;
                    console.log('ID do Treino selecionado:', selectedTreinoId);
                
                    
                      // Dados a serem enviados na requisição PUT
                      const dadosAtualizados = {
                        nome: aluno.nome,
                        telefone: aluno.telefone,
                        nascimento: convertDateFormat(aluno.nascimento), // Converte para YYYY-MM-DD
                        endereco: aluno.endereco,
                        email: aluno.email,
                        historico: aluno.historico,
                        id_academia: idAcademia,
                        id_treino: selectedTreinoId,
                        id_plano: aluno.id_plano
                    };
                    // Enviar requisição PUT para atualizar dados do aluno
                    fetch(`https://apigym-fourdevs.vercel.app/student/${alunoId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${tokenAdm}`,
                            'id_academia': idAcademia
                        },
                        body: JSON.stringify(dadosAtualizados)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            if (data.success) {
                                window.location.reload();
                                console.log('Dados do aluno atualizados com sucesso:', data);
                                // Adicione aqui o que deseja fazer após o sucesso do envio
                            } else {
                                console.error('Erro ao atualizar dados do aluno:', data.message);
                                // Adicione aqui o que deseja fazer após o erro no envio
                            }
                        })
                        .catch(error => {
                            console.error('Erro na requisição:', error);
                            // Adicione aqui o que deseja fazer após o erro na requisição
                        });
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
