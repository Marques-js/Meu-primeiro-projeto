let ListadeNumerossorteados = [];
let numeroLimite = 15; // Defina o limite aqui (10 ou 100)
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}

// Inicia o texto do jogo assim que abre a página
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        
        // Ativa o botão de novo jogo
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++; 
        limparCampo(); 
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = ListadeNumerossorteados.length;

    // Se a lista encher, limpamos para poder sortear de novo
    if (quantidadeDeElementosNaLista == numeroLimite) {
        ListadeNumerossorteados = [];
    }

    if (ListadeNumerossorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); // Recursão: tenta de novo
    } else {
        ListadeNumerossorteados.push(numeroEscolhido);
        console.log(ListadeNumerossorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let campo = document.querySelector('input');
    campo.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    // Desativa o botão de reiniciar até o próximo acerto
    document.getElementById('reiniciar').setAttribute('disabled', true);
}