document.addEventListener('DOMContentLoaded', () => {
    const diasAdicionados = [];
    const addDivisoes = document.getElementById('addDivisoes');
    const diaDivisoes = document.getElementById('diaDivisoes');
    const iconsTrash = document.querySelectorAll('.bi-trash-fill');

    const addNewDay = () => {
        if (diasAdicionados.length >= 7) return mostrarAlerta('Você atingiu o limite máximo de 7 dias.');

        const newDia = findNextDay();
        const newDiv = createDayElement(newDia);
        insertDayInOrder(newDiv);
        diasAdicionados.push(newDia);

        if (diasAdicionados.length >= 7) {
            addDivisoes.removeEventListener('click', addNewDay);
            addDivisoes.style.display = "none";
        }
    };

    const createDayElement = (dia) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('containersDivisoes');
        newDiv.dataset.menuDia = dia;
        newDiv.textContent = `Dia ${dia}`;
        newDiv.addEventListener('click', () => {
            removeSelected();
            newDiv.classList.add("selected");
            showDayContent(dia);
        });
        return newDiv;
    };

    const insertDayInOrder = (newDiv) => {
        const currentDivs = Array.from(diaDivisoes.querySelectorAll('.containersDivisoes'));
        const insertIndex = currentDivs.findIndex(div => parseInt(div.dataset.menuDia) > parseInt(newDiv.dataset.menuDia));
        insertIndex === -1 ? diaDivisoes.appendChild(newDiv) : diaDivisoes.insertBefore(newDiv, currentDivs[insertIndex]);
    };

    const findNextDay = () => {
        for (let i = 1; i <= 7; i++) {
            if (!diasAdicionados.includes(i)) return i;
        }
    };

    const showDayContent = (dayNumber) => {
        const diasCorrespondentes = document.getElementById('diasCorrespondentes').querySelectorAll('.dia');
        diasCorrespondentes.forEach(dia => dia.style.display = 'none');
        const diaToShow = document.querySelector(`.dia[data-set="${dayNumber}"]`);
        if (diaToShow) diaToShow.style.display = 'block';
    };

    const removeSelected = () => {
        document.querySelectorAll('.containersDivisoes').forEach(div => div.classList.remove("selected"));
    };

    addDivisoes.addEventListener('click', addNewDay);

    iconsTrash.forEach(icon => {
        icon.addEventListener('click', function () {
            const diaToRemove = this.closest('[data-set]');
            const Nmenu = diaToRemove.dataset.set;
            document.querySelectorAll(`[data-menu-dia="${Nmenu}"]`).forEach(elemento => {
                elemento.remove();
                document.getElementById('addDivisoes').style.display = "flex";
                const indexToRemove = diasAdicionados.indexOf(parseInt(Nmenu));
                if (indexToRemove !== -1) diasAdicionados.splice(indexToRemove, 1);
            });

            diaToRemove.style.display = 'none';

            if (diasAdicionados.length < 7) {
                addDivisoes.addEventListener('click', addNewDay);
                addDivisoes.style.display = "flex";
            }
        });
    });
});
