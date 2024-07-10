document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('tokenAdm');
    if (!token) return console.error('Token não encontrado no localStorage.');

    fetch('https://apigym-fourdevs.vercel.app/dashboard', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) return console.error('Erro ao receber os dados da API.');

        const conteudo = data.conteudoJson;
        document.getElementById('numero-alunos').textContent = conteudo.total_alunos;
        document.getElementById('numero-ausente').textContent = conteudo.alunos_sem_plano_ativo;
        
        const aniversariantes = conteudo.aniversariantes;
        document.getElementById('numero-aniversariantes').textContent = aniversariantes.length;
        document.getElementById('lista-aniversariantes').innerHTML = aniversariantes.length ? aniversariantes.map(a => a.nome).join('<br>') : 'Nenhum';

        const today = new Date();
        const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
        document.getElementById('data-niver').querySelector('h4').textContent = todayFormatted;
    })
    .catch(error => console.error('Erro na requisição:', error));
});
