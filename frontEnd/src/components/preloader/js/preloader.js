
function loadPreloader() {
    fetch('../../src/components/preloader/preloader.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML += data;

            initializeNav();
            hidePreloader(); // Chama a função para esconder o preloader após carregar
        })
        .catch(error => console.error('Erro ao carregar o preloader:',  hidePreloader(), error));
}

function hidePreloader() {
    setTimeout(function() {
        var preloader = document.getElementById('contain-preLoader');
        if (preloader) {
            preloader.style.display = 'none';
        } else {
            console.error('Elemento do preloader não encontrado.');
        }
    }, 1000); // 1 segundo de simulação de carregamento
}


    document.addEventListener("DOMContentLoaded", function() {
        loadPreloader();
    });