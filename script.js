let listaAparelhos = [];
const TARIFA_KWH = 0.85;
let instanciaGrafico = null;

const botoesNavegacao = document.querySelectorAll('.btn-navegacao');
const telasPagina = document.querySelectorAll('.visualizacao-pagina');
const logoInicio = document.getElementById('marca-navegacao');
const botoesNavegacaoDireta = document.querySelectorAll('.navegacao-direta');

function mudarTela(idTelaAlvo) {
    telasPagina.forEach(tela => {
        tela.classList.remove('ativo');
        if (tela.id === idTelaAlvo) {
            tela.classList.add('ativo');
            
            void tela.offsetWidth;
        }
    });

    botoesNavegacao.forEach(botao => {
        botao.classList.remove('ativo');
        if (botao.getAttribute('data-alvo') === idTelaAlvo) {
            botao.classList.add('ativo');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

botoesNavegacao.forEach(botao => {
    botao.addEventListener('click', () => {
        const alvo = botao.getAttribute('data-alvo');
        mudarTela(alvo);
    });
});

botoesNavegacaoDireta.forEach(botao => {
    botao.addEventListener('click', () => {
        const alvo = botao.getAttribute('data-alvo');
        mudarTela(alvo);
    });
});

logoInicio.addEventListener('click', () => {
    mudarTela('pagina-inicio');
});

const formulario = document.getElementById('formulario-aparelho');
const corpoTabelaLista = document.getElementById('lista-aparelhos');
const elementoTotalKwh = document.getElementById('total-kwh');
const elementoTotalValor = document.getElementById('total-valor');
const elementoContador = document.getElementById('contador-aparelhos');
const contextoGrafico = document.getElementById('grafico-consumo').getContext('2d');

function calcularKwh(potencia, horas) {
    return (potencia * horas * 30) / 1000;
}

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function mostrarNotificacao(mensagem) {
    const recipienteNotificacao = document.getElementById('container-notificacoes');
    const notificacao = document.createElement('div');
    notificacao.className = 'notificacao';
    notificacao.innerText = mensagem;
    recipienteNotificacao.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'deslizarEntrada 0.25s ease-out reverse forwards';
        setTimeout(() => notificacao.remove(), 250);
    }, 3000);
}

function atualizarInterface() {
    corpoTabelaLista.innerHTML = '';
    let somaTotalKwh = 0;
    let consumoPorComodo = {};

    listaAparelhos.forEach((aparelho, indice) => {
        const consumoMensal = calcularKwh(aparelho.potencia, aparelho.horas);
        somaTotalKwh += consumoMensal;

        if (!consumoPorComodo[aparelho.comodo]) {
            consumoPorComodo[aparelho.comodo] = 0;
        }
        consumoPorComodo[aparelho.comodo] += consumoMensal;

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td><span class="etiqueta-comodo">${aparelho.comodo}</span></td>
            <td><strong>${aparelho.nome}</strong><br><small style="color: var(--texto-secundario)">${aparelho.potencia}W | ${aparelho.horas}h/dia</small></td>
            <td><strong>${consumoMensal.toFixed(2)} kWh</strong></td>
            <td><button class="btn-remover" onclick="removerAparelho(${indice})">Remover</button></td>
        `;
        corpoTabelaLista.appendChild(linha);
    });

    const custoTotal = somaTotalKwh * TARIFA_KWH;
    elementoTotalKwh.innerHTML = `${somaTotalKwh.toFixed(2)} <span>kWh</span>`;
    elementoTotalValor.innerText = formatarMoeda(custoTotal);
    elementoContador.innerText = `${listaAparelhos.length} ${listaAparelhos.length === 1 ? 'ativo' : 'ativos'}`;

    renderizarGrafico(consumoPorComodo);
}

function renderizarGrafico(dadosComodo) {
    const rotulos = Object.keys(dadosComodo);
    const dados = Object.values(dadosComodo);

    if (instanciaGrafico) {
        instanciaGrafico.destroy();
    }

    if (rotulos.length === 0) return;

    instanciaGrafico = new Chart(contextoGrafico, {
        type: 'doughnut',
        data: {
            labels: rotulos,
            datasets: [{
                data: dados,
                backgroundColor: [
                    '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '75%',
            animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1000,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: '#f8fafc',
                        font: { family: 'Inter', size: 12 }
                    }
                }
            }
        }
    });
}

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const comodo = document.getElementById('comodo').value;
    const nome = document.getElementById('nome').value;
    const potencia = parseFloat(document.getElementById('potencia').value);
    const horas = parseFloat(document.getElementById('horas').value);

    listaAparelhos.push({
        comodo: comodo,
        nome: nome,
        potencia: potencia,
        horas: horas
    });

    atualizarInterface();
    formulario.reset();
    document.getElementById('comodo').focus();
    
    mostrarNotificacao(`✓ ${nome} inserido com sucesso.`);
});

window.removerAparelho = function(indice) {
    const itemRemovido = listaAparelhos[indice].nome;
    listaAparelhos.splice(indice, 1);
    atualizarInterface();
    mostrarNotificacao(`✕ ${itemRemovido} removido.`);
};

atualizarInterface();