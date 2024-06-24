function loadPreloader() {
    fetch('../../src/components/preloader/preloader.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-contraida').innerHTML += data;
            initializeNav();
            hidePreloader(); // Chama a função para esconder o preloader após carregar
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

function hidePreloader() {
    var preLoaderElement = document.getElementById('contain-preLoader');
    if (preLoaderElement) {
        preLoaderElement.style.display = 'none';
    } else {
        console.error('Elemento com id "contain-preLoader" não encontrado.');
    }
}

    loadPreloader();

    document.addEventListener("DOMContentLoaded", function() {
        // Simula o carregamento da página
        setTimeout(function() {
            var preloader = document.getElementById('contain-preLoader');
            preloader.style.display = 'none';

        }, 1000); // 1 segundos de simulação de carregamento
    });