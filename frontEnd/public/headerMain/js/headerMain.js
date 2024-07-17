async function loadGlobalHead() {
    try {
        const response = await fetch('../../public/headerMain/headerMain.html');
        if (response.ok) {
            const text = await response.text();
            document.head.innerHTML += text;

            // Agora que o conteúdo headerMain.html está carregado, vamos definir o título
            setTitle();

            // Verificar o cargoAdm após carregar o header
            checkAdminRole();
        } else {
            console.error('Failed to load global head:', response.statusText);
        }
    } catch (error) {
        console.error('Error loading global head:', error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function setTitle() {
    // Pegando o elemento title do head global
    var titlePage = document.getElementById('title-page');

    // Obtém o caminho completo da URL da página atual
    const caminhoURL = window.location.pathname;

    // Obtém apenas o nome do arquivo da URL
    const nomeArquivo = caminhoURL.split('/').pop().split('.')[0];

    // Capitaliza a primeira letra do nome do arquivo
    const nomeArquivoCapitalizado = capitalizeFirstLetter(nomeArquivo);

    // Exibe o nome do administrador salvo no localStorage ao carregar a página
    var nomeAcademia = localStorage.getItem('nome_academia');

    if (nomeAcademia && titlePage && nomeArquivoCapitalizado) {
        titlePage.innerText = `${nomeArquivoCapitalizado + " - "} ${nomeAcademia}`;
    }
}

function checkAdminRole() {
    // Verificar cargoAdm no localStorage
    var cargoAdm = localStorage.getItem('cargoAdm');

    if (cargoAdm === 'recepcionista' || cargoAdm === 'personal') {
        // Esconder do menu e bloquear acesso às páginas T e V
        setTimeout(function() {
        var ItemMenuFinancas = document.querySelector('#item-menu-finanças');
        if (ItemMenuFinancas) {
            ItemMenuFinancas.style.display = "none"
        }
    }, 1000); 

        //Parte de url
        const caminhoURL = window.location.pathname;
    
        const nomeArquivo = caminhoURL.split('/').pop().split('.')[0];

        if (nomeArquivo === "financas") {
            // Redirecionar para a URL desejada
            history.back()
        }
    }


     if (cargoAdm === 'recepcionista' || cargoAdm === 'personal') {
        // Esconder do menu e bloquear acesso às páginas T e V
        setTimeout(function() {
        var ItemMenuFinancas = document.querySelector('#item-menu-finanças');
        if (ItemMenuFinancas) {
            ItemMenuFinancas.style.display = "none"
        }
    }, 1000); 

        //Parte de url
        const caminhoURL = window.location.pathname;
    
        const nomeArquivo = caminhoURL.split('/').pop().split('.')[0];

        if (nomeArquivo === "financas") {
            // Redirecionar para a URL desejada
            history.back()
        }
    }
}

document.addEventListener('DOMContentLoaded', loadGlobalHead);
