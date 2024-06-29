// document.getElementById('file-input').addEventListener('change', function () {
//   var fileName = this.files[0].name;
//   document.getElementById('file-name').innerText = fileName;
// });

document.getElementById("form-add-aviso").addEventListener("submit", async (event) => {
  event.preventDefault();
  let time = new Date();
  let titulo_aviso = document.getElementById("texto").value;
  let descricao_aviso = document.getElementById("descricao").value;
  let dias_aviso = Number(document.getElementById("days").value);
  let id_academia = "1";

  time.setDate(time.getDate() + dias_aviso);

  let ano = time.getFullYear();
  let mes = (time.getMonth() + 1).toString().padStart(2, '0');
  let dia = time.getDate().toString().padStart(2, '0');
  let horas = time.getHours().toString().padStart(2, '0');
  let minutos = time.getMinutes().toString().padStart(2, '0');
  let segundos = time.getSeconds().toString().padStart(2, '0');
  let data_formatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

  let data = {
    "titulo": titulo_aviso,
    "descricao": descricao_aviso,
    "data_expiracao": data_formatada,
    "id_academia": id_academia
  };

  console.log(data)

  await postNotice(data);
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