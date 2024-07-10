document.addEventListener("DOMContentLoaded", async () => {
    await showPlans();

    document.getElementById("add-button").addEventListener("click", () => {
        sessionStorage.setItem("actionForm", "add");
    })

    Array.from(document.getElementsByClassName("edit-button")).forEach(element => {
        element.addEventListener("click", (event) => {
            let id_plano = event.target.closest(".plano-formato").getAttribute("id_plano");
            sessionStorage.setItem("actionForm", "edit");
            sessionStorage.setItem("id_plano", id_plano);
        })
    });

    Array.from(document.getElementsByClassName("fa-x")).forEach(element => {
        element.addEventListener("click", async (event) => {
            let id_plano = event.target.closest(".plano-formato").getAttribute("id_plano");
            openPopup("Deseja excluir o plano?", async function (){
                await deletePlan(id_plano);
                event.target.closest(".plano-formato").remove();
                mostrarAlerta("Plano apagado", 2000);
            });
    })
});
})
