document.addEventListener('DOMContentLoaded', async function() {
    // Função para preencher os dados do exercício nos inputs
    function preencherDadosExercicio(dadosExercicio) {
        const dataExercise = dadosExercicio.conteudoJson;
        document.getElementById('InputNomeTreino').value = dataExercise.nome;
        document.getElementById('TextareaDescricaoTreino').value = dataExercise.descricao;
        document.getElementById('InputUrlImage').value = dataExercise.gif_url;
    }

    // Função para obter os dados do exercício da API
    async function carregarDadosExercicio(idExercicio, tokenAdm) {
        const url = `https://apigym-fourdevs.vercel.app/Exercise/${idExercicio}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${tokenAdm}` // Adicionando token de autorização
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao obter dados do exercício');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro:', error);
            // Adicionar lógica para exibir mensagem de erro ao usuário, se necessário
            return null;
        }
    }

    // Função para atualizar o exercício na API
    async function atualizarExercicio(idExercicio, tokenAdm, idAdm) {
        const url = `https://apigym-fourdevs.vercel.app/Exercise/${idExercicio}`;
        const dadosAtualizados = {
            nome: document.getElementById('InputNomeTreino').value,
            descricao: document.getElementById('TextareaDescricaoTreino').value,
            gif_url: document.getElementById('InputUrlImage').value,
            id_administrador: idAdm // Utilizando o id do administrador do local storage
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenAdm}` // Adicionando token de autorização
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar exercício');
            }

            const data = await response.json();
            //console.log('Exercício atualizado:', data.success);
            if(data.success == true){
                window.location="../exerciciosView/exerciciosView.html"
            }else{
                mostrarAlerta("Erro ao atualizar exercicio",5000)
            }
            // Adicionar lógica de feedback para o usuário, se necessário
        } catch (error) {
            console.error('Erro:', error);
            // Adicionar lógica para exibir mensagem de erro ao usuário, se necessário
        }
    }

    // Obter o ID do exercício da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idExercicio = urlParams.get('id_exercicio');

    if (!idExercicio) {
        console.error('ID do exercício não encontrado na URL.');
        return;
    }

    // Obter tokenAdm do localStorage (substitua pelo seu método real de obtenção)
    const tokenAdm = localStorage.getItem('tokenAdm');

    if (!tokenAdm) {
        console.error('Token de administração não encontrado no localStorage.');
        return;
    }

    // Carregar os dados do exercício da API
    const dadosExercicio = await carregarDadosExercicio(idExercicio, tokenAdm);

    if (dadosExercicio) {
        // Preencher os inputs com os dados recebidos da API
        preencherDadosExercicio(dadosExercicio);

        // Event listener para o envio do formulário
        document.getElementById('exerciseForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar o comportamento padrão de submit

            // Obter idAdm do localStorage (substitua pelo seu método real de obtenção)
            const idAdm = localStorage.getItem('id_Adm');

            if (!idAdm) {
                console.error('ID do administrador não encontrado no localStorage.');
                return;
            }

            // Chamar a função para atualizar o exercício
            atualizarExercicio(idExercicio, tokenAdm, idAdm);
        });
    } else {
        console.error('Falha ao carregar dados do exercício da API.');
        // Adicionar lógica para exibir mensagem de erro ao usuário, se necessário
    }
});
