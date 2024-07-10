<<<<<<< HEAD
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9hZG0iOjEwLCJlbWFpbCI6InJlY2VwY2lvbmlzdGFAZ21haWwuY29tIiwibm9tZSI6Ikplc3NpY2EiLCJjYXJnbyI6InBlcnNvbmFsIiwiaWRfYWNhZGVtaWEiOjEsImRhdGFfY3JpYWNhbyI6IjI3LzA2LzIwMjQgMjE6MDA6MDAiLCJkYXRhX2F0dWFsaXphY2FvIjoiMjgvMDYvMjAyNCAwOTozNToyNSIsIm5vbWVfYWNhZGVtaWEiOiJTb2FyZXMgRml0IiwiaWF0IjoxNzE5NjE3MDk2LCJleHAiOjE3MjAyMjE4OTZ9.QxljkMD7VUIci6GQgvbbHaZkkbF4T-BaKBh2L73rTwA";
=======
const token = localStorage.getItem('tokenAdm');
>>>>>>> wilkenio
const lista_planos = document.getElementById("planos-lista");
const URLPlans = "https://apigym-fourdevs.vercel.app/plan";

async function readPlans() {
    try {
        const response = await fetch(`${URLPlans}`, {
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

async function showPlans() {
    const noticesArray = await readPlans();
    let plano_element;
    noticesArray.forEach(element => {
        plano_element = `
                <div class="plano-formato" id_plano="${element.id_plano}">
                    <div class="plano-edit-remove">
                        <h4>Plano ${element.tipo}</h4>
                        <div class="div-edit-remove">
                            <a class="edit-button" href="../planosForm/planosForm.html"><i class="fa-solid fa-pen-to-square"
                                    style="color: #ffffff;"></i></a>
                            <div><i class="fa-solid fa-x" style="color: var(--cor-1);"></i></div>
                        </div>
                    </div>
                    <div class="plano-valor-quantidade">
                        <div class="div-valor-plano">
                            <h1>${element.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
                        </div>
                        <div class="div-plano-ativo">
                            <h1>60</h1>
                            <h3>Planos ativos</h3>
                        </div>
                    </div>
                </div>`;
        lista_planos.innerHTML += plano_element;

    });
}

async function deletePlan(id) {
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + `${token}`,
            },
        });
        const result = await response.json();
        console.log("Plano apagado (RESULT): ", await result)
    } catch (error) {
        console.error("Erro:", error);
    }
}

async function postPlan(data) {
    try {
        const response = await fetch(`${URLPlans}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Plano enviado (RESULT): ", await result)
    } catch (error) {
        console.error("Error:", error);
    }
}

async function updatePlan(id, data) {
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer" + ` ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        console.log("Plano atualizado (RESULT): ", await result)
    } catch (error) {
        console.error("Error:", error);
    }
}

async function readPlan(id){
    try {
        const response = await fetch(`${URLPlans}/${id}`, {
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