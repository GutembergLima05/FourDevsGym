document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dadosAluno');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o comportamento padrão de recarregar a página

        // Coletando os dados do formulário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const historicoSaude = document.getElementById('historicoSaude').value;
        const plano = document.getElementById('plano').value;
        const treinoRecomendado = document.getElementById('treinoRecomendado').value;

        // Criando o objeto com os dados
        const dadosAluno = {
            nome,
            telefone,
            dataNascimento,
            endereco,
            email,
            historicoSaude,
            plano,
            treinoRecomendado
        };

        console.log('Dados do aluno:', dadosAluno); // Para verificar os dados coletados

        try {
            const response = await fetch('https://apigym-fourdevs.vercel.app/Exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('tokenAdm')}` // Se precisar de autenticação
                },
                body: JSON.stringify(dadosAluno)
            });

            if (response.ok) {
                // Sucesso na requisição
                console.log('Aluno cadastrado com sucesso!');
                mostrarAlerta('Aluno cadastrado com sucesso!',5000);
            } else {
                // Erro na requisição
                const errorData = await response.json();
                console.error('Erro ao cadastrar aluno:', errorData);
                mostrarAlerta('Erro ao cadastrar aluno. Verifique os dados e tente novamente.',5000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            mostrarAlerta('Erro na requisição. Tente novamente mais tarde.',5000);
        }
    });
});
