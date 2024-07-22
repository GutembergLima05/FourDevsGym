document.addEventListener('DOMContentLoaded', () => {
    // Função para fazer a requisição à API
    async function fetchFinancas() {
        const tokenAdm = localStorage.getItem('tokenAdm');
        const url = 'https://apigym-fourdevs.vercel.app/finance';

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${tokenAdm}`
                }
            });
            const data = await response.json();
            if (data.success) {
                return data.conteudoJson;
            } else {
                console.error('Erro na resposta da API:', data);
                return [];
            }
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            return [];
        }
    }

    // Função para exibir os dados financeiros
    function exibirFinancas(financas) {
        extratoGeral.innerHTML = '';

        const financasAgrupadasPorData = financas.reduce((acc, financa) => {
            const data = financa.data_ocorrida;
            if (!acc[data]) {
                acc[data] = [];
            }
            acc[data].push(financa);
            return acc;
        }, {});

        Object.keys(financasAgrupadasPorData).forEach(data => {
            const dataDiv = document.createElement('div');
            dataDiv.classList.add('dataDia');

            const diaDiv = document.createElement('div');
            diaDiv.classList.add('dia');
            diaDiv.textContent = formatarData(data);

            dataDiv.appendChild(diaDiv);

            const extratoDiaDiv = document.createElement('div');
            extratoDiaDiv.classList.add('extratoDia');

            financasAgrupadasPorData[data].forEach(financa => {
                const extrato = document.createElement('div');
                extrato.classList.add('extrato');

                const item = document.createElement('div');
                item.classList.add('item');
                item.textContent = financa.item;

                const cliente = document.createElement('div');
                cliente.classList.add('cliente');
                cliente.textContent = financa.cliente;

                const valorPago = document.createElement('div');
                valorPago.classList.add('valorPago');
                valorPago.textContent = financa.valor_pago;

                extrato.appendChild(item);
                extrato.appendChild(cliente);
                extrato.appendChild(valorPago);
                extratoDiaDiv.appendChild(extrato);
            });

            const extratoGeralItem = document.createElement('div');
            extratoGeralItem.classList.add('extratoCard');
            extratoGeralItem.appendChild(dataDiv);
            extratoGeralItem.appendChild(extratoDiaDiv);

            extratoGeral.appendChild(extratoGeralItem);
        });
    }

    // Função para formatar a data
    function formatarData(data) {
        const [dia, mes, ano] = data.split('/');
        return `${dia} de ${meses[parseInt(mes, 10) - 1]}`;
    }

    async function filtrarFinancas() {
        const mesSelecionado = selectMes.value;
        const anoSelecionado = selectAno.value;

        const financas = await fetchFinancas();

        const financasFiltradas = financas.filter(financa => {
            const [dia, mes, ano] = financa.data_ocorrida.split('/');
            return mes === mesSelecionado && ano === anoSelecionado;
        });

        // Calcular o total dos valores pagos para o mês selecionado
        const totalValorPago = financasFiltradas.reduce((total, financa) => {
            return total + parseFloat(financa.valor_pago);
        }, 0);
        const valorMesAtual = totalValorPago.toFixed(2);

        // Obter o total do mês anterior
        const totalMesAnterior = obterTotalMesAnterior(mesSelecionado, anoSelecionado, financas);

        // Exibir o total do mês atual
        totalEntrada.innerText = valorMesAtual;

        // Atualizar análise com comparação
        const analise = document.getElementById('analise');
        const diferenca = (totalValorPago - parseFloat(totalMesAnterior)).toFixed(2);
        analise.textContent = ` Em relação ao mês anterior: R$ ${diferenca}`;
        analise.className = diferenca >= 0 ? 'analisePositiva' : 'analiseNegativa';

        // Exibir finanças
        exibirFinancas(financasFiltradas);
    }

    function obterTotalMesAnterior(mesAtual, anoAtual, financas) {
        // Ajuste para o mês anterior e ano
        let mesAnterior = parseInt(mesAtual) - 1;
        let anoAnterior = parseInt(anoAtual);

        if (mesAnterior === 0) {
            mesAnterior = 12;
            anoAnterior -= 1;
        }

        mesAnterior = mesAnterior.toString().padStart(2, '0'); // Formatar para dois dígitos

        // Filtrar e calcular o total para o mês anterior
        const financasMesAnterior = financas.filter(financa => {
            const [dia, mes, ano] = financa.data_ocorrida.split('/');
            return mes === mesAnterior && ano === anoAnterior.toString();
        });

        const totalMesAnterior = financasMesAnterior.reduce((total, financa) => {
            return total + parseFloat(financa.valor_pago);
        }, 0);

        return totalMesAnterior.toFixed(2);
    }

    function preencherSelectMes() {
        const mesAtual = new Date().getMonth(); // Mês atual (0-11)

        meses.forEach((mes, index) => {
            const option = document.createElement('option');
            option.value = (index + 1).toString().padStart(2, '0');  // Formatar para dois dígitos
            option.textContent = mes;

            // Destacar o mês atual
            if (index === mesAtual) {
                option.selected = true;
            }

            selectMes.appendChild(option);
        });
    }

    function preencherSelectAno() {
        const anoAtual = new Date().getFullYear();
        for (let ano = anoAtual; ano <= anoAtual + 5; ano++) {
            const option = document.createElement('option');
            option.value = ano;
            option.textContent = ano;
            selectAno.appendChild(option);
        }
    }

    const eyeMostrar = document.getElementById('eyeMostrar');
    const eyeOcultar = document.getElementById('eyeOcultar');
    const totalEntrada = document.getElementById('totalEntrada');
    const textValorPadrao = "****";
    totalEntrada.innerText = textValorPadrao;

    eyeMostrar.addEventListener('click', toggleEye);
    eyeOcultar.addEventListener('click', toggleEye);

    function toggleEye() {
        const isMostrar = this.id === 'eyeOcultar';
        const totalEntrada = document.getElementById('totalEntrada'); // Seleciona o elemento totalEntrada
        const ValorOculto = document.getElementById('ValorOculto');
        const eyeMostrar = document.getElementById('eyeMostrar');
        const eyeOcultar = document.getElementById('eyeOcultar');

        totalEntrada.style.display = isMostrar ? 'block' : 'none'; // Ajusta a exibição de totalEntrada
        ValorOculto.style.display = isMostrar ? 'none' : 'block'; // Ajusta a exibição de totalEntrada
        eyeMostrar.style.display = isMostrar ? 'block' : 'none';
        eyeOcultar.style.display = isMostrar ? 'none' : 'block';
    }

    const selectMes = document.getElementById('selectMes');
    const selectAno = document.getElementById('selectAno');
    const extratoGeral = document.getElementById('extratoGeral');

    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    selectMes.addEventListener('change', filtrarFinancas);
    selectAno.addEventListener('change', filtrarFinancas);

    preencherSelectMes();
    preencherSelectAno();
    filtrarFinancas();
});

const impressora = document.querySelector('.bi-printer-fill')

impressora.addEventListener('click', printDiv);
function printDiv() {
    // Obtém todos os elementos que devem ser ocultados
    const elementsToHide = document.querySelectorAll('#nav-contraida');
    const analise = document.querySelector('#analise');

    // Oculta os elementos
    elementsToHide.forEach(element => {
        element.style.display = 'none';
    });

    totalEntrada.style.display = "block";
    ValorOculto.style.display = "none";
    analise.style.color = "black";
    document.querySelector('.contain-secondary').style.width = "100%";

    // Chama a função de impressão
    window.print();
    document.querySelector('.contain-secondary').style.width = "75%";
    analise.style.color = "white";
    totalEntrada.style.display = "none";
    ValorOculto.style.display = "block";

    // Restaura a exibição dos elementos
    elementsToHide.forEach(element => {
        element.style.display = '';
    });
}
