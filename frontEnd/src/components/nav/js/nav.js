function loadNav() {
    fetch('../../src/components/nav/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-contraida').innerHTML += data;
            initializeNav()
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

// Chame a função para carregar o cabeçalho
document.addEventListener("DOMContentLoaded", function () {
    loadNav();
});

function initializeNav() {
    // Declarando variáveis
    let buttonTheme = document.getElementById('buttonTheme');
    let IconthemeEscuro = document.getElementById('theme-escuro');
    let IconthemeClaro = document.getElementById('theme-claro');
    let body = document.body;
    let IconHabur = document.getElementById('sgv-hambur');
    let IconClosed = document.getElementById('sgv-closed');
    let MenuFooter = document.getElementById('menu-footer');
    let nomeAdm = document.getElementById('nomeAdm');
    let produtosNotificationMenu = document.getElementById('produtosNotificationMenu');
    let TextMenus = document.querySelectorAll('.text-menu'); // Modificado para adicionar o ponto antes do nome da classe
    let nav = document.querySelector('nav');
    let containSecondary = document.querySelector('.contain-secondary');
    let navContraida = document.querySelector('.nav-contraida');
    let navUlLis = document.querySelectorAll('nav ul li'); // Modificado para querySelectorAll

    // Verifica o tema salvo no localStorage ao carregar a página
    let temaSalvo = localStorage.getItem('tema');
    let situacaoMenu = "aberto";
    let situacaoMenuMobile = "fechado";

    if (temaSalvo === 'dark') {
        aplicarTema('dark');
    } else {
        aplicarTema('light');
    }

    // Exibe o nome do administrador salvo no localStorage ao carregar a página
    let nomeAdministrador = localStorage.getItem('nomeAdm');
    if (nomeAdministrador && nomeAdm !== null) {
        nomeAdm.innerText = nomeAdministrador;
        // console.log(nomeAdm)
    }

    // Adiciona o evento de clique ao botão de tema
    if (buttonTheme !== null) {
        buttonTheme.addEventListener("click", function () {
            theme();
        });
    }

    // Adiciona o evento de clique ao botão de de 
    if (IconHabur !== null) {
        IconHabur.addEventListener("click", function () {
            menu();
        });
    }

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
        if (IconthemeClaro !== null && IconthemeEscuro !== null) {
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
                    containSecondary.style.width = "88%"
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
                containSecondary.style.width = "74%"
                situacaoMenu = "aberto";

            }
        } else {
            //menu mobile
            if (situacaoMenuMobile === "fechado") {
                nav.style.height = "100vh"
                nav.style.overflow = "overlay"
                situacaoMenuMobile = "aberto"
            } else {
                nav.style.height = "19vw"
                situacaoMenuMobile = "fechado"
                nav.style.overflow = "hidden"
            }

        }
    }
}


