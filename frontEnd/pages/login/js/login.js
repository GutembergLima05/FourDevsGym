var inputPasswordLoginAdm = document.getElementById('InputSenhaAdm');
var inputEmailLoginAdm = document.getElementById('InputEmailAdm');
var buttonEnterAdm = document.getElementById('buttonEntrarAdm');
var resultDiv = document.getElementById('msg-login');
var sgvEyeOpen = document.getElementById('sgv-eye-open');
var sgvEyeClosed = document.getElementById('sgv-eye-closed');
var preloaderLogin = document.getElementById('preloaderLogin');

// Mostrar ou ocultar Senha
sgvEyeOpen.addEventListener("click", function() {
    ViewHidenEye();
});
sgvEyeClosed.addEventListener("click", function() {
    ViewHidenEye();
});

function ViewHidenEye(){
    if(inputPasswordLoginAdm.type === "password"){
        inputPasswordLoginAdm.type = "text";
        sgvEyeClosed.style.display = "block";
        sgvEyeOpen.style.display = "none";
    } else {
        inputPasswordLoginAdm.type = "password";
        sgvEyeClosed.style.display = "none";
        sgvEyeOpen.style.display = "block";
    }
}
