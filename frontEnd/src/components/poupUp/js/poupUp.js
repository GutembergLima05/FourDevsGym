document.addEventListener("DOMContentLoaded", function () {
    loadPoupUp();
});

function loadPoupUp() {
    fetch('../../src/components/poupUp/poupUp.html')
        .then(response => response.text())
        .then(data => {

            document.querySelector('#confirmPopup').innerHTML = data;
            //document.body.appendChild(preloaderContainer);

            // hidePreloader(); // Chama a função para esconder o preloader após carregar
        })
        .catch(error => {
            console.error('Erro ao carregar o preloader:', error);

        });
}


// Função para abrir o popup
function openPopup(message, callback) {
    document.getElementById('popupMessage').innerHTML = message;
    document.getElementById('confirmPopup').style.display = 'flex';
    window.confirmCallback = callback;
}

// Função para fechar o popup
function closePopup() {
    document.querySelector('.popup-content').style.animation = 'ocultarPoupUp 0.5s';
    setTimeout(function () {
        document.getElementById('confirmPopup').style.display = 'none';
        document.querySelector('.popup-content').style.animation = 'mostarPoupUp 0.5s';
    }, 300);

    window.confirmCallback = null;
}

// Função para confirmar a ação
function confirmAction() {
    if (window.confirmCallback) {
        window.confirmCallback();
    }
    closePopup();
}
