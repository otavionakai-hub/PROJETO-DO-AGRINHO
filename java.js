// --- SISTEMA INTEGRADO: CONTADOR + ECO-METRICAS ---
let sementesTotais = 0;
let litrosAgua = 0;
let areaSolo = 0;
let carbonoSalvo = 0;

function rodarPlantio() {
    let blocoSementes = Math.floor(Math.random() * 12) + 5; 
    sementesTotais += blocoSementes;
    
    // Cálculos do impacto ambiental baseados nas sementes simuladas
    litrosAgua += blocoSementes * 1.5;
    areaSolo += blocoSementes * 0.2;
    carbonoSalvo += blocoSementes * 0.05;

    // Atualiza o display do contador com efeito visual
    const display = document.getElementById("numero-seeds");
    if (display) {
        display.innerText = String(sementesTotais).padStart(4, '0');
        display.classList.add("display-pulso");
        setTimeout(() => display.classList.remove("display-pulso"), 100);
    }

    // Atualiza os painéis ecológicos na tela
    const txtAgua = document.getElementById("eco-agua");
    const txtSolo = document.getElementById("eco-solo");
    const txtCo2 = document.getElementById("eco-co2");

    if (txtAgua) txtAgua.innerText = Math.floor(litrosAgua) + " L";
    if (txtSolo) txtSolo.innerText = areaSolo.toFixed(1) + " m²";
    if (txtCo2) txtCo2.innerText = carbonoSalvo.toFixed(2) + " kg";

    gerarRelatorioSustentavel();
}

function zerarContador() {
    sementesTotais = 0; 
    litrosAgua = 0; 
    areaSolo = 0; 
    carbonoSalvo = 0;
    
    const display = document.getElementById("numero-seeds");
    const txtAgua = document.getElementById("eco-agua");
    const txtSolo = document.getElementById("eco-solo");
    const txtCo2 = document.getElementById("eco-co2");
    const txtRelatorio = document.getElementById("dados-estimados");

    if (display) display.innerText = "0000";
    if (txtAgua) txtAgua.innerText = "0 L";
    if (txtSolo) txtSolo.innerText = "0 m²";
    if (txtCo2) txtCo2.innerText = "0.0 kg";
    if (txtRelatorio) txtRelatorio.innerHTML = "Sensores calibrados e prontos.";
}

function gerarRelatorioSustentavel() {
    const seletor = document.getElementById("tipo-cultura");
    const txtRelatorio = document.getElementById("dados-estimados");
    
    if (!seletor || !txtRelatorio) return;
    
    const cultura = seletor.value;
    let dica = "";
    
    if (cultura === "Soja") dica = "Densidade monitorada evita o esgotamento precoce de potássio no solo.";
    else if (cultura === "Milho") dica = "O espaçamento controlado por sensor reduz em até 15% a necessidade de irrigação pesada.";
    else if (cultura === "Trigo") dica = "Contagem rigorosa evita o excesso de sementes, diminuindo focos de fungos naturais.";
    else if (cultura === "Maracujá") dica = "Plantio otimizado ajuda a preservar as matas ciliares ao redor dos pomares.";
    else if (cultura === "Chuchu") dica = "O controle preciso evita o desperdício de água em lavouras suspensas.";
    else if (cultura === "Abobrinha") dica = "Garante que polinizadores (como abelhas) encontrem espaço ideal entre flores.";
    else if (cultura === "Mandioca") dica = "O monitoramento inteligente de manivas evita a compactação severa da terra.";

    txtRelatorio.innerHTML = `
        <strong>Análise Técnica do Cultivo:</strong> ${cultura} <br>
        <strong>Unidades Registradas:</strong> ${sementesTotais} <br>
        <small style="color: var(--verde-principal); font-weight: bold; display:block; margin-top: 10px;">
            🌱 Sustentabilidade Aplicada: ${dica}
        </small>
    `;
}

// --- SISTEMA DO QUIZ ---
const perguntas = [
    {
        pergunta: "Qual das alternativas abaixo ajuda a economizar água na agricultura?",
        opcoes: ["Irrigação por gotejamento", "Deixar a água correndo direto", "Regar nos horários mais quentes do dia"],
        correta: 0
    },
    {
        pergunta: "O que significa 'Agro Forte, Futuro Sustentável'?",
        opcoes: ["Produzir menos para não gastar a terra", "Produzir muito, usando tecnologia para proteger a natureza", "Focar apenas no lucro sem olhar para o meio ambiente"],
        correta: 1
    },
    {
        pergunta: "Para que servem os drones na agricultura de precisão?",
        opcoes: ["Apenas para tirar fotos bonitas da fazenda", "Para aplicar insumos na quantidade exata, evitando desperdícios", "Para espantar os pássaros da plantação"],
        correta: 1
    }
];

let perguntaAtual = 0; 
let pontuacao = 0; 
let respondendo = false;

function carregarPergunta() {
    const txtPergunta = document.getElementById("pergunta-texto");
    const containerOpcoes = document.getElementById("botoes-opcoes");
    const txtResultado = document.getElementById("resultado-quiz");

    if (!txtPergunta || !containerOpcoes || !txtResultado) return;

    if (perguntaAtual < perguntas.length) {
        respondendo = false;
        txtResultado.innerText = "";
        const dadosQuiz = perguntas[perguntaAtual];
        txtPergunta.innerText = dadosQuiz.pergunta;
        containerOpcoes.innerHTML = "";

        dadosQuiz.opcoes.forEach((opcao, index) => {
            const botao = document.createElement("button");
            botao.innerText = opcao;
            botao.classList.add("opcao-btn");
            botao.onclick = () => verificarResposta(botao, index);
            containerOpcoes.appendChild(botao);
        });
    } else {
        txtPergunta.innerText = "🏆 Avaliação Concluída!";
        containerOpcoes.innerHTML = "";
        txtResultado.innerText = `Pontuação ecológica: Você acertou ${pontuacao} de ${perguntas.length} desafios!`;
    }
}

function verificarResposta(botaoSelecionado, opcaoSelecionada) {
    if (respondendo) return;
    respondendo = true;
    
    const correta = perguntas[perguntaAtual].correta;
    const botoes = document.querySelectorAll(".opcao-btn");

    if (opcaoSelecionada === correta) {
        botaoSelecionado.classList.add("opcao-correta");
        pontuacao++;
    } else {
        botaoSelecionado.classList.add("opcao-errada");
        if (botoes[correta]) {
            botoes[correta].classList.add("opcao-correta");
        }
    }

    setTimeout(() => { 
        perguntaAtual++; 
        carregarPergunta(); 
    }, 1500);
}

// Inicializa os sistemas assim que a página carregar
window.onload = function() { 
    carregarPergunta(); 
    zerarContador(); 
};