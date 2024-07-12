document.addEventListener("DOMContentLoaded", function() {
    loadPreloader();
});

function loadPreloader() {
    fetch('../../src/components/preloader/preloader.html')
        .then(response => response.text())
        .then(data => {
            const preloaderContainer = document.createElement('div');
            preloaderContainer.innerHTML = data;
            document.body.appendChild(preloaderContainer);

            hidePreloader(); // Chama a função para esconder o preloader após carregar
        })
        .catch(error => {
            console.error('Erro ao carregar o preloader:', error);
            hidePreloader();
        });
}

function hidePreloader() {
    setTimeout(function () {
        document.querySelector('.contain-main').style.display = "flex";
        document.querySelector('#nav-contraida').style.display = "flex";
        let preloader = document.getElementById('contain-preLoader');
        if (preloader) {
            preloader.style.display = 'none';
        } else {
            console.error('Elemento do preloader não encontrado.');
        }
    }, 1000); // 1 segundo de simulação de carregamento
}
