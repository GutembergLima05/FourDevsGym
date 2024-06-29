document.addEventListener('DOMContentLoaded', async function () {

    await showNotices();
    document.querySelectorAll(".fa-pen-to-square").forEach((icon) => {
        icon.addEventListener("click", (event) => {
            const pElement = icon.previousElementSibling;
            const text = pElement.textContent;

            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.value = text;

            pElement.replaceWith(inputElement);
            inputElement.focus();

            inputElement.addEventListener("blur", async () => {
                const newText = inputElement.value;
                const newPElement = document.createElement("p");
                newPElement.textContent = newText;

                inputElement.replaceWith(newPElement);
                let id_aviso = event.target.closest(".avisos-div").getAttribute("id_aviso");
                let titulo_aviso = event.target.closest(".avisos-div").childNodes[3].childNodes[1].childNodes[1].textContent;
                let descricao_aviso = event.target.closest(".avisos-div").childNodes[3].childNodes[3].childNodes[1].textContent;
                
                let expiracao_aviso = (await readNotice(id_aviso)).data_expiracao;
                let [dataParte, horaParte] = expiracao_aviso.split(' ');
                let [dia, mes, ano] = dataParte.split('/');
                let dataFormatada = `${ano}-${mes}-${dia}T${horaParte}`;

                let data = {
                    "titulo": titulo_aviso,
                    "descricao": descricao_aviso,
                    "data_expiracao": dataFormatada,
                    "id_academia": 1
                }
                console.log(data)

                await updateNotice(id_aviso, data)
            });

        });
    });

    document.querySelectorAll(".fa-trash-can").forEach((trash) => {
        trash.addEventListener("click", async () => {
            let id_aviso = trash.parentNode.parentNode.getAttribute("id_aviso")
            await deleteNotice(id_aviso);
            trash.parentNode.parentNode.remove();
        })
    })
});
