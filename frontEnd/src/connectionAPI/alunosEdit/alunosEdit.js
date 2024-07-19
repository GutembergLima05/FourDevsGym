document.addEventListener('DOMContentLoaded', function () {
    const alunoId = parseInt(new URLSearchParams(window.location.search).get('idAluno'));
    const tokenAdm = localStorage.getItem('tokenAdm');
    const idAcademia = parseInt(localStorage.getItem('id_academia'));

    // Verificar se tokenAdm e idAcademia estão definidos
    if (!tokenAdm || !idAcademia) {
        console.error("Token de administrador ('tokenAdm') ou ID da academia ('id_academia') não encontrados no localStorage.");
        return;
    }

    // Função para converter a data de "DD/MM/YYYY HH:MM:SS" para "YYYY-MM-DD"
    function convertDateFormat(dateTime) {
        if (!dateTime) return '';
        const [date, time] = dateTime.split(' ');
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }

    // Buscar dados do aluno pela API
    fetch(`https://apigym-fourdevs.vercel.app/student/${alunoId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenAdm}`,
            'id_academia': idAcademia
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const aluno = data.conteudoJson;
            
            // Armazenar dados do aluno no localStorage
            localStorage.setItem('alunoData', JSON.stringify(aluno));

            // Preencher campos do formulário com os dados do aluno
            document.getElementById('nome').value = aluno.nome;
            document.getElementById('telefone').value = aluno.telefone;
            document.getElementById('dataNascimento').value = convertDateFormat(aluno.nascimento);
            document.getElementById('endereco').value = aluno.endereco;
            document.getElementById('email').value = aluno.email;
            document.getElementById('historicoSaude').value = aluno.historico;

            // Exibir o plano ativo do aluno
            fetch(`https://apigym-fourdevs.vercel.app/plan/${aluno.id_plano}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenAdm}`,
                    'id_academia': idAcademia
                }
            })
            .then(response => response.json())
            .then(planData => {
                let planoAtivoDiv = document.querySelector('.planoAtivo')
                if (planData.success) {
                    const plano = planData.conteudoJson;
                    planoAtivoDiv.textContent = `${plano.tipo}`;
                } else {
                    console.error('Erro ao buscar plano do aluno:', planData.message);
                    planoAtivoDiv.textContent = `Não Encontrado 😥`;
                }
            })
            .catch(error => {
                console.error('Erro na requisição do plano:', error);
            });


             // Exibir o plano ativo do aluno
             fetch(`https://apigym-fourdevs.vercel.app/training/${aluno.id_treino}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenAdm}`,
                    'id_academia': idAcademia
                }
            })
            .then(response => response.json())
            .then(planData => {
                if (planData.success) {
                    const plano = planData.conteudoJson.treino;
                    document.querySelector('.treinoRecomendado').textContent = `${plano.nome}`;
                } else {
                    console.error('Erro ao buscar plano do aluno:', planData.message);
                }
            })
            .catch(error => {
                console.error('Erro na requisição do plano:', error);
            });
        } else {
            console.error('Erro ao buscar dados do aluno:', data.message);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

    // Habilitar edição ao clicar no ícone de lápis
    document.getElementById('edit-icon').addEventListener('click', function () {
        const inputs = document.querySelectorAll('#dadosAluno input, #dadosAluno textarea');
        const buttonCadastrar = document.getElementById('button-cadastrar');
        buttonCadastrar.style.display = "block";
        this.style.display = "none";

        document.querySelector('.title-contain-main').textContent="Aluno - Editar"
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.add('editable');
        });
    });

    // Enviar dados atualizados para a API ao clicar no botão Cadastrar
    document.getElementById('button-cadastrar').addEventListener('click', function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const historicoSaude = document.getElementById('historicoSaude').value;

        // Buscar dados do aluno do localStorage
        const aluno = JSON.parse(localStorage.getItem('alunoData'));

        // Enviar dados atualizados para a API
        fetch(`https://apigym-fourdevs.vercel.app/student/${alunoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAdm}`,
                'id_academia': idAcademia
            },
            body: JSON.stringify({
                nome: nome,
                telefone: telefone,
                nascimento: dataNascimento,
                endereco: endereco,
                email: email,
                historico: historicoSaude,
                id_academia: idAcademia,
                id_treino: aluno.id_treino,
                id_plano: aluno.id_plano
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                // Atualizar dados no localStorage
                localStorage.setItem('alunoData', JSON.stringify({
                    ...aluno,
                    nome: nome,
                    telefone: telefone,
                    nascimento: dataNascimento,
                    endereco: endereco,
                    email: email,
                    historico: historicoSaude
                }));
                // Recarregar a página após sucesso
                window.location.reload();
                console.log('Dados atualizados com sucesso:', data);
            } else {

                if(data.conteudoJson.message === "Informe um número válido no campo 'id_plano'."){
                  mostrarAlerta("Adicione um plano a esse aluno para poder editá-lo",5000)
                }
                console.error('Erro ao atualizar dados:', data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
        });
    });
});
