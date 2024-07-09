document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('tokenAdm');
    if (token) {
        fetch('https://apigym-fourdevs.vercel.app/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const conteudo = data.conteudoJson;
                
                document.getElementById('numero-alunos').textContent = conteudo.total_alunos;
                document.getElementById('numero-ausente').textContent = conteudo.alunos_sem_plano_ativo;
                
                const aniversariantes = conteudo.aniversariantes;
                
                if (aniversariantes.length > 0) {
                    document.getElementById('numero-aniversariantes').textContent = aniversariantes.length;
                    
                    // Construir a lista de nomes dos aniversariantes com quebras de linha
                    const listaNomes = aniversariantes.map(aniversariante => aniversariante.nome).join('<br>');
                    document.getElementById('lista-aniversariantes').innerHTML = listaNomes;
                } else {
                    document.getElementById('numero-aniversariantes').textContent = '0';
                    document.getElementById('lista-aniversariantes').textContent = 'Nenhum';
                }

                // Exibir a data de hoje no formato DD/MM/AAAA
                const today = new Date();
                const day = String(today.getDate()).padStart(2, '0');
                const month = String(today.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
                const year = today.getFullYear();
                const todayFormatted = `${day}/${month}/${year}`;
                
                document.getElementById('data-niver').querySelector('h4').textContent = todayFormatted;

                document.getElementById('dashboard').style.display = 'block';
            } else {
                console.error('Erro ao receber os dados da API.');
            }
        })
        .catch(error => console.error('Erro na requisição:', error));
    } else {
        console.error('Token não encontrado no localStorage.');
    }
});
