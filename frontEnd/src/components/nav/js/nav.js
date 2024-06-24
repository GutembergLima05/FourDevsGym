
    // Elementos do DOM
    var buttonTheme = document.getElementById('buttonTheme');
    var IconthemeEscuro = document.getElementById('theme-escuro');
    var IconthemeClaro = document.getElementById('theme-claro');
    var body = document.body;

    // Verifica o tema salvo no localStorage ao carregar a página
    var temaSalvo = localStorage.getItem('tema');

    if (temaSalvo === 'dark') {
        aplicarTema('dark');
    } else {
        aplicarTema('light');
    }

    // Adiciona o evento de clique ao botão de tema
    buttonTheme.addEventListener("click", function() {
        theme();
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
            console.log("dark")
            body.classList.remove('red-background');
          
            body.classList.add('black-background');
            IconthemeEscuro.style.display = "none";
            IconthemeClaro.style.display = "block";
            localStorage.setItem('tema', 'dark'); // Salva o tema 'dark' no localStorage
        } else {
            console.log("light")
            body.classList.remove('black-background');
            body.classList.add('red-background');
            IconthemeEscuro.style.display = "block";
            IconthemeClaro.style.display = "none";
            localStorage.setItem('tema', 'light'); // Salva o tema 'light' no localStorage
        }
    }

