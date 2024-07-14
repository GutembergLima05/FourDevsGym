function loadMenuTreino() {
    fetch('../../src/components/menuTreinos/menuTreinos.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-treino').innerHTML += data;
            //initializeNav()
        })
        .catch(error => console.error('Erro ao carregar o cabeçalho:', error));
}

// Chame a função para carregar o cabeçalho
document.addEventListener("DOMContentLoaded", function() {
    loadMenuTreino();
  });