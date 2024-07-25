document.addEventListener('DOMContentLoaded', () => {
    const exerciseForm = document.getElementById('exerciseForm');

    exerciseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Captura os dados do formulário
        const nome = document.getElementById('InputNomeTreino').value;
        const descricao = document.getElementById('TextareaDescricaoTreino').value;
        const gifUrl = document.getElementById('InputUrlImage').value;

        // Captura o token e o ID do administrador do localStorage
        const tokenAdm = localStorage.getItem('tokenAdm');
        const idAdministrador = localStorage.getItem('id_Adm'); // Ajuste conforme o nome da chave no localStorage

        if (!tokenAdm || !idAdministrador) {
            alert('Token ou ID do administrador não encontrado. Faça login novamente.');
            return;
        }

        // Monta o objeto de dados
        const exerciseData = {
            nome,
            descricao,
            id_administrador: idAdministrador,
            gif_url: gifUrl
        };

        try {
            // Envia a solicitação POST para a API
            const response = await fetch('https://apigym-fourdevs.vercel.app/Exercise/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenAdm}`
                },
                body: JSON.stringify(exerciseData)
            });

            // Verifica a resposta da API
            const result = await response.json();
            console.log(result)
            if (response.ok) {
              
                //console.log(result);
                //window.location='../exerciciosView/exerciciosView.html'
                // Redirecionar ou atualizar a página conforme necessário
            } else {
                const errorData = await response.json();
                //alert(`Erro ao adicionar exercício: ${errorData.conteudoJson.message}`);
                mostrarAlerta("Erro ao registrar exercício",5000)
                //console.error('Erro:', errorData);
            }
        } catch (error) {
            mostrarAlerta('Erro ao se comunicar com a API.',5000);
            //console.error('Erro:', error);
        }
    });
});
