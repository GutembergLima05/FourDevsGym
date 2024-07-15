document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('dadosAluno');
    const selectPlano = document.getElementById('plano');
    const selectTreino = document.getElementById('treinoRecomendado');

    try {
        // Buscar token de autenticação do localStorage
        const token = localStorage.getItem('tokenAdm');

        // Buscar dados de planos
        const responsePlanos = await fetch('https://apigym-fourdevs.vercel.app/plan', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!responsePlanos.ok) {
            throw new Error('Não foi possível obter os dados dos planos');
        }
        const dataPlanos = await responsePlanos.json();
        const planos = dataPlanos.conteudoJson;

        // Verificar o formato dos dados de planos
        if (!Array.isArray(planos)) {
            throw new Error('Dados dos planos não estão no formato esperado');
        }

        // Preencher o select de planos
        planos.forEach(plano => {
            const option = document.createElement('option');
            option.value = plano.id_plano;
            option.textContent = plano.tipo;
            selectPlano.appendChild(option);
        });

        // Buscar dados de treinos
        const responseTreinos = await fetch('https://apigym-fourdevs.vercel.app/training', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!responseTreinos.ok) {
            throw new Error('Não foi possível obter os dados dos treinos');
        }
        const dataTreinos = await responseTreinos.json();
        const treinos = dataTreinos.conteudoJson;

        // Verificar o formato dos dados de treinos
        if (!Array.isArray(treinos)) {
            throw new Error('Dados dos treinos não estão no formato esperado');
        }

        // Preencher o select de treinos recomendados
        treinos.forEach(treino => {
            const option = document.createElement('option');
            option.value = treino.id_treino;
            option.textContent = treino.nome;
            selectTreino.appendChild(option);
        });

        // Event listener para envio do formulário
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevenir o envio padrão do formulário

            // Coletar os dados do formulário
            const nome = document.getElementById('nome').value;
            const email = document.getElementById('email').value;
            const nascimento = document.getElementById('dataNascimento').value;
            const telefone = document.getElementById('telefone').value;
            const endereco = document.getElementById('endereco').value;
            const historico = document.getElementById('historicoSaude').value;
            const id_academia = parseInt(localStorage.getItem('id_academia')); // Substituir conforme necessário
            const id_plano = parseInt(selectPlano.value);
            const id_treino = parseInt(selectTreino.value);

            // Validar os dados
            if (!nome || !email || !nascimento || !telefone || !endereco || !historico || !id_academia || !id_plano || !id_treino) {
                mostrarAlerta('Todos os campos são obrigatórios.',5000);
                return;
            }



            // Montar objeto com os dados do aluno
            const dadosAluno = {
                nome,
                email,
                nascimento,
                telefone,
                endereco,
                historico,
                id_academia,
                id_plano,
                id_treino
            };

            // Enviar dados para a API de aluno
            try {
                const response = await fetch('https://apigym-fourdevs.vercel.app/student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(dadosAluno)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    const errorMessage = errorData.conteudoJson?.message || 'Erro desconhecido';
                    throw new Error(`Erro na requisição: ${response.status} (${response.statusText}) - ${errorMessage}`);
                }

                const responseData = await response.json();
                window.location.href = "../alunos/alunos.html";
                mostrarAlerta('Aluno cadastrado com sucesso',5000);
                console.log('Aluno cadastrado com sucesso:', responseData);
                // Exibir mensagem de sucesso ou redirecionar para outra página, etc.
            } catch (error) {
                mostrarAlerta(`${error.message}`,5000);
                console.error('Erro na requisição:', error);
                // Tratar o erro, exibir mensagem de erro, etc.
            }
        });

    } catch (error) {
        mostrarAlerta(`${error.message}`,5000);
        console.error('Erro ao carregar dados da API:', error);
        // Tratar o erro, exibir mensagem de erro, etc.
    }
});
