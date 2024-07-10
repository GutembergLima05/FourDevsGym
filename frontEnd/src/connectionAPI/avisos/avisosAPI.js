<<<<<<< HEAD
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG0iOjEwLCJlbWFpbCI6InJlY2VwY2lvbmlzdGFAZ21haWwuY29tIiwibm9tZSI6Ikplc3NpY2EiLCJjYXJnbyI6InBlcnNvbmFsIiwiaWRfYWNhZGVtaWEiOjEsImRhdGFfY3JpYWNhbyI6IjI3LzA2LzIwMjQgMjE6MDA6MDAiLCJkYXRhX2F0dWFsaXphY2FvIjoiMjgvMDYvMjAyNCAwOTozNToyNSIsIm5vbWVfYWNhZGVtaWEiOiJTb2FyZXMgRml0IiwiaWF0IjoxNzE5NjE3MDk2LCJleHAiOjE3MjAyMjE4OTZ9.QxljkMD7VUIci6GQgvbbHaZkkbF4T-BaKBh2L73rTwA";
=======
const token = localStorage.getItem('tokenAdm');
>>>>>>> wilkenio
const lista_avisos = document.getElementById("avisos-lista");
const URLNotice = "https://apigym-fourdevs.vercel.app/notice";

async function readNotices() {
    try {
        const response = await fetch(`${URLNotice}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
        });
        const result = await response.json();
        console.log(result.conteudoJson)
        return result.conteudoJson;
    } catch (error) {
        console.error("Error:", error);
    }
}

async function showNotices() {
    const noticesArray = await readNotices();
    let aviso_element;
    noticesArray.forEach(element => {
        aviso_element = `
                <div class="avisos-div" id_aviso="${element.id_aviso}">
                    <div class="img-icos">
                        <img src="../../public/assets/images/halteresLogin.gif" alt="imagem">
                        <i class="fa-solid fa-trash-can"></i>
                        <input id="file-notice" type="file">
                        <label for="file-notice"><i class="fa-solid fa-cloud-arrow-up" style="color: #ff6b14;"></i></label>
                    </div>
                    <div>
                        <div class="text-edit">
                            <p>${element.titulo}</p>
                            <i class="fa-solid fa-pen-to-square" style="color: #fa6b14;"></i>
                        </div>
                        <div class="text-edit">
                            <p>${element.descricao}</p>
                            <i class="fa-solid fa-pen-to-square" style="color: #fa6b14;"></i>
                        </div>
                    </div>
                </div>`;
        lista_avisos.innerHTML += aviso_element;

    });
}

async function deleteNotice(id) {
    try {
        const response = await fetch(`${URLNotice}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + `${token}`,
            },
        });
        const result = await response.json();
        console.log("Noticia apagada (RESULT): ", await result)
    } catch (error) {
        console.error("Erro:", error);
    }
}

async function postNotice(data) {
    try {
        const response = await fetch(`${URLNotice}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Aviso enviado (RESULT): ", await result)
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updateNotice(id, data) {
    try {
        const response = await fetch(`${URLNotice}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Aviso atualizado (RESULT): ", await result)
    } catch (error) {
        console.error("Error:", error);
    }
}

async function readNotice(id){
    try {
        const response = await fetch(`${URLNotice}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
        });
        const result = await response.json();
        return result.conteudoJson;
    } catch (error) {
        console.error("Error:", error);
    }
}