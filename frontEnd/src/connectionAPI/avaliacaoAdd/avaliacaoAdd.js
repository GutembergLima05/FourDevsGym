document.querySelector('#back').addEventListener('click', (event) => {
    window.history.back();
});

//pegando nome do aluno do localstorage da pagina alunoEdit
const aluno = JSON.parse(localStorage.getItem('alunoData'));
document.querySelector('.nome-aluno').innerText=aluno.nome

document.getElementById('dados-avaliacao').addEventListener('submit', async function (event) {
    event.preventDefault();

    const idAluno = parseInt(new URLSearchParams(window.location.search).get('idAluno'));

    // Verifica se todos os campos estão preenchidos
    const formElements = document.getElementById('dados-avaliacao').elements;
    let allFieldsFilled = true;
    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].tagName === 'INPUT' && formElements[i].type !== 'hidden' && formElements[i].value.trim() === '') {
            allFieldsFilled = false;
            break;
        }
    }

    if (!allFieldsFilled) {
        mostrarAlerta('Por favor, preencha todos os campos antes de enviar a avaliação.',5000);
        return;
    }

    const avaliacaoData = {
        braco_direito_contraido: parseFloat(document.getElementById('braco_direito_contraido').value),
        braco_direito_relaxado: parseFloat(document.getElementById('braco_direito_relaxado').value),
        braco_esquerdo_contraido: parseFloat(document.getElementById('braco_esquerdo_contraido').value),
        braco_esquerdo_relaxado: parseFloat(document.getElementById('braco_esquerdo_relaxado').value),
        agua_corporal: parseFloat(document.getElementById('agua_corporal').value),
        torax: parseFloat(document.getElementById('torax').value),
        altura: parseFloat(document.getElementById('altura').value),
        peso: parseFloat(document.getElementById('peso').value),
        gordura_visceral: parseFloat(document.getElementById('gordura_visceral').value),
        massa_ossea: parseFloat(document.getElementById('massa_ossea').value),
        cintura: parseFloat(document.getElementById('cintura').value),
        abdomen: parseFloat(document.getElementById('abdomen').value),
        quadril: parseFloat(document.getElementById('quadril').value),
        coxa_direita: parseFloat(document.getElementById('coxa_direita').value),
        coxa_esquerda: parseFloat(document.getElementById('coxa_esquerda').value),
        antebraco_direito: parseFloat(document.getElementById('antebraco_direito').value),
        panturrilha_direita: parseFloat(document.getElementById('panturrilha_direita').value),
        panturrilha_esquerda: parseFloat(document.getElementById('panturrilha_esquerda').value),
        antebraco_esquerdo: parseFloat(document.getElementById('antebraco_esquerdo').value),
        obj: document.getElementById('obj').value,
        idademeta: parseFloat(document.getElementById('idadeMeta').value),
        rcq: parseFloat(document.getElementById('rcq').value),
        tmb: parseFloat(document.getElementById('tmb').value),
        id_administrador: 1, // Id do administrador
        id_aluno: idAluno // Id do aluno
    };

    const tokenAdm = localStorage.getItem('tokenAdm');

    try {
        const response = await fetch('https://apigym-fourdevs.vercel.app/evaluation/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenAdm}`
            },
            body: JSON.stringify(avaliacaoData)
        });

        if (response.ok) {
            const result = await response.json();
            mostrarAlerta('Avaliação realizada com sucesso!', 5000);
            window.history.back();
            console.log(result);
        } else {
            mostrarAlerta('Erro ao realizar avaliação!',5000);
            console.error('Erro:', response.statusText);
        }
    } catch (error) {
        mostrarAlerta('Erro ao realizar avaliação!',5000);
        console.error('Erro:', error);
    }
});
