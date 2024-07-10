document.addEventListener('DOMContentLoaded', () => {
    const eyeMostrar = document.getElementById('eyeMostrar');
    const eyeOcultar = document.getElementById('eyeOcultar');
    const totalEntrada = document.getElementById('totalEntrada');
    const textValorPadrao = "---";
    totalEntrada.innerText = textValorPadrao;

    eyeMostrar.addEventListener('click', toggleEye);
    eyeOcultar.addEventListener('click', toggleEye);

    function toggleEye() {
        const isMostrar = this.id === 'eyeMostrar';
        totalEntrada.innerText = isMostrar ? "Valor" : textValorPadrao;
        eyeMostrar.style.display = isMostrar ? 'none' : 'block';
        eyeOcultar.style.display = isMostrar ? 'block' : 'none';
    }
});
