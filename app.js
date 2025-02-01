let listaDeAmigos = [];
let pessoasQueJaSortearam = []; // Lista de pessoas que já realizaram o sorteio
let amigosSorteados = []; // Lista de amigos que já foram sorteados
let sorteandoValidado = false;

function adicionarAmigo() {
    let amigo = document.getElementById("amigo").value.trim();

    if (amigo === '') {
        alert('Digite o nome do amigo!');
        return;
    }

    amigo = amigo.toLowerCase();

    if (listaDeAmigos.includes(amigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    listaDeAmigos.push(amigo);
    document.getElementById('amigo').value = '';
    atualizarListaDeAmigos();

    // Atualiza o estado do botão de sortear
    atualizarBotaoSortear();
}

function validarSorteando() {
    let nome = document.getElementById("sorteando").value.trim().toLowerCase();

    if (nome === '') {
        alert('Por favor, insira seu nome!');
        return;
    }

    if (!listaDeAmigos.includes(nome)) {
        alert('Você não está na lista de amigos!');
        return;
    }

    // Verifica se a pessoa já realizou um sorteio
    if (pessoasQueJaSortearam.includes(nome)) {
        alert('Você já realizou um sorteio!');
        return;
    }

    sorteandoValidado = true;
    alert('Nome validado! Agora você pode sortear.');

    // Atualiza o estado do botão de sortear
    atualizarBotaoSortear();
}

function sortearAmigo() {
    if (!sorteandoValidado) {
        alert('Por favor, valide seu nome antes de sortear!');
        return;
    }

    let sorteando = document.getElementById("sorteando").value.trim().toLowerCase();

    // Verifica se a pessoa já realizou um sorteio
    if (pessoasQueJaSortearam.includes(sorteando)) {
        alert('Você já realizou um sorteio!');
        return;
    }

    // Filtra a lista para remover o nome da pessoa que está sorteando
    let amigosDisponiveis = listaDeAmigos.filter(nome => nome !== sorteando);

    if (amigosDisponiveis.length === 0) {
        alert('Não há amigos disponíveis para sortear!');
        return;
    }

    // Sorteia um nome aleatório
    let amigoSorteado = amigosDisponiveis[Math.floor(Math.random() * amigosDisponiveis.length)];

    // Adiciona o nome do amigo sorteado à lista de amigos sorteados
    amigosSorteados.push(amigoSorteado);

    // Exibe o resultado
    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${capitalizar(amigoSorteado)}</p>`;

    // Animação (opcional)
    resultadoDiv.classList.add('animated');
    setTimeout(() => {
        resultadoDiv.classList.remove('animated');
    }, 500);

    // Botão para ocultar o resultado
    let hideButton = document.createElement('button');
    hideButton.innerText = 'Ocultar Resultado';
    hideButton.classList.add('hide-button');
    hideButton.onclick = function() {
        resultadoDiv.innerHTML = '';
    };
    resultadoDiv.appendChild(hideButton);

    // Adiciona o nome do sorteador à lista de pessoas que já sortearam
    pessoasQueJaSortearam.push(sorteando);

    // Limpa o campo "Seu nome" após o sorteio
    document.getElementById("sorteando").value = '';
    sorteandoValidado = false;

    // Atualiza o estado do botão de sortear
    atualizarBotaoSortear();
}

function atualizarListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    listaDeAmigos.forEach((amigo) => {
        let item = document.createElement('li');
        item.innerHTML = capitalizar(amigo);
        lista.appendChild(item);
    });
}

function limparLista() {
    listaDeAmigos = [];
    pessoasQueJaSortearam = []; // Limpa a lista de pessoas que já sortearam
    amigosSorteados = []; // Limpa a lista de amigos sorteados
    sorteandoValidado = false;
    atualizarListaDeAmigos();
    document.getElementById('resultado').innerHTML = 'A lista foi limpa!';

    // Atualiza o estado do botão de sortear
    atualizarBotaoSortear();
}

function capitalizar(nome) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
}

function atualizarBotaoSortear() {
    let sortearButton = document.getElementById('sortearButton');
    if (listaDeAmigos.length >= 2 && sorteandoValidado) {
        sortearButton.disabled = false;
    } else {
        sortearButton.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let video = document.getElementById("background-video");
    if (video) {
        video.playbackRate = 0.7;
    }

    // Evento para o campo "Digite um nome" (adicionarAmigo)
    let inputAmigo = document.getElementById("amigo");
    inputAmigo.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            adicionarAmigo();
        }
    });

    // Evento para o campo "Seu nome" (validarSorteando)
    let inputSorteando = document.getElementById("sorteando");
    inputSorteando.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            validarSorteando();
        }
    });
});