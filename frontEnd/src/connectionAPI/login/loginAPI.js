buttonEnterAdm.addEventListener("click", function () {
    checkLogin();
});

async function checkLogin() {
    // Mostra o preloader
    preloaderLogin.style.display = 'flex';

    var email = inputEmailLoginAdm.value;
    var password = inputPasswordLoginAdm.value;

    const url = 'https://fourdevsgym.onrender.com/adm/login';
    const dadosParaEnviar = {
        email: email,
        senha: password
    };

    try {
        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosParaEnviar)
        });

        const dadosResposta = await resposta.json();

        if (dadosResposta.success === true) {
            var tokenAdm = dadosResposta.conteudoJson.token;
            var nomeAdm = dadosResposta.conteudoJson.usuario.nome;
            var id_Adm = dadosResposta.conteudoJson.usuario.id_adm;

            // Armazena os dados no localStorage
            localStorage.setItem('tokenAdm', tokenAdm);
            localStorage.setItem('nomeAdm', nomeAdm);
            localStorage.setItem('id_Adm', id_Adm);
            // Aqui você pode fazer o que for necessário com os dados recebidos
            window.location.href = '../../pages/dashboard/dashboard.html';
        }
        resultDiv.innerText = dadosResposta.conteudoJson.message;

    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        resultDiv.innerText = "Erro ao fazer login";
    } finally {
        // Esconde o preloader, independentemente de ter ocorrido um erro ou não
        preloaderLogin.style.display = 'none';
    }
}
