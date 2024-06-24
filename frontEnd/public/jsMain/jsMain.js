
//Obtém o caminho da URL da página atual
const pathname = window.location.pathname;
// Obtém o nome da página (última parte do caminho)
const pageName = pathname.substring(pathname.lastIndexOf('/') + 1);

function isLoginDone() {
    const tokenAdm = localStorage.getItem('tokenAdm');
    const nomeAdm = localStorage.getItem('nomeAdm');
    const id_Adm = localStorage.getItem('id_Adm');

    // Verifica se todas as variáveis de login estão presentes no localStorage
    if (tokenAdm && nomeAdm && id_Adm) {
        return true;
    } else {
        return false;
    }
}

if (!isLoginDone()) {
    // Código para quando o login não foi feito
    console.log('Usuário não está logado.');



    // Verifica o nome da página atual
    if (pageName !== 'login.html') {
        window.location.href = '../../pages/login/login.html';
    }
} else {
    if (pageName == 'login.html') {
        window.location.href = '../../pages/dashboard/dashboard.html';
    }
}

setInterval(isLoginDone, 1000);


function logout() {
    // Remove os itens do localStorage
    localStorage.removeItem('tokenAdm');
    localStorage.removeItem('nomeAdm');
    localStorage.removeItem('id_Adm');

    console.log('Logout realizado com sucesso.');

    // Redireciona para a página de login após o logout
    window.location.href = '../../pages/login/login.html';
}


