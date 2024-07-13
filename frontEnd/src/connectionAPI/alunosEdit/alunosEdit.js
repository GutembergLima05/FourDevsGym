document.addEventListener('DOMContentLoaded', function () {
    const mockResponse = {
        "conteudoJson": [
            {
                "id_aluno": 19,
                "nome": "Wilkenio",
                "telefone": "814971052203",
                "endereco": "rua 1",
                "historicoSaude": "vazio",
                "data_nasc": "11/07/2024 14:07:49",
                "email": "wilkeniopereiraguitarra@gmail.com"
            }
        ],
        "success": true
    };
    
    const AlunoId = parseInt(new URLSearchParams(window.location.search).get('idAluno'));

    // Preencher os campos do formulário com os dados recebidos
    const aluno = mockResponse.conteudoJson[0];
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('telefone').value = aluno.telefone;
    document.getElementById('dataNascimento').value = convertDateFormat(aluno.data_nasc);
    document.getElementById('endereco').value = aluno.endereco;
    document.getElementById('email').value = aluno.email;
    document.getElementById('historicoSaude').value = aluno.historicoSaude;

    // Habilitar edição ao clicar no ícone de lápis
    document.getElementById('edit-icon').addEventListener('click', function () {
        const inputs = document.querySelectorAll('#dadosAluno input, #dadosAluno textarea');
        const buttonCadastrar = document.getElementById('button-cadastrar');
        buttonCadastrar.style.display = "block";
        this.style.display = "none";
        inputs.forEach(input => {
            input.disabled = false;
            input.classList.add('editable');
        });
    });

    // Função para converter a data de "DD/MM/YYYY HH:MM:SS" para "YYYY-MM-DD"
    function convertDateFormat(dateTime) {
        const [date, time] = dateTime.split(' ');
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`;
    }

    // Enviar dados para a API ao clicar no botão Cadastrar
    document.getElementById('button-cadastrar').addEventListener('click', function () {
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const historicoSaude = document.getElementById('historicoSaude').value;

        const data = {
            nome: nome,
            telefone: telefone,
            dataNascimento: dataNascimento,
            endereco: endereco,
            email: email,
            historicoSaude: historicoSaude
        };
        console.log(data)
        fetch('URL_DA_API', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Adicione aqui o que deseja fazer após o sucesso do envio
        })
        .catch((error) => {
            console.error('Error:', error);
            mostrarAlerta("Esperando a api",5000)
            // Adicione aqui o que deseja fazer após o erro no envio
        });
    });
});
