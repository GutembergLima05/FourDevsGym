document.querySelectorAll(".fa-pen-to-square").forEach((icon) => {
    icon.addEventListener("click", () => {
        const pElement = icon.previousElementSibling;
        const text = pElement.textContent;

        const inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = text;

        pElement.replaceWith(inputElement);
        inputElement.focus();

        inputElement.addEventListener("blur", () => {
            const newText = inputElement.value;
            const newPElement = document.createElement("p");
            newPElement.textContent = newText;

            inputElement.replaceWith(newPElement);
        });

    });
});

document.querySelectorAll(".fa-trash-can").forEach((trash) => {
    trash.addEventListener("click", () => {
        trash.closest(".img-icos").parentNode.remove();
    })
})