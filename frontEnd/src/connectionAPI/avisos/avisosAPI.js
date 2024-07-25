const token = localStorage.getItem('tokenAdm');
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
                        <i class="fa-solid fa-trash-can"></i>
                    </div>
                    <div>
                        <div class="text-edit">
                            <p class="tituloAviso">${element.titulo}</p>
                            <i class="fa-solid fa-pen-to-square" style="color: #fa6b14;"></i>
                        </div>
                        <div class="text-edit">
                            <p class="descricaoAviso">${element.descricao}</p>
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