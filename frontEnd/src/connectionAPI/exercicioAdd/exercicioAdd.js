document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#treinosView form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Coletar os dados do formulário
        const nome = document.querySelector('#InputNomeTreino').value;
        const descricao = document.querySelector('#TextareaDescricaoTreino').value;
        const gifFile = document.querySelector('#inputFile').files[0]; // Apenas o primeiro arquivo
        const id_administrador = "1"; // Supondo que você já tenha o ID do administrador

        // Verificar se todos os campos obrigatórios foram preenchidos
        if (!nome || !descricao || !gifFile) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Verificar se o arquivo é do tipo aceitável (gif, png, jpg, webp)
        const allowedTypes = ['image/gif', 'image/png', 'image/jpeg', 'image/webp'];
        if (!allowedTypes.includes(gifFile.type)) {
            alert('Por favor, selecione um arquivo GIF, PNG, JPG ou WEBP.');
            return;
        }

        // Token do administrador do localStorage
        const token = localStorage.getItem('tokenAdm');
        if (!token) {
            alert('Não foi possível enviar os dados. Token não encontrado.');
            return;
        }

        // Construir o objeto para enviar os dados textuais
        const data = {
            nome: nome,
            descricao: descricao,
            id_administrador: id_administrador,
            gif_url: "../../public/assets/exercicios/" + gifFile.name // Caminho onde o arquivo será armazenado
        };

        // Enviar os dados textuais para a API
        fetch('https://apigym-fourdevs.vercel.app/Exercise', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Resposta da API:', data);
            if (data.success) {
                // Upload do arquivo
                const formData = new FormData();
                formData.append('file', gifFile);

                fetch('https://apigym-fourdevs.vercel.app/Upload', { // Supondo que o endpoint de upload seja /Upload
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(fileData => {
                    console.log('Resposta do upload:', fileData);
                    if (fileData.success) {
                        alert('Exercício adicionado e arquivo enviado com sucesso!');
                        form.reset(); // Limpar o formulário após o envio bem-sucedido
                    } else {
                        alert(`Erro no upload do arquivo: ${fileData.message}`);
                    }
                })
                .catch(error => {
                    console.error('Erro ao enviar o arquivo:', error);
                    alert('Ocorreu um erro ao enviar o arquivo. Por favor, tente novamente.');
                });
            } else {
                alert(`Erro: ${data.conteudoJson.message}`);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar os dados:', error);
            alert('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
        });
    });
});
