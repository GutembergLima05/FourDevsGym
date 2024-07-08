document.addEventListener('DOMContentLoaded', function () {
    var diasAdicionados = []; // Array para armazenar os dias adicionados

    // Função para adicionar um novo dia
    function addNewDay() {
        // Verifica se já atingiu o limite máximo de 7 dias
        if (diasAdicionados.length >= 7) {
            alert('Você atingiu o limite máximo de 7 dias.');
            return;
        }

        // Encontra o menor número de dia que ainda não foi adicionado
        var newDia = findNextDay();

        // Cria o elemento div com o número do dia
        var newDiv = createDayElement(newDia);

        // Adiciona o novo div dentro de #diaDivisoes, mantendo a ordem correta
        insertDayInOrder(newDiv);

        // Adiciona o dia ao array de dias adicionados
        diasAdicionados.push(newDia);

        // Remove o evento de clique para impedir múltiplas adições consecutivas após o sétimo dia
        if (diasAdicionados.length >= 7) {
            document.getElementById('addDivisoes').removeEventListener('click', addNewDay);
            document.getElementById('addDivisoes').style.display = "none";
        }
    }

    // Função para criar um novo elemento de dia com o número fornecido
    function createDayElement(dia) {
        var newDiv = document.createElement('div');
        newDiv.classList.add('containersDivisoes');
        newDiv.dataset.menuDia = dia;
        newDiv.textContent = 'Dia ' + dia; // Conteúdo do div com o número do dia

        // Adiciona evento de clique para o novo div de dia
        newDiv.addEventListener('click', function () {
            removeSelected();
            newDiv.classList.add("selected");
            showDayContent(dia);
        });

        return newDiv;
    }

    // Função para inserir um novo dia na ordem correta no menu
    function insertDayInOrder(newDiv) {
        var diaDivisoes = document.getElementById('diaDivisoes');
        var currentDivs = diaDivisoes.querySelectorAll('.containersDivisoes');

        // Encontra o ponto de inserção correto
        var insertIndex = 0;
        while (insertIndex < currentDivs.length && parseInt(currentDivs[insertIndex].dataset.menuDia) < parseInt(newDiv.dataset.menuDia)) {
            insertIndex++;
        }

        // Insere o novo div na posição correta
        if (insertIndex < currentDivs.length) {
            diaDivisoes.insertBefore(newDiv, currentDivs[insertIndex]);
        } else {
            diaDivisoes.appendChild(newDiv);
        }
    }

    document.getElementById('addDivisoes').addEventListener('click', addNewDay);

    var iconsTrash = document.querySelectorAll('.bi-trash-fill');
    iconsTrash.forEach(function (icon) {
        icon.addEventListener('click', function () {
            var diaToRemove = this.parentNode.parentNode;
            var Nmenu = diaToRemove.dataset.set;

            // Retira os exercicio apos ser excluido
            const elementosParaRemover = diaToRemove.querySelectorAll('.exercicio'); // Substitua 'suaClasse' pela classe específica
            // Remover cada elemento encontrado
            elementosParaRemover.forEach(elemento => {
                elemento.remove();
            });

            let elementos = document.querySelectorAll('[data-menu-dia="' + Nmenu + '"]');

            elementos.forEach(elemento => {
                elemento.style.display = "none";
                elemento.remove();
                document.getElementById('addDivisoes').style.display = "flex";
                // Remove o dia do array de dias adicionados
                var indexToRemove = diasAdicionados.indexOf(parseInt(Nmenu));
                if (indexToRemove !== -1) {
                    diasAdicionados.splice(indexToRemove, 1);
                }
            });

            diaToRemove.style.display = 'none';

            if (diasAdicionados.length < 7) {
                document.getElementById('addDivisoes').addEventListener('click', addNewDay);
                document.getElementById('addDivisoes').style.display = "flex";
            }
        });
    });

    // Função para encontrar o próximo dia disponível para adição
    function findNextDay() {
        for (var i = 1; i <= 7; i++) {
            if (!diasAdicionados.includes(i)) {
                return i;
            }
        }
        return 1; // Caso todos os dias tenham sido adicionados, retorna 1 como padrão
    }

    function showDayContent(dayNumber) {
        var diasCorrespondentes = document.getElementById('diasCorrespondentes').querySelectorAll('.dia');
        for (var i = 0; i < diasCorrespondentes.length; i++) {
            diasCorrespondentes[i].style.display = 'none';
        }

        var diaToShow = document.querySelector('.dia[data-set="' + dayNumber + '"]');
        if (diaToShow) {
            diaToShow.style.display = 'block';
        }
    }

    function removeSelected() {
        let divsDias = Array.from(document.querySelectorAll('.containersDivisoes'));
        divsDias.forEach(element => {
            element.classList.remove("selected");
        });
    }
});
