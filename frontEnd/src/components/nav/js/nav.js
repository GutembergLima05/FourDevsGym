
document.addEventListener('DOMContentLoaded', function() {
    fetch('../../src/components/nav/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
            initializeNav(); // Chama a função de inicialização após inserir o conteúdo
        })
        .catch(error => console.error('Error loading nav:', error));
});

console.log("oiiii")

function initializeNav() {
    // Declarando variáveis
    var buttonTheme = document.getElementById('buttonTheme');
    var IconthemeEscuro = document.getElementById('theme-escuro');
    var IconthemeClaro = document.getElementById('theme-claro');
    var body = document.body;
    var IconHabur = document.getElementById('sgv-hambur');
    var IconClosed = document.getElementById('sgv-closed');
    var MenuFooter = document.getElementById('menu-footer');
    var nomeAdm = document.getElementById('nomeAdm');
    var produtosNotificationMenu = document.getElementById('produtosNotificationMenu');
    var TextMenus = document.querySelectorAll('.text-menu'); // Modificado para adicionar o ponto antes do nome da classe
    var nav = document.querySelector('nav');
    var navUl = document.querySelector('nav ul');
    var navContraida = document.querySelector('.nav-contraida');
    var navUlLis = document.querySelectorAll('nav ul li'); // Modificado para querySelectorAll

    // Verifica o tema salvo no localStorage ao carregar a página
    var temaSalvo = localStorage.getItem('tema');
    var situacaoMenu = "aberto";
    var situacaoMenuMobile ="fechado";

    if (temaSalvo === 'dark') {
        aplicarTema('dark');
    } else {
        aplicarTema('light');
    }

    // Exibe o nome do administrador salvo no localStorage ao carregar a página
    var nomeAdministrador = localStorage.getItem('nomeAdm');
    if (nomeAdministrador) {
        nomeAdm.textContent = nomeAdministrador;
    }

    // Adiciona o evento de clique ao botão de tema
    buttonTheme.addEventListener("click", function () {
        theme();
    });

    // Adiciona o evento de clique ao botão de de 
    IconHabur.addEventListener("click", function () {
        menu();
    });

    // Função para alternar entre os temas
    function theme() {
        if (body.classList.contains('black-background')) {
            aplicarTema('light');
        } else {
            aplicarTema('dark');
        }
    }

    // Função para aplicar o tema e atualizar o localStorage
    function aplicarTema(tipoTema) {
        if (tipoTema === 'dark') {
            //console.log("dark")
            body.classList.remove('red-background');
            body.classList.add('black-background');
            IconthemeEscuro.style.display = "none";
            IconthemeClaro.style.display = "block";
            localStorage.setItem('tema', 'dark'); // Salva o tema 'dark' no localStorage
        } else {
            //console.log("light")
            body.classList.remove('black-background');
            body.classList.add('red-background');
            IconthemeEscuro.style.display = "block";
            IconthemeClaro.style.display = "none";
            localStorage.setItem('tema', 'light'); // Salva o tema 'light' no localStorage
        }
    }

    function menu() {
        if (window.screen.availWidth > 800) {
            if (situacaoMenu === "aberto") {

                //jogando a nav para esquerda
                nav.style.left = "-14%";

                setTimeout(() => {
                    //Ocultar texto do menu
                    TextMenus.forEach(function (TextMenu) {
                        TextMenu.classList.add('text-menu-ocultar');
                        TextMenu.style.display = "none";
                    });
                    //colocando o menuFooter na vertical
                    MenuFooter.classList.add('vertical-menu-footer');
                    //Alinhando notificação dos produtos
                    produtosNotificationMenu.classList.add('produtosNotificationMenuAlinhar');

                    //mudando a ordem dos icones e textos do menu
                    navUlLis.forEach(function (navUlLi) {
                        navUlLi.style.justifyContent = "end";
                        navUlLi.style.flexDirection = "row-reverse";
                    });
                    nomeAdm.classList.add('nome-adm-ocultar');
                    situacaoMenu = "fechado";
                }, 300);
            } else {

                //Ocultar texto do menu
                TextMenus.forEach(function (TextMenu) {
                    TextMenu.classList.remove('text-menu-ocultar');
                    TextMenu.style.display = "block";
                });
                //colocando o menuFooter na vertical
                MenuFooter.classList.remove('vertical-menu-footer');
                //Alinhando notificação dos produtos
                produtosNotificationMenu.classList.remove('produtosNotificationMenuAlinhar');
                //jogando a nav para esquerda
                nav.style.left = "0%";
                //mudando a ordem dos icones e textos do menu
                navUlLis.forEach(function (navUlLi) {
                    navUlLi.style.justifyContent = "start";
                    navUlLi.style.flexDirection = "row";
                });
                nomeAdm.classList.remove('nome-adm-ocultar');
                situacaoMenu = "aberto";

            }
        } else {
            if (situacaoMenuMobile === "fechado") {
                nav.style.height="100vh"
                situacaoMenuMobile="aberto"
            }else{
                 nav.style.height="19vw"
                   situacaoMenuMobile="fechado"
            }
        
        }
    }
}


