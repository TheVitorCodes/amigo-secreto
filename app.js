let listaDeAmigos = [];
let pessoasQueJaSortearam = []; 
let amigosSorteados = [];
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

    if (pessoasQueJaSortearam.includes(nome)) {
        alert('Você já realizou um sorteio!');
        return;
    }

    sorteandoValidado = true;
    alert('Nome validado! Agora você pode sortear.');

    atualizarBotaoSortear();
}

function sortearAmigo() {
    if (!sorteandoValidado) {
        alert('Por favor, valide seu nome antes de sortear!');
        return;
    }

    let sorteando = document.getElementById("sorteando").value.trim().toLowerCase();

    if (pessoasQueJaSortearam.includes(sorteando)) {
        alert('Você já realizou um sorteio!');
        return;
    }

    let amigosDisponiveis = listaDeAmigos.filter(nome => nome !== sorteando);

    if (amigosDisponiveis.length === 0) {
        alert('Não há amigos disponíveis para sortear!');
        return;
    }

    let amigoSorteado = amigosDisponiveis[Math.floor(Math.random() * amigosDisponiveis.length)];

    amigosSorteados.push(amigoSorteado);

    let resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `<p>${capitalizar(amigoSorteado)}</p>`;

    resultadoDiv.classList.add('animated');
    setTimeout(() => {
        resultadoDiv.classList.remove('animated');
    }, 500);

    let hideButton = document.createElement('button');
    hideButton.innerText = 'Ocultar Resultado';
    hideButton.classList.add('hide-button');
    hideButton.onclick = function() {
        resultadoDiv.innerHTML = '';
    };
    resultadoDiv.appendChild(hideButton);

    pessoasQueJaSortearam.push(sorteando);

    document.getElementById("sorteando").value = '';
    sorteandoValidado = false;

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
    pessoasQueJaSortearam = [];
    amigosSorteados = [];
    sorteandoValidado = false;
    atualizarListaDeAmigos();
    document.getElementById('resultado').innerHTML = 'A lista foi limpa!';

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

    let inputAmigo = document.getElementById("amigo");
    inputAmigo.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            adicionarAmigo();
        }
    });

    let inputSorteando = document.getElementById("sorteando");
    inputSorteando.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            validarSorteando();
        }
    });
});