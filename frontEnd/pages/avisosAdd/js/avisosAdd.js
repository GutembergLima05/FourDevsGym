document.getElementById('file-input').addEventListener('change', function() {
    var fileName = this.files[0].name;
    document.getElementById('file-name').innerText = fileName;
  });

document.getElementById("form-add-aviso").addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log(document.getElementById("texto").value)
    console.log(document.getElementById("descricao").value)

})