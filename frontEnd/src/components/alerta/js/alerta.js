document.addEventListener("DOMContentLoaded", function () {
    loadAlerta();
});

function loadAlerta() {
    fetch('../../src/components/alerta/alerta.html')
        .then(response => response.text())
        .then(data => {

            document.querySelector('#contain-alerta').innerHTML = data;
            //document.body.appendChild(preloaderContainer);

            // hidePreloader(); // Chama a função para esconder o preloader após carregar
        })
        .catch(error => {
            console.error('Erro ao carregar o preloader:', error);

        });
}


function mostrarAlerta(message, time){
    const alerta = document.getElementById('alerta')
    alerta.style.display="block"
    alerta.style.right="1%"
    alerta.innerText=message
    setTimeout(function() {
        fecharAlerta(alerta)
    }, time);
}

function fecharAlerta(alerta){
    alerta.style.right="-100%"
}

