let form = document.getElementById("form-plano");
let tipo_plano = document.getElementById("tipo-plano");
let valor_plano = document.getElementById("valor-plano");

document.addEventListener("DOMContentLoaded", async () => {

    if (sessionStorage.getItem("actionForm") === "edit") {
        console.log("edit")
        let id_plano = sessionStorage.getItem("id_plano");
        let plan = await readPlan(id_plano)
        console.log(plan);
        tipo_plano.value = plan.tipo;
        valor_plano.value = plan.valor;
    }
})

document.getElementById("return-arrow").addEventListener("click", () => {
    if (sessionStorage.getItem("actionForm")) {
        sessionStorage.removeItem("actionForm");
    }

    if (sessionStorage.getItem("id_plano")) {
        sessionStorage.removeItem("id_plano");
    }
})



form.addEventListener("submit", async (event) => {
    event.preventDefault();
    let data = {
        "tipo": tipo_plano.value,
        "valor": valor_plano.value,
        "id_academia": 1
    }


    if (sessionStorage.getItem("actionForm") === "add") {
        await postPlan(data);
    } else {
        let id_plano = sessionStorage.getItem("id_plano");
        await updatePlan(id_plano, data);
    }

    window.location.href = "../planos/planos.html"
})