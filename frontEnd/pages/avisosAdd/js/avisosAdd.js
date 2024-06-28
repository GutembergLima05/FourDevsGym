// document.getElementById('file-input').addEventListener('change', function () {
//   var fileName = this.files[0].name;
//   document.getElementById('file-name').innerText = fileName;
// });

document.getElementById("form-add-aviso").addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(document.getElementById("texto").value)
  console.log(document.getElementById("descricao").value)
  window.location.href = "../avisos/avisos.html";
})

let imgEle = document.querySelector("#img-form");
let imgInp = document.querySelector("#file-input");

imgInp.addEventListener("change", (event) => {

  if (!(event.target && event.target.files && event.target.files.length > 0)) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function () {
    imgEle.src = reader.result;
  }

  reader.readAsDataURL(event.target.files[0]);

})