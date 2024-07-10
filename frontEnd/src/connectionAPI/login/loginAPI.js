<<<<<<< HEAD
buttonEnterAdm.addEventListener("click", function () {
    checkLogin();
});

async function checkLogin() {
    // Mostra o preloader
    preloaderLogin.style.display = 'flex';

    var email = inputEmailLoginAdm.value;
    var password = inputPasswordLoginAdm.value;
    

    const url = 'https://apigym-fourdevs.vercel.app/adm/login';
    const dadosParaEnviar = {
        email: email,
        senha: password,
        key:"3f7e9b8d4c1a2e5b7f6a8c3d9e1b7a2c"
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
            var nome_academia = dadosResposta.conteudoJson.usuario.nome_academia;

            // Armazena os dados no localStorage
            localStorage.setItem('tokenAdm', tokenAdm);
            localStorage.setItem('nomeAdm', nomeAdm);
            localStorage.setItem('id_Adm', id_Adm);
            localStorage.setItem('nome_academia',nome_academia)
            // Aqui você pode fazer o que for necessário com os dados recebidos
            window.location.href = '../../pages/dashboard/dashboard.html';
        }else{
            resultDiv.innerText = dadosResposta.conteudoJson.message;
        }
    

    } catch (error) {
        console.error('Erro ao fazer requisição:', error);
        resultDiv.innerText = "Erro ao fazer login";
    } finally {
        // Esconde o preloader, independentemente de ter ocorrido um erro ou não
        preloaderLogin.style.display = 'none';
    }
}
=======
document.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('loginForm');
    const preloaderLogin = document.getElementById('preloaderLogin');
    const inputEmailLoginAdm = document.getElementById('InputEmailAdm');
    const inputPasswordLoginAdm = document.getElementById('InputSenhaAdm');
    const resultDiv = document.getElementById('msg-login');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        checkRecaptcha(); // Verifica o reCAPTCHA antes de prosseguir com o login
    });

    async function checkRecaptcha() {
        const token = grecaptcha.getResponse();
        if (!token) {
            resultDiv.innerText = "Por favor, confirme que você não é um robô.";
            return; // Impede o envio do formulário se o reCAPTCHA não estiver validado
        }

        await checkLogin();
    }

    async function checkLogin() {
        // Mostra o preloader
        preloaderLogin.style.display = 'flex';

        var email = inputEmailLoginAdm.value;
        var password = inputPasswordLoginAdm.value;

        const url = 'https://apigym-fourdevs.vercel.app/adm/login';
        const dadosParaEnviar = {
            email: email,
            senha: password,
            key: "3f7e9b8d4c1a2e5b7f6a8c3d9e1b7a2c"
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
                var nome_academia = dadosResposta.conteudoJson.usuario.nome_academia;

                // Armazena os dados no localStorage
                localStorage.setItem('tokenAdm', tokenAdm);
                localStorage.setItem('nomeAdm', nomeAdm);
                localStorage.setItem('id_Adm', id_Adm);
                localStorage.setItem('nome_academia', nome_academia);
                
                // Redireciona para o dashboard
                window.location.href = '../../pages/dashboard/dashboard.html';
            } else {
                resultDiv.innerText = dadosResposta.conteudoJson.message;
            }
        } catch (error) {
            console.error('Erro ao fazer requisição:', error);
            resultDiv.innerText = "Erro ao fazer login";
        } finally {
            // Esconde o preloader, independentemente de ter ocorrido um erro ou não
            preloaderLogin.style.display = 'none';
        }
    }
});
>>>>>>> wilkenio
