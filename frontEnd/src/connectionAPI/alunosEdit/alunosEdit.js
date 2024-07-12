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
        buttonCadastrar.style.display="block"
        this.style.display="none"
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
});